import './sass/main.scss';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import ImagesApiService from './js/apiService';
import cardTpl from './templates/card.hbs';
import LoadMoreBtn from './js/load-more-btn';
// import * as basicLightbox from 'basiclightbox';
// import "basiclightbox/dist/basicLightbox.min.css";


const refs = {

    form: document.querySelector('.search-form'),
    output: document.querySelector('.js-output'),
}
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});


const imagesApiService = new ImagesApiService();
refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImage);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;

    if (imagesApiService.query === "") {
        error(
            {
                delay: 2000,
                text: "Type some request",
                maxOpen: 1,
            })
        return
    };

    imagesApiService.resetPage();  
    clearContainer();
    fetchImage();
  
}

function createMarkup(result) {

    if (result.hits.length === 0) {
        error(
            {
                delay: 2000,
                text: "Not found",
                maxOpen: 1,
          })
        loadMoreBtn.hide();
        return
    }
  
    loadMoreBtn.show();
    refs.output.insertAdjacentHTML('beforeend', cardTpl(result.hits));
    setTimeout(() => onPageScroll(), 1000);
    
}


function clearContainer() {
    refs.output.innerHTML = '';
}

function fetchImage() {
  
    loadMoreBtn.disable();
    imagesApiService.fetchImages().then(result => {
      imagesApiService.incrementPage();
        
        loadMoreBtn.enable();
        createMarkup(result); 
    });
    
}

function onPageScroll() {
  window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth',
    });
}

// back to top button
let backToTopBtn = document.getElementById("btn-back-to-top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
backToTopBtn.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}