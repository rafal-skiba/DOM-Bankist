'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector('#section--1');
const navLinkAll = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// pop up window open

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//

// button scroll

btnScroll.addEventListener("click", (e) => {

  section1.scrollIntoView({ behavior: "smooth" });

})



// randomColorchanger n nav
const randomInt = (min, max) => Math.floor(Math.random() * (max - min))

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)} )`

navLinkAll.forEach(nav => nav.addEventListener('click', function () {
  this.style.color = randomColor()
}))

//

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
})


const tabsContainer = document.querySelector(".operations__tab-container");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content")


tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //remove class

  tabs.forEach(r => r.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))


  //activate class
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

// Nav Sticky position

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);


// reveal section animation

const allSection = document.querySelectorAll('.section');


const revealSection = function (entries, observer) {
const [entry] = entries;

if (!entry.isIntersecting) return;
entry.target.classList.remove('section--hidden');
observer.unobserve(entry.target);
}


const sectionObserver = new IntersectionObserver ( revealSection, {
  root: null,
  threshold: 0.18,
})

allSection.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');

} ) 


// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const lazyImgFn = function (entries, observer) {
 const [entry] = entries;

 if (!entry.isIntersecting) return;

 // replace src with data-src
 entry.target.src = entry.target.dataset.src;
 

 entry.target.addEventListener('load', function () {
  entry.target.classList.remove('lazy-img');
 })

 observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver( lazyImgFn, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));



//slider implementation

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');



let curSlide = 0;
const maxSlide = slides.length -1;


const createDots = function() {
  slides.forEach(function(s, index) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
  })
}

createDots();


const activeDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

activeDot(0)


const gotoSlide = function (slide) {
  slides.forEach((s, index) => s.style.transform = `translateX(${100 * (index - slide)}%)`);
}

const nextSlide = function () {
  if (maxSlide  === curSlide) {
    curSlide =0
  } else {
    curSlide++;
  }
gotoSlide(curSlide)
activeDot(curSlide)
}

const previousSlide = function () {
  if (curSlide === 0 ) {
    curSlide = maxSlide
  } else {
    curSlide--;
  }

gotoSlide(curSlide)
activeDot(curSlide)
}


btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e) {
  console.log(e)

  if (e.key === 'ArrowLeft') previousSlide();
  e.key === 'ArrowRight' && nextSlide();
})


dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    gotoSlide(slide);
    activeDot(slide);
  }
})
