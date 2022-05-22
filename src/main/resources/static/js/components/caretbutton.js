/**
 * Buttons to toggle between hide and display for the element underneath
 * a heading.
 */
class CaretButtons {
  btnClass;
  elementsClass;
  elements;

  /**
   * Creates an instance of caret buttons which will toggle hide and display
   * for the sibling below heading class.
   *
   * @param {*} btnClass the class to add to the buttons
   * @param {*} elementsClass the class of elements to create buttons for ("***__heading").
   */
  constructor(btnClass, elementsClass) {
    this.btnClass = btnClass;
    this.elementsClass = elementsClass;
    this.elements = document.body.querySelectorAll(`.${elementsClass}`);
  }

  /**
   * Creates caret buttons for the given list of elements.
   */
  createCaretBtns = function () {
    let index = 0;
    this.elements.forEach((element) => {
      element.insertAdjacentHTML(
        "beforeend",
        `<button class="${this.btnClass}" data-item="${index}"><i class="ph-caret-left"></i></button>`
      );
      index++;
    });
    this.addCaretButtonListeners();
  };

  /**
   * Iterates over buttons and adds event listeners to the buttons.
   */
  addCaretButtonListeners = function () {
    this.elements.forEach((element) => {
      if (this.buttonExists(element)) {
        this.getContentNodes(element).style.display = `none`;
      }
    });

    const btns = document.body.querySelectorAll(`.${this.btnClass}`);
    btns.forEach((button) => {
      const DEGREES_BUTTON_CLOSED = 0;
      const DEGREES_BUTTON_OPEN = -90;

      let degrees = DEGREES_BUTTON_CLOSED;

      let display = "none";

      button.addEventListener("click", (event) => {
        const clicked = event.target.closest(`.${this.btnClass}`);
        let item = clicked.dataset.item;

        if (degrees === DEGREES_BUTTON_CLOSED) {
          degrees = DEGREES_BUTTON_OPEN;
          display = "initial";
        } else {
          degrees = DEGREES_BUTTON_CLOSED;
          display = "none";
        }

        clicked.style.transform = `rotate( ${degrees}deg)`;

        // Goes up to the parent node and gets the childnode 3 which is the element sibling to heading.
        this.getContentNodes(this.elements[item]).style.display = `${display}`;
      });
    });
  };

  /**
   * Removes the caret buttons from the given list of elements.
   * @param {*} elements The list of elements to remove caret button from.
   */
  removeCaretBtns = function () {
    this.elements.forEach((element) => {
      if (this.buttonExists(element)) {
        this.getContentNodes(element).style.display = `initial`;
        element.removeChild(this.getButtonFromElement(element));
      }
    });
  };

  /**
   * Checks if the caret buttons exists with the given element.
   * Returns true if the caret butten exists, false if not.
   *
   * @param {*} element the element to check if contains a caret button.
   * @returns true if button exist, false if not.
   */
  buttonExists = function (element) {
    return element.childNodes[1] !== undefined;
  };

  /**
   * Retrieves the element (content nodes) which are hidden/displayed with the caret buttons.
   *
   * @param {*} element header element for the corresponding content node.
   * @returns the content node belonging to the given element.
   */
  getContentNodes = function (element) {
    return element.parentNode.querySelector("[data-content]");
  };

  /**
   * Retrieves the button belonging to the given element.
   *
   * @param {*} element element to find the button of.
   * @returns the button of the given element, undefined if not.
   */
  getButtonFromElement = function (element) {
    return element.querySelector(`.${this.btnClass}`);
  };
}