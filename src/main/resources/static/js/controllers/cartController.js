import {
  CART_API_PATHNAME,
  WISHLIST_PATHNAME,
  CHECKOUT_PATHNAME,
  sendApiRequest,
  getProductIdFromElement,
  reloadCurrentPage,
  showElement,
  hideElement,
} from "../tools.js";
import {sendDeleteFromWishlistRequest} from "./wishlistController.js";
import {setLoginAlert} from "../login.js";

let currentProductId;

/**
 * Sends a request to add the product of the add-to-cart button clicked.
 *
 * @param event add to cart button clicked for the product to add to cart.
 */
export const sendAddToCartRequest = function (event) {
  event.preventDefault();
  currentProductId = getProductIdFromElement(
    event.target.closest(".product__btn--add-to-cart")
  );
  sendCartRequest(currentProductId, "PUT", null, updateCartItemSuccess);
};

/**
 * Sends a request to update the product in the body given.
 *
 * @param event .
 * @param body body of the product to update.
 */
export const sendUpdateCartRequest = function (event, body) {
  event.preventDefault();
  currentProductId = body.productId;
  sendCartRequest(currentProductId, "PUT", body, updateCartItemSuccess);
};

/**
 * Sends a delete request to remove product of the event from cart.
 *
 * @param event delete button click for the product to be removed.
 */
export const sendDeleteFromCartRequest = function (event) {
  event.preventDefault();
  currentProductId = getProductIdFromElement(
    event.target.closest(".item__btn--delete")
  );
  sendCartRequest(currentProductId, "DELETE", null, reloadCurrentPage);
};

/**
 * Sends an API request to cart endpoint with the given information.
 *
 * @param productId id of the product to update/delete in cart item request.
 * @param method method of the cart request.
 * @param body body to send with cart request, set as null if not needed.
 * @param successCallback function to invoke upon success.
 */
function sendCartRequest(productId, method, body = null, successCallback) {
  if (body !== null) {
    sendApiRequest(
      `${CART_API_PATHNAME}/${productId}`,
      `${method}`,
      body,
      successCallback, addToCartUnauthorized
    ).then(() => setIncrementCounter());
  } else {
    sendApiRequest(
      `${CART_API_PATHNAME}/${productId}`,
      `${method}`,
      null,
      null, addToCartUnauthorized
    ).finally(() => setIncrementCounter());
  }
}

/**
 * Retrieves and updates the new price for the cart item.
 */
const updateCartItemSuccess = async function () {
  await sendApiRequest(
    `${CART_API_PATHNAME}`,
    "GET",
    null,
    setIncrementCounter
  ).then((cartInfo) => {
    const cartItems = cartInfo.cart;
    cartItems.forEach((item) => {
      if (window.location.pathname.includes(CHECKOUT_PATHNAME) && item.product.id === Number(currentProductId)) {
        setTotalFieldForCartItem(currentProductId, item.total);
      }
      if (window.location.pathname.includes(WISHLIST_PATHNAME)) {
        sendDeleteFromWishlistRequest(currentProductId).finally(() => reloadCurrentPage());
      }
    });
  });
};

/**
 * Sets the total field of the product with the given product id to the given total value.
 *
 * @param productId the product id of the product to update total price for.
 * @param total the total value to set for the current product id.
 */
const setTotalFieldForCartItem = function (productId, total) {
  const totalFields = document.querySelectorAll(`.item__price`);
  let totalField;
  totalFields.forEach((field) => {
    if (getProductIdFromElement(field) === productId) {
      totalField = field;
    }
  });
  totalField.innerHTML = `${total}.0,-`;
};

/**
 * Displays message to user to log in.
 */
const addToCartUnauthorized = function () {
  const userMenuButton = document.querySelector("#user-menu");
  userMenuButton.click();
  setLoginAlert("Log in to start shopping!");
};

/**
 * Gets the quantity of the shopping cart and display the
 * increment counter on the checkout button accordingly.
 */
export async function setIncrementCounter() {
  const navCheckoutQuantity = document.querySelector(
    ".nav__checkout--quantity"
  );
  await sendApiRequest(`${CART_API_PATHNAME}`, "GET")
    .then((cartInfo) => {
      const cartQuantity = cartInfo.quantity;
      if (cartQuantity > 0) {
        showElement(navCheckoutQuantity);
        navCheckoutQuantity.innerHTML = cartQuantity;
      } else {
        hideElement(navCheckoutQuantity);
      }
    })
    .finally();
}