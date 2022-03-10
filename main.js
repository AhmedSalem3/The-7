function filterWork() {
  let filterBtns = document.querySelectorAll("[data-filter]");
  let workHolder = document.querySelector(".work-items");
  let allWork = document.querySelectorAll("[data-type]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", filterAction);
  });

  function filterAction(e) {
    [...filterBtns].find((e) => e.dataset.active == "true").dataset.active =
      "false";
    this.dataset.active = "true";

    let filterBy = this.dataset.filter;
    filterWork(filterBy);
  }

  function filterWork(by) {
    if (by == "all") {
      allWork.forEach((work) => (work.dataset.show = "true"));
      return;
    }

    let filteredItems = [...allWork].filter((work) => {
      return work.dataset.type == by;
    });

    allWork.forEach((work) => (work.dataset.show = "false"));
    filteredItems.forEach((item) => (item.dataset.show = "true"));
  }
}
filterWork();

function quotesSlider() {
  let allQuotes = document.querySelectorAll(".quote"),
    quotesCount = allQuotes.length,
    dotsSliders = document.querySelectorAll(".dot");
  slider = document.querySelector(".quotes .holder");

  let currentIndex = 0;

  setInterval(() => {
    currentIndex++;

    currentIndex >= quotesCount ? (currentIndex = 0) : "";

    getNextQuote(currentIndex);
  }, 5000);

  function getNextQuote(index) {
    slider.style.transform = `translateX(-${index * 100}vw)`;

    updateDots(index);

    function updateDots(index) {
      dotsSliders.forEach((dot) => (dot.dataset.active = "false"));
      dotsSliders[index].dataset.active = "true";
    }
  }

  function switchToQuote(e) {
    let clickedDotIndex = [...dotsSliders].indexOf(this);
    currentIndex = clickedDotIndex;
    getNextQuote(currentIndex);
  }

  dotsSliders.forEach((dot) => dot.addEventListener("click", switchToQuote));
}
quotesSlider();

function statsCounter() {
  let countersHolder = document.querySelector("section.stats");
  let allCounters = document.querySelectorAll("[data-stat-counter]");

  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  window.addEventListener("scroll", debounce(checkToAnimate));

  let animationDone = false;

  function checkToAnimate() {
    let [currentPagePos, target] = [
      window.scrollY,
      countersHolder.offsetTop - 600,
    ];

    if (currentPagePos >= target) {
      if (!animationDone) animateStats();
      animationDone = true;
    }
  }

  function animateStats() {
    allCounters.forEach((counter) => {
      let targetNum = counter.dataset.statCounter;

      let count = setInterval(() => {
        Number(counter.innerHTML) >= targetNum ? clearInterval(count) : "";
        counter.innerHTML++;
      }, 2000 / targetNum);
    });
  }
}
statsCounter();

function logosSlider() {
  let slider = document.querySelector(".brands .slider");
  let logosHolder = document.querySelector(".brands .slider .icons-wrapper");
  let allLogos = document.querySelectorAll(".brands .slider img");

  // number of already shown logos on screen
  let alreadyScrolled = 3;
  let scrolled = 0;

  setInterval(() => {
    // getting width of any logo as they are all equal
    let logoWidth = allLogos[0].getBoundingClientRect().width;
    scrolled++;
    //! if all logos are scrolled then reset the scrolled var
    if (scrolled + alreadyScrolled > allLogos.length) scrolled = 0;

    slider.style.transform = `translateX(-${logoWidth * scrolled}px)`;
  }, 3000);
}
logosSlider();
