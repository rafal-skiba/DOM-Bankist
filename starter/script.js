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
 
 section1.scrollIntoView({behavior: "smooth"});

})

//

// randomColorchanger n nav
const randomInt = (min, max) => Math.floor(Math.random() * (max - min))

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)} )`

navLinkAll.forEach(nav => nav.addEventListener('click', function () {
  this.style.color = randomColor()
} ))

//

navLinkAll.forEach(function (el) {el.addEventListener('click', function (e) {
e.preventDefault();

const id = this.getAttribute('href');
document.querySelector(id).scrollIntoView({behavior: 'smooth'})


})} )



