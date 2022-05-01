package no.ntnu.appdevapi.controllers;

import no.ntnu.appdevapi.entities.Product;
import no.ntnu.appdevapi.entities.User;
import no.ntnu.appdevapi.entities.UserAddress;
import no.ntnu.appdevapi.entities.Wishlist;
import no.ntnu.appdevapi.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * MVC controller for the html pages.
 */
@Controller
public class HTMLPageController {

    @Autowired
    private ProductService productService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserAddressService userAddressService;

    @Autowired
    private WishlistService wishlistService;

    /**
     * Gets the home page with the required attributes. Returns index thymeleaf template.
     *
     * @param model model for homepage.
     * @return index thymeleaf template.
     */
    @GetMapping("/")
    public String getHome(Model model) {
        model.addAttribute("user", this.getUser());
        model.addAttribute("products", productService.getAllProducts());

        Wishlist wishlist = this.wishlistService.getWishlistByUser(this.getUser());
        if (wishlist != null) {
            model.addAttribute("wishlist", wishlist.getProducts());
        }

        this.addPermissionLevelToModel(model);

        return "index";
    }

    /**
     * Displays this users account information.
     *
     * @param model model for account.
     * @return account thymeleaf template.
     */
    @GetMapping("/account")
    public String getAccount(Model model) {

        model.addAttribute("user" , this.getUser());
        model.addAttribute("address", userAddressService.getUserAddressByUserID(userService.getSessionUser().getId()).getAddressLine());

        this.addPermissionLevelToModel(model);
        return "account";
    }

    /**
     * Gets and displays the specified product.
     *
     * @param id the id of the product to get.
     * @param model model for product.
     * @return product thymeleaf template.
     */
    @GetMapping("product/{id}")
    public String getProduct(@PathVariable long id, Model model) {
        Product product = productService.getProduct(id);
        Wishlist wishlist = this.wishlistService.getWishlistByUser(this.getUser());

        if (wishlist != null){
            model.addAttribute("wishlist", wishlist.getProducts());
        }
        model.addAttribute("product", product);
        model.addAttribute("user", this.getUser());
        model.addAttribute("description", product.getDescription().split("\\."));
        model.addAttribute("comments", ratingService.getRatingsFromProduct(product));
        this.addPermissionLevelToModel(model);
        return "product";
    }

    /**
     * Displays the current users wishlist.
     *
     * @return wishlist thymeleaf template.
     */
    @GetMapping("wishlist")
    public String getWishlist(Model model) {
        model.addAttribute("user", this.getUser());
        Wishlist wishlist = this.wishlistService.getWishlistByUser(this.getUser());

        if (wishlist != null){
            model.addAttribute("wishlist", wishlist.getProducts());
        }

        this.addPermissionLevelToModel(model);

        return "wishlist";
    }

    /**
     * Retireves permission level and adds to the given model.
     *
     * @param model model to add permission level to.
     */
    private void addPermissionLevelToModel(Model model) {
        if(this.getUser() != null) {
            model.addAttribute("permission", this.getUser().getPermissionLevel().getAdminType());
        } else {
            model.addAttribute("permission", "NoUser");
        }
    }

    /**
     * Returns the user of this session.
     *
     * @return user of this session.
     */
    private User getUser() {
        return this.userService.getSessionUser();
    }
}