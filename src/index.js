import SearchPixabay from './api-pixabay';
import galleryTpl from './template/picture-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const searchPixabay = new SearchPixabay();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

const searchForm = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


searchForm.addEventListener('submit', onSearchBtnClick);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
galleryRef.addEventListener('click', onPictureClick);


function onSearchBtnClick(evt) {
    evt.preventDefault();
    resetGallery();

    searchPixabay.searchQuery = evt.target.searchQuery.value.trim();
    searchPixabay.fetchPictures()
        .then(hits => { murkapGallery(hits) });
    
    setTimeout(() => {
        if (searchPixabay.totalHits > 0) {
            Notify.success(`Hooray! We found ${searchPixabay.totalHits} images.`);}
    }, 500);
}

function onLoadMoreBtnClick() {
    searchPixabay.fetchPictures()
        .then(hits => { murkapGallery(hits) });
}


function murkapGallery(hits) {
    if (hits.length !== 0) {
        hits.map(item => {
            galleryRef.insertAdjacentHTML('beforeend', galleryTpl(item));
        });
        lightbox.refresh();
        loadMoreBtn.classList.remove("is-hidden");
    } else if (searchPixabay.totalHits !== 0 && hits.length === 0) {
        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        loadMoreBtn.classList.add("is-hidden");
    } else {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
}

function resetGallery() {
    galleryRef.innerHTML = '';
    searchPixabay.page = 1;
    loadMoreBtn.classList.add("is-hidden");
}

function onPictureClick(evt) {
    evt.preventDefault()

    const isGalleryImageEl = evt.target.classList.contains('gallery__image');

    if (!isGalleryImageEl) {
        return;
    } 
}






