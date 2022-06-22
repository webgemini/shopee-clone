// // When the user scroll down on the Tablet, Mobile, Search history will the hide.
// if (document.getElementById('home-page-header-search-history')) {
//   var searchScrollHideDown = document.getElementById('home-page-header-search-history');
//   window.onscroll = function() {hideSearchHistory()};
//   function hideSearchHistory() {
//     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//       searchScrollHideDown.style.display = 'none';
//     } else {
//       searchScrollHideDown.style.display = 'block';
//     }
//   }
// }

if (document.getElementById('scroll-to-top')) {
  var buttonUpTop = document.getElementById('scroll-to-top');
  // When the user scrolls down 600px from the top of the document, show button.
  window.onscroll = function() {scrollToTop()};
  function scrollToTop() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      buttonUpTop.style.display = 'block';
    } else {
      buttonUpTop.style.display = 'none';
    }
  }
  // When the user click on the button, scroll to the top of the document
  function upToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

// Search Filter Tablet & Mobile
const filterBtn = document.querySelector('.navbar-search__filter');
const filterSearch = document.querySelector('.stardust-drawer__container');
const overlayFilter = document.querySelector('.stardust-drawer__background');
const stardustNoScroll = document.querySelector('.js-function');
const selectedFilterItems = document.querySelectorAll('.filter-drawer-section__item-inner');
const selectedActivated = document.querySelector('.filter-drawer-section__item-inner--selected');
const btnResetAllSelected = document.querySelector('.filter-drawer--btn');
const checkFilterItem = `
<span class="filter-icon-container">
  <i class="shop-icon filter-icon-container__icon fa fa-check" aria-hidden="true"></i>
</span>`;

if (filterBtn) {
  function showModalFilter() {
    filterSearch.classList.add('stardust-drawer__container--active');
    overlayFilter.classList.add('stardust-drawer__background--active');
    stardustNoScroll.classList.add('stardust-no-scroll');
  }

  filterBtn.addEventListener('click', showModalFilter);

  function hideModalFilter() {
    filterSearch.classList.remove('stardust-drawer__container--active');
    setTimeout(function() {
      overlayFilter.classList.remove('stardust-drawer__background--active');
    }, 500);
    stardustNoScroll.classList.remove('stardust-no-scroll');
    $('.filter-icon-container').remove();
    for (const selectedFilterItemClear of selectedFilterItems) {
      selectedFilterItemClear.classList.remove('filter-drawer-section__item-inner--selected');
    }
  }
  overlayFilter.addEventListener('click', hideModalFilter);
  // Ngăn hành vi nổi bọt
  overlayFilter.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  function resetAllSelected() {
    $('.filter-icon-container').remove();
    for (const selectedFilterItemClear of selectedFilterItems) {
      selectedFilterItemClear.classList.remove('filter-drawer-section__item-inner--selected');
    }
  }

  btnResetAllSelected.addEventListener('click', resetAllSelected);
}

if (filterSearch) {
  for (const selectedFilterItem of selectedFilterItems) {
    if (selectedFilterItem) {
      function selectedItemActive() {
        $(selectedFilterItem).append(checkFilterItem);
        selectedFilterItem.classList.add('filter-drawer-section__item-inner--selected');
      }
      selectedFilterItem.addEventListener('click', selectedItemActive);
    }
  }

  if (selectedActivated) {
    for (const selectedActivatedClear of selectedFilterItems) {
      if (selectedActivatedClear) {
        function hideSelectedItemActive() {
          selectedActivatedClear.classList.remove('filter-drawer-section__item-inner--selected');
          if ($('.filter-icon-container')) {
            $('.filter-icon-container').remove();
          }
        }
        selectedActivatedClear.addEventListener('click', hideSelectedItemActive);
      }
    }
  }

}

const stardustTarget = document.querySelector('.stardust-popover__target');
const stardustContainer = document.querySelector('.stardust-popover__container');

if (stardustTarget) {
  function showStardust() {
    stardustContainer.classList.add('stardust-popover__container--show');
    overlayFilter.classList.add('stardust-popover__background--active');
    stardustNoScroll.classList.add('stardust-no-scroll');
  }

  stardustTarget.addEventListener('click', showStardust);
  function hideStardust() {
    stardustContainer.classList.remove('stardust-popover__container--show');
    overlayFilter.classList.remove('stardust-popover__background--active');
    stardustNoScroll.classList.remove('stardust-no-scroll');
  }
  overlayFilter.addEventListener('click', hideStardust);
}


/* BEGIN: Slider */
// Set Size Image
const sizeImage = 100;
// Set Time
const timeSlider = 5000;
const sliderIdHome = "#slider";
const sliderIdShopMail = "#slider-shop-mail";
const sliderIdCatePage = "#slider-cate-page";

if (sliderIdHome) {
  // Determine the total amount of images in the carousel.
  let sliderCount = $(sliderIdHome).find(".slider-img .head-slider-list__item .head-slider-list__item-container .head-slider__item-link .head-slider__item-img").length;
  // Load images into the carousel
  let sliderImg = $(sliderIdHome).find(".slider-img");
  // Define the navigation arrows and pagination bullets.
  let sliderArrow =
  `<div class="slider-arrow arrow-left" role="button"><i class="fas fa-chevron-left"></i></div><div class="slider-arrow arrow-right" role="button"><i class="fas fa-chevron-right"></i></div>`;
  let sliderDotLi = "";
  for (let i = 0; i < sliderCount; i++) {
    sliderDotLi += `<li></li>`;
  }
  let sliderDot = `<ul class="slider-dot">${sliderDotLi}</ul>`;
  $(sliderIdHome).append(sliderArrow + sliderDot);

  let activeDefaultCount = $(".slider-dot li.active").length;
  if (activeDefaultCount != 1) {
    $(".slider-dot li")
      .removeClass()
      .eq(0)
      .addClass("active");
  }
  let sliderIndex = $(".slider-dot li.active").index();
  sliderImg.css("left", -sliderIndex * sizeImage + "%");

  // Main Switch between images
  function sliderPos() {
      sliderImg.css("left", -sliderIndex * sizeImage + "%");
      $(".slider-dot li")
        .removeClass()
        .eq(sliderIndex)
        .addClass("active");
    }

    $(".arrow-right").click(function() {
      sliderIndex >= sliderCount - 1 ? (sliderIndex = 0) : sliderIndex++;
      sliderPos();
    });

    $(".arrow-left").click(function() {
      sliderIndex <= 0 ? (sliderIndex = sliderCount - 1) : sliderIndex--;
      sliderPos();
    });

    $(".slider-dot li").click(function() {
      sliderIndex = $(this).index();
      sliderPos();
    });

    let goSlider = setInterval(() => {
      $(".arrow-right").click();
    }, timeSlider);

    $(sliderIdHome).on({
      mouseenter: () => {
        clearInterval(goSlider);
      },
      mouseleave: () => {
        goSlider = setInterval(() => {
          $(".arrow-right").click();
        }, timeSlider);
      }
    });
} else {
  console.log("Error! Slider inactive");
}

if (sliderIdShopMail) {
  // Determine the total amount of images in the carousel.
  let sliderCount = $(sliderIdShopMail).find(".slider-img .head-slider-list__item .head-slider__item-link .head-slider__item-img--shopmall").length;
  // Load images into the carousel
  let sliderImg = $(sliderIdShopMail).find(".slider-img");
  // Define the navigation arrows and pagination bullets.
  let sliderArrow =
  `<div class="slider-arrow arrow-left-2" role="button"><i class="fas fa-chevron-left"></i></div><div class="slider-arrow arrow-right-2" role="button"><i class="fas fa-chevron-right"></i></div>`;
  let sliderDotLi = "";
  for (let i = 0; i < sliderCount; i++) {
    sliderDotLi += `<li></li>`;
  }
  let sliderDot = `<ul class="slider-dot-2">${sliderDotLi}</ul>`;
  $(sliderIdShopMail).append(sliderArrow + sliderDot);

  let activeDefaultCount = $(".slider-dot-2 li.active").length;
  if (activeDefaultCount != 1) {
    $(".slider-dot-2 li")
      .removeClass()
      .eq(0)
      .addClass("active");
  }
  let sliderIndex = $(".slider-dot-2 li.active").index();
  sliderImg.css("left", -sliderIndex * sizeImage + "%");

  // Main Switch between images
  function sliderPos() {
      sliderImg.css("left", -sliderIndex * sizeImage + "%");
      $(".slider-dot-2 li")
        .removeClass()
        .eq(sliderIndex)
        .addClass("active");
    }

    $(".arrow-right-2").click(function() {
      sliderIndex >= sliderCount - 1 ? (sliderIndex = 0) : sliderIndex++;
      sliderPos();
    });

    $(".arrow-left-2").click(function() {
      sliderIndex <= 0 ? (sliderIndex = sliderCount - 1) : sliderIndex--;
      sliderPos();
    });

    $(".slider-dot-2 li").click(function() {
      sliderIndex = $(this).index();
      sliderPos();
    });

    let goSlider = setInterval(() => {
      $(".arrow-right-2").click();
    }, timeSlider);

    $(sliderIdShopMail).on({
      mouseenter: () => {
        clearInterval(goSlider);
      },
      mouseleave: () => {
        goSlider = setInterval(() => {
          $(".arrow-right-2").click();
        }, timeSlider);
      }
    });
} else {
  console.log("Error! Slider inactive");
}

if (sliderIdCatePage) {
  // Determine the total amount of images in the carousel.
  let sliderCount = $(sliderIdCatePage).find(".slider-img .head-slider-list__item .head-slider__item-link .head-slider__item-img").length;
  // Load images into the carousel
  let sliderImg = $(sliderIdCatePage).find(".slider-img");
  // Define the navigation arrows and pagination bullets.
  let sliderArrow =
  `<div class="slider-arrow arrow-left" role="button"><i class="fas fa-chevron-left"></i></div><div class="slider-arrow arrow-right" role="button"><i class="fas fa-chevron-right"></i></div>`;
  let sliderDotLi = "";
  for (let i = 0; i < sliderCount; i++) {
    sliderDotLi += `<li></li>`;
  }
  let sliderDot = `<ul class="slider-dot">${sliderDotLi}</ul>`;
  $(sliderIdCatePage).append(sliderArrow + sliderDot);

  let activeDefaultCount = $(".slider-dot li.active").length;
  if (activeDefaultCount != 1) {
    $(".slider-dot li")
      .removeClass()
      .eq(0)
      .addClass("active");
  }
  let sliderIndex = $(".slider-dot li.active").index();
  sliderImg.css("left", -sliderIndex * sizeImage + "%");

  // Main Switch between images
  function sliderPos() {
      sliderImg.css("left", -sliderIndex * sizeImage + "%");
      $(".slider-dot li")
        .removeClass()
        .eq(sliderIndex)
        .addClass("active");
    }

    $(".arrow-right").click(function() {
      sliderIndex >= sliderCount - 1 ? (sliderIndex = 0) : sliderIndex++;
      sliderPos();
    });

    $(".arrow-left").click(function() {
      sliderIndex <= 0 ? (sliderIndex = sliderCount - 1) : sliderIndex--;
      sliderPos();
    });

    $(".slider-dot li").click(function() {
      sliderIndex = $(this).index();
      sliderPos();
    });

    let goSlider = setInterval(() => {
      $(".arrow-right").click();
    }, timeSlider);

    $(sliderIdCatePage).on({
      mouseenter: () => {
        clearInterval(goSlider);
      },
      mouseleave: () => {
        goSlider = setInterval(() => {
          $(".arrow-right").click();
        }, timeSlider);
      }
    });
} else {
  console.log("Error! Slider inactive");
}
/* END: Slider */

/*
* BEGIN: Click scroll
*/
const transCss = "transform";
const transValue = "translate(0rem, 0rem)";
const visibilityCss = "visibility";
const hiddenCss = "hidden";
const visibleCss = "visible";

const scrollLeft = " .carousel-arrow__left";
const scrollRight = " .carousel-arrow__right";
const actionScroll = " .image-carousel__list";
const cateSection = ".home-cate__section-content";
const flashSaleSection = ".flash-sale-section";
const shopMallSection = ".shop-mall-section";
const topSearch = ".top-search-section";

const leftCount = scrollLeft.length;
const rightCount = scrollRight.length;

$(document).ready(function() {
  // Click scroll category
  if (cateSection){
      const transCssCate = "translate(-30%, 0rem)";

      $(cateSection + scrollLeft).click(function() {
        $(cateSection + actionScroll).addClass('image-carousel__list--left');
        $(cateSection + actionScroll).removeClass('image-carousel__list--right');
        $(cateSection + scrollLeft).css(visibilityCss , hiddenCss);
        $(cateSection + scrollRight).css(visibilityCss , visibleCss);
      });

      $(cateSection + scrollRight).click(function() {
        $(cateSection + actionScroll).addClass('image-carousel__list--right');
        $(cateSection + actionScroll).removeClass('image-carousel__list--left');
        $(cateSection + scrollRight).css(visibilityCss , hiddenCss);
        $(cateSection + scrollLeft).css(visibilityCss , visibleCss);
      })
  }
  // Click scroll Flash sale
  if (flashSaleSection) {
    const transCss100 = "translate(-100rem, 0rem)";
    const transCss200 = "translate(-200rem, 0rem)";

    $(flashSaleSection + scrollLeft).click(function() {
        $(flashSaleSection + actionScroll).css(transCss , transValue);
        $(flashSaleSection + scrollLeft).css(visibilityCss , hiddenCss);
        $(flashSaleSection + scrollRight).css(visibilityCss , visibleCss);
    });

    $(flashSaleSection + scrollRight).click(function() {
        if(rightCount) {
          $(flashSaleSection + actionScroll).css(transCss , transCss100);
        } else if (rightCount === 23) {
          $(flashSaleSection + actionScroll).css(transCss , transCss200);
        }

        $(flashSaleSection + scrollRight).css(visibilityCss , hiddenCss);
        $(flashSaleSection + scrollLeft).css(visibilityCss , visibleCss);
    });
  }
  // Click scroll Shop mall
  if (shopMallSection){
    const transCss80 = "translate(-50%, 0%)";

    $(shopMallSection + scrollLeft).click(function() {
      $(shopMallSection + actionScroll).css(transCss , transValue);
      $(shopMallSection + scrollLeft).css(visibilityCss , hiddenCss);
      $(shopMallSection + scrollRight).css(visibilityCss , visibleCss);
    });

    $(shopMallSection + scrollRight).click(function() {
      $(shopMallSection + actionScroll).css(transCss, transCss80);
      $(shopMallSection + scrollRight).css(visibilityCss , hiddenCss);
      $(shopMallSection + scrollLeft).css(visibilityCss , visibleCss);
    });
  }
  // Click scroll Top Search
  if (topSearch) {
    const transCss100 = "translate(-100rem, 0rem)";
    const transCss200 = "translate(-200rem, 0rem)";

    $(topSearch + scrollLeft).click(function() {
        $(topSearch + actionScroll).css(transCss , transValue);
        $(topSearch + scrollLeft).css(visibilityCss , hiddenCss);
        $(topSearch + scrollRight).css(visibilityCss , visibleCss);
    });

    $(topSearch + scrollRight).click(function() {
        if(rightCount) {
          $(topSearch + actionScroll).css(transCss , transCss100);
        } else if (rightCount === 23) {
          $(topSearch + actionScroll).css(transCss , transCss200);
        }

        $(topSearch + scrollRight).css(visibilityCss , hiddenCss);
        $(topSearch + scrollLeft).css(visibilityCss , visibleCss);
    });
  }
});
/*
* END: Click scroll
*/

//  ratingReportMenu = '.shop-product-rating__report-menu';
//  tabReport = '.stardust-dropdown__item-body';

//  if (ratingReportMenu) {
//   $(ratingReportMenu).click(function() {
//     $(tabReport).addClass('stardust-dropdown__item-body--open');
//     $(tabReport).css('opacity', '1');
//   });
//  } else if (!ratingReportMenu) {
//    $('.grid').click(function() {
//      $(tabReport).removeClass('stardust-dropdown__item-body--open');
//      $(tabReport).css('opacity', '0');
//    });
//  }