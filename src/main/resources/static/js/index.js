/**
 * Initializes components and features of the front page.
 */
const setFrontPage = function () {
  const sectionHeroEl = document.querySelector(".section-hero");
  const featuredSlides = document.querySelectorAll(".featured-card");
  const featuredSlider = new Slider(featuredSlides);
  const gallerySlides = document.querySelectorAll(".gallery");
  const gallerySlider = new GallerySlider(gallerySlides);
  const testimonialCaretButtons = new CaretButtons(
    "testimonial__btn",
    "testimonial__heading"
  );
  const productsSlides = document.querySelectorAll(".product-card");
  const productsSlider = new Slider(productsSlides);
  productsSlider.removeFormat();
  productsSlider.createSlides();

  /**
   * Adds sticky navigation when user scrolls past the entry (used for hero-section)
   */
  const stickyNavigation = function (entries) {
    const entry = entries[0];

    if (entry.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (entry.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  };

  const heroObserver = new IntersectionObserver(stickyNavigation, {
    root: null,
    threshold: 0,
    rootMargin: "190px",
  });

  /**
   * Checks screen size and changes layout accordingly for index page.
   */
  const dynamicallyChangeLayout = function () {
    if (mobileLayoutSize.matches) {
      testimonialCaretButtons.createCaretButtons();
      featuredSlider.createSlides();
      gallerySlider.createSlides();
      heroObserver.unobserve(sectionHeroEl);
    } else {
      heroObserver.observe(sectionHeroEl);
      testimonialCaretButtons.removeCaretButtons();
      featuredSlider.removeSlides();
      gallerySlider.removeSlides();
    }
  };

// Update when the window is resized
  mobileLayoutSize.addEventListener("change", dynamicallyChangeLayout);

// Initial check when browser is opened
  dynamicallyChangeLayout();
}
setFrontPage();
