function handleOverlay(overlayEle, pageBody) {
  this.overlayElement = overlayEle;
  this.pageBodyEle = pageBody;
  this.overlayDisplay = () => {
    this.overlayElement.classList.add('js-overlay--active');
  };
  this.overlayHidden = () => {
    this.overlayElement.classList.remove('js-overlay--active');
  };
  this.addNoScroll = () => {
    this.pageBodyEle.classList.add('stardust-no-scroll');
  };
  this.removeNoScroll = () => {
    this.pageBodyEle.classList.remove('stardust-no-scroll');
  };
}

function handleStardust() {
  var stardustActiveName;
  var stardustActive;
  var overlayEle = document.querySelector('.js-overlay');
  var pageBody = document.querySelector('.js-function');
  var modalAuth = document.querySelector('.modal');
  var modalAuthContainer = modalAuth.querySelector('.modal__container');
  const handleOverlayObj = new handleOverlay(overlayEle, pageBody);

  var stardustBtnEles = document.querySelectorAll('.stardust-btn--active');

  if (overlayEle) {
      overlayEle.onclick = stardustHidden();
  } else {
    console.log('Error: Overlay element not found, ', overlayEle);
  }

  if (stardustBtnEles.length > 0) {
    stardustBtnEles.forEach((stardustBtnEle) => {
      stardustBtnEle.onclick = stardustDisplay(stardustBtnEle);
    });
  } else {
    console.log('Error: Stardust Btn element not found, ', stardustBtnEles);
  }

  function stardustDisplay(stardustBtnEle) {
    var stardustName = stardustBtnEle.getAttribute('data-stardust');
    var stardustSetActive = document.querySelector('.stardust-' + stardustName + '__container');
    return () => {
      if (stardustSetActive) {
        if (stardustActive) {
          stardustActive.classList.remove('stardust-' + stardustActiveName + '__container--active');
        }
        stardustSetActive.classList.add('stardust-' + stardustName + '__container--active');
        stardustActiveName = stardustName;
        stardustActive = stardustSetActive;
      }
      handleOverlayObj.overlayDisplay();
      handleOverlayObj.addNoScroll();
    }
  }
  function stardustHidden() {
    return () => {
      if (stardustActive) {
        stardustActive.classList.remove('stardust-' + stardustActiveName + '__container--active');
      }
      handleOverlayObj.overlayHidden();
      handleOverlayObj.removeNoScroll();
      stardustActiveName = undefined;
      stardustActive = undefined;
    }
  }
  if (modalAuth) {
    modalAuth.onclick = stardustHidden();
    modalAuthContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

function handleModalFormAuth() {
  var formAuthActive = document.querySelector('.auth-form--active');
  var formAuthSwitchBtns = document.querySelectorAll('.auth-form__switch-btn');

  formAuthSwitchBtns.forEach((formAuthSwitchBtn) => {
    formAuthSwitchBtn.onclick = formAuthDisplay(formAuthSwitchBtn);
  });

  function formAuthDisplay(formAuthSwitchBtn) {
    return () => {
      var formAuthName = formAuthSwitchBtn.getAttribute('data-form');
      if (formAuthName) {
        var formAuthSetActive = document.querySelector('.auth-form__' + formAuthName);
        if (formAuthSetActive) {
          formAuthHidden();
        }
        formAuthSetActive.classList.add('auth-form--active');
        formAuthActive = formAuthSetActive;
      }
    }
  }

  function formAuthHidden() {
    formAuthActive.classList.remove('auth-form--active');
  }
}

function handleProductImgShows(productBriefShow) {
  var imgProductBrief = document.querySelector(productBriefShow);
  var imgProductBriefList = document.querySelectorAll('.product-brief__showimg-list .product-brief__showimg-item-group');

  imgProductBrief.innerHTML = imgProductBriefList[0].outerHTML;
  imgProductBriefList.forEach((imgElement, i) => {
    imgElement.onpointerover = () => {
      imgProductBrief.innerHTML = imgProductBriefList[i].outerHTML;
    };
  });
}

function handleScrollingDown(eleSelected, destinationScroll) {
  var selectElements = document.querySelectorAll(eleSelected);
  var destinationScroll = document.querySelector(destinationScroll);
  for (let selectElement of selectElements) {
    selectElement.onclick = () => {
      destinationScroll.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
}

function handleBackDirection() {
  var btnDirection = document.querySelector('.header-back .header-back-link');
  if (btnDirection) {
    btnDirection.onclick = () => {
      window.history.back();
    };
  }
}

function handleScrollUpTop(scrollToTop) {
  let buttonUpTop = document.getElementById(scrollToTop);
  // When the user scrolls down 600px from the top of the document, show button.
  document.onscroll = () => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      buttonUpTop.style.display = 'block';
    } else {
      buttonUpTop.style.display = 'none';
    }
  };
  // When the user click on the button, scroll to the top of the document
  buttonUpTop.onclick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

function handleSearchScroll() {
  if (window.innerWidth < 1024) {
    var searchInputEle = document.querySelector('.header__search-input');
    var overlayEle = document.querySelector('.js-overlay');
    if (searchInputEle) {
      searchInputEle.addEventListener('click', () => {
        searchInputEle.classList.add('header__search-input--orange');
        overlayEle.classList.add('js-overlay--active');
      });
    }
    if (overlayEle) {
      overlayEle.addEventListener('click', () => {
        searchInputEle.classList.remove('header__search-input--orange');
        overlayEle.classList.remove('js-overlay--active');
      });
    }
    if (searchInputEle) {
      window.onscroll = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          searchInputEle.classList.remove('header__search-input--orange');
          overlayEle.classList.remove('js-overlay--active');
        }
      };
    }
  }
}

function handleProductQuantity(btnActionUpDown, calculatorProductQuantity) {
  var btnUpDownValue = document.querySelectorAll(btnActionUpDown);
  var resultInput = document.querySelector(calculatorProductQuantity);
  var totalQuantityProduct = resultInput.parentElement.parentElement.lastElementChild.innerText;
  var createANewEle = document.createElement('div');

  function createANewElement() {
    if (resultInput.value > parseInt(totalQuantityProduct)) {
      resultInput.value = parseInt(totalQuantityProduct);
      createANewEle.innerHTML = `<div class="notice-quantity-up-and-down">Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này</div>`;
      resultInput.parentElement.parentElement.parentElement.parentElement.appendChild(createANewEle);
    }
  }

  function setAttributeValueInput() {
    resultInput.setAttribute('value', resultInput.value);
    resultInput.setAttribute('aria-valuenow', resultInput.value);
  }

  btnUpDownValue[1].onclick = () => {
    resultInput.value++;
    createANewElement();
    setAttributeValueInput();
  };

  btnUpDownValue[0].onclick = () => {
    if (resultInput.value > 1) {
      resultInput.value--;
      setAttributeValueInput();
    } else if (resultInput.value < 1) {
      resultInput.value = 1;
    }
    if (resultInput.parentElement.parentElement.parentElement.parentElement.querySelector('.notice-quantity-up-and-down')) {
      resultInput.parentElement.parentElement.parentElement.parentElement.removeChild(createANewEle);
    }
  };

  resultInput.oninput = () => {
    createANewElement();
    setAttributeValueInput();
    if (resultInput.parentElement.parentElement.parentElement.parentElement.querySelector('.notice-quantity-up-and-down')) {
      resultInput.parentElement.parentElement.parentElement.parentElement.removeChild(createANewEle);
    }
  }
}

function handleCarouselActions(carouselParentObj, a, b) {
  this.carouselParent = document.querySelector(carouselParentObj);
  this.carouselList = this.carouselParent.querySelector('.image-carousel__list');
  this.carouselListItems = this.carouselParent.querySelectorAll('.image-carousel__item');
  this.carouselPrev = this.carouselParent.querySelector('.carousel-arrow__left');
  this.carouselNext = this.carouselParent.querySelector('.carousel-arrow__right');
  this.listItemsCount = Math.round(this.carouselListItems.length / a);
  this.currentIndex = 0;

  this.handleAddStyleCarousel = (c, d) => {
    this.carouselList.style.width = c;
    this.carouselListItems.forEach((carouselListItem) => {
      carouselListItem.style.width = d;
    });
  }

  this.handleCarousel = () => {
    this.carouselList.style.transform = `translate(${-this.currentIndex * (this.carouselListItems[this.currentIndex].offsetWidth * b)}px, 0px)`;
    if (this.currentIndex >= this.listItemsCount) {
      this.carouselNext.classList.add('carousel-arrow__right--hidden');
    }
    if (this.currentIndex <= 0) {
      this.carouselPrev.classList.add('carousel-arrow__left--hidden');
    }
  }

  this.carouselPrev.classList.add('carousel-arrow__left--hidden');

  this.next = () => {
    this.currentIndex >= this.listItemsCount ? (this.currentIndex = this.listItemsCount) : this.currentIndex++;
    this.handleCarousel();
    this.carouselPrev.classList.remove('carousel-arrow__left--hidden');
  }
  this.prev = () => {
    this.currentIndex <= 0 ? (this.currentIndex = 0) : this.currentIndex--;
    this.handleCarousel();
    this.carouselNext.classList.remove('carousel-arrow__right--hidden');
  }

  this.run = () => {
    if (this.carouselNext) {
      this.carouselNext.onclick = this.next;
    }
    if (this.carouselPrev) {
      this.carouselPrev.onclick = this.prev;
    }
  }
}

function handleSlideShow(nameSlideShow, imgId, autoPlay) {
  this.currentIndex = 0;
  this.sliderShowEle = document.querySelector(nameSlideShow);
  let sliderArrow =
   `<div class="slider-arrow arrow-left" role="button"><i class="fas fa-chevron-left"></i></div><div class="slider-arrow arrow-right" role="button"><i class="fas fa-chevron-right"></i></div>`;

  this.autoPlay = autoPlay;
  this.listImgItems = this.sliderShowEle.querySelectorAll(`.slider-img .slider-img-${imgId}`);
  this.sliderImg = this.sliderShowEle.querySelector('.slider-img');
  this.sliderAction = this.sliderShowEle.querySelector('.slider-actions');
  this.sliderCount = this.listImgItems.length;
  this.sliderDotLi = '';
  for (let i = 0; i < this.sliderCount; i++) {
    this.sliderDotLi += `<li data-index="${i}"></li>`;
  }
  this.sliderDot = `<ul class="slider-dot">${this.sliderDotLi}</ul>`;
  this.sliderAction.outerHTML = sliderArrow + this.sliderDot;
  this.sliderRightEl = this.sliderShowEle.querySelector('.arrow-right');
  this.sliderLeftEl = this.sliderShowEle.querySelector('.arrow-left');
  this.sliderDotEl = this.sliderShowEle.querySelectorAll('.slider-dot li');
  if (this.sliderDotEl.length != 1) {
    this.sliderDotEl[0].classList.add('active');
  }
  this.sliderPos = () => {
    for (let dotItem of this.sliderDotEl) {
      dotItem.classList.remove('active');
    }
    this.sliderDotEl[this.currentIndex].classList.add('active');
    this.sliderImg.style.left = -this.currentIndex * 100 + '%';
  }
  this.next = () => {
    this.currentIndex >= this.sliderCount - 1 ? (this.currentIndex = 0) : this.currentIndex++;
    this.sliderPos();
    if (this.timer) {
      clearInterval(this.timer);
      this.auto();
    }
  };
  this.prev = () => {
    this.currentIndex <= 0 ? (this.currentIndex = this.sliderCount - 1) : this.currentIndex--;
    this.sliderPos();
    if (this.timer) {
      clearInterval(this.timer);
      this.auto();
    }
  }

  this.dot = () => {
    for (let itemDot of this.sliderDotEl) {
      itemDot.onclick = (e) => {
        this.currentIndex = e.target.getAttribute('data-index');
        this.sliderPos();
        if (this.timer) {
          clearInterval(this.timer);
          this.auto();
        }
      };
    };
  };
  this.auto = () => {
    this.timer = setInterval(() => {
      this.next();
    }, 5000);
  };
  this.run = () => {
    if (this.sliderRightEl) {
      this.sliderRightEl.onclick = this.next;
    }
    if (this.sliderLeftEl) {
      this.sliderLeftEl.onclick = this.prev;
    }
    this.dot();
    if (this.autoPlay) {
      this.auto();
    }
  };
}

function main() {
  const slideShowMain = new handleSlideShow('#slider', 1, true);
  const slideShowMain2 = new handleSlideShow('#slider-shop-mail', 2, true);
  slideShowMain.run();
  slideShowMain2.run();
  handleScrollUpTop('scroll-to-top');
  handleSearchScroll();
  handleModalFormAuth();
  handleStardust();

  if (window.innerWidth > 1023) {
    const carouselCateObj = new handleCarouselActions('.cate-section', 13, 3);
    carouselCateObj.handleAddStyleCarousel('130%', '10%');
    carouselCateObj.run();

    const carouselFlashObj = new handleCarouselActions('.flash-sale-section', 8, 5);
    carouselFlashObj.handleAddStyleCarousel('266.667%', '16.667%');
    carouselFlashObj.run();

    const carouselShopMallObj = new handleCarouselActions('.shop-mall-section', 8, 4);
    carouselShopMallObj.handleAddStyleCarousel('200%', '25%');
    carouselShopMallObj.run();

    const carouselTopSearchObj = new handleCarouselActions('.top-search-section', 8, 5);
    carouselTopSearchObj.handleAddStyleCarousel('350.333%', '16.667%');
    carouselTopSearchObj.run();
  } else if (window.innerWidth > 739 && window.innerWidth < 1024 ) {
    const carouselCateObj = new handleCarouselActions('.cate-section', 6, 3.5);
    carouselCateObj.handleAddStyleCarousel('216.667%', '16.667%');
    carouselCateObj.run();

    const carouselFlashObj = new handleCarouselActions('.flash-sale-section', 4, 3);
    carouselFlashObj.handleAddStyleCarousel('400%', '16.667%');
    carouselFlashObj.run();

    const carouselShopMallObj = new handleCarouselActions('.shop-mall-section', 8, 4);
    carouselShopMallObj.handleAddStyleCarousel('200%', '25%');
    carouselShopMallObj.run();

    const carouselTopSearchObj = new handleCarouselActions('.top-search-section', 5, 4);
    carouselTopSearchObj.handleAddStyleCarousel('421%', '20%');
    carouselTopSearchObj.run();
  } else if (window.innerWidth < 740) {
    const carouselCateObj = new handleCarouselActions('.cate-section', 6, 3.5);
    carouselCateObj.handleAddStyleCarousel('210%', '12%');
    carouselCateObj.run();

    const carouselFlashObj = new handleCarouselActions('.flash-sale-section', 4, 3);
    carouselFlashObj.handleAddStyleCarousel('390%', '20%');
    carouselFlashObj.run();

    const carouselShopMallObj = new handleCarouselActions('.shop-mall-section', 8, 4);
    carouselShopMallObj.handleAddStyleCarousel('400%', '25%');
    carouselShopMallObj.run();

    const carouselTopSearchObj = new handleCarouselActions('.top-search-section', 8, 5);
    carouselTopSearchObj.handleAddStyleCarousel('660%', '20%');
    carouselTopSearchObj.run();
  }
};

function pageCateProduct() {
  const slideShowMain3 = new handleSlideShow('#slider-cate-page', 3, true);
  slideShowMain3.run();
  handleStardust();
  handleScrollUpTop('scroll-to-top');
  handleBackDirection();
  handleModalFormAuth();

  if (window.innerWidth > 1023) {
    const carouselPageCateObj = new handleCarouselActions('.shop-mall-section--cate-product', 12, 4);
    carouselPageCateObj.handleAddStyleCarousel('150%', '10%');
    carouselPageCateObj.run();
  } else if (window.innerWidth > 739 && window.innerWidth < 1024 ) {
    const carouselPageCateObj = new handleCarouselActions('.shop-mall-section--cate-product', 12, 6);
    carouselPageCateObj.handleAddStyleCarousel('200%', '15%');
    carouselPageCateObj.run();
  } else if (window.innerWidth < 740) {
    const carouselPageCateObj = new handleCarouselActions('.shop-mall-section--cate-product', 3, 3);
    carouselPageCateObj.handleAddStyleCarousel('600%', '20%');
    carouselPageCateObj.run();
  }
};

function pageProduct() {
  handleProductImgShows('.product-brief__showimg-primary');
  handleProductQuantity('.quantity-up-and-down__btn', '.quantity-up-and-down__input');
  handleScrollingDown('.product-brief__info-rating', '.product-ratings');
  handleStardust();
  handleScrollUpTop('scroll-to-top');
  handleBackDirection();
  handleModalFormAuth();
};

function pageSearch() {
  handleStardust();
  handleScrollUpTop('scroll-to-top');
  handleBackDirection();
  handleModalFormAuth();
};

function pageTopProduct() {
  handleScrollUpTop('scroll-to-top');
  handleBackDirection();
  handleStardust();
  handleModalFormAuth();
}