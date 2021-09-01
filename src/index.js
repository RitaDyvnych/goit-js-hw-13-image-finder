import './sass/main.scss';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash/debounce';
import ImagesApiService from './apiService';
import cardTpl from './templates/card.hbs';
import * as basicLightbox from 'basiclightbox';
import "basiclightbox/dist/basicLightbox.min.css";


const refs = {

    form: document.querySelector('.search-form'),
    // searchInput: document.querySelector('.js-input'),
    output: document.querySelector('.js-output'),
    btnLoad: document.querySelector('.btn')
}
const fetchImg = new ImagesApiService();
refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    if (refs.form.elements.query.value === "") {
        error(
            {
                delay: 2000,
                text: "Type some request",
                maxOpen: 1,
            })
        return
    };
    refs.output.innerHTML = "";

    fetchImg.query = refs.form.elements.query.value;
    fetchImg.fetchImages().then(result => { createMarkup(result) });
    
}

function createMarkup(result) {
    refs.output.insertAdjacentHTML('beforeend', cardTpl(result.hits));
    refs.btnLoad.classList.remove('is-hidden');
}

function onBtnLoadClick() {
    refs.form.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    });
}