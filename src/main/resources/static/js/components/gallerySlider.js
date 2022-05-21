/**
 * Slider gallery for the static gallery on the landing page.
 */
class GallerySlider extends Slider {
  companyGridElement;

  /**
   * Creates an instance of gallery slider
   *
   * @param {*} slides the slide to create a slider from.
   */
  constructor(slides) {
    super(slides);
    this.companyGridElement = document.querySelector(".company-grid");
    this.sliderContainer = document.querySelector(".slider-container");
  }

  /**
   * Creates a slider out of the gallery.
   */
  createSlides = function () {
    const galleries = document.querySelectorAll(".gallery");
    galleries[0].insertAdjacentHTML(
      "beforebegin",
      `<div class="slider-container">`
    );
    this.sliderContainer = document.querySelector(".slider-container");
    this.implementSliderController(this.sliderContainer);
    this.appendListItemsToElement(galleries, this.sliderContainer);
    hideElement(galleries[0]);
    hideElement(galleries[2]);
    this.addTouchEventsToSlider(this.sliderContainer);
  };

  /**
   * Appends gallery back to company section and removes
   * slide container.
   */
  removeSlides = function () {
    const galleries = document.querySelectorAll(".gallery");
    if (this.sliderContainer !== null) {
      this.appendListItemsToElement(galleries, this.companyGridElement);
      this.companyGridElement.removeChild(this.sliderContainer);
      galleries.forEach((gallery) => showElement(gallery));
      this.removeTouchEventsFromSlider(this.sliderContainer);
    }
    this.removeSlideController();
  };

  /**
   * Removes the slider controllers from the slider
   */
  removeSlideController = function () {
    const slideController =
      this.companyGridElement.querySelectorAll(".slider-controls");
    slideController.forEach((controller) => {
      if (this.companyGridElement.contains(controller)) {
        this.companyGridElement.removeChild(controller);
      }
    });
  };

  /**
   * Appends the elements in the list to the given element as children.
   *
   * @param list list of elements to append as children.
   * @param element the element to become their parent.
   */
  appendListItemsToElement = function (list, element) {
    list.forEach((item) => element.appendChild(item));
  };
}
