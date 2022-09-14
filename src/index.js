import { createMarkup } from './js/createMarkup';
import { fetchImg } from './js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const imageList = document.querySelector('.gallery');
const loadButton = document.querySelector('.load');
let inputData;
let page;
let gallery;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  inputData = e.currentTarget.elements.searchQuery.value.trim();
  loadButton.hidden = true;
  if (inputData !== '') {
    try {
      page = 1;
      const images = await fetchImg(inputData, page);
      const imagesArray = images.data.hits;
      imageList.innerHTML = '';
      if (imagesArray.length === 0) {
        Notiflix.Notify.warning(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${images.data.totalHits} images.`
        );
        imageList.insertAdjacentHTML('beforeend', createMarkup(imagesArray));
        gallery = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
        });
        gallery.on('show.simplelightbox');
        if (images.data.hits.length === 40) {
          loadButton.hidden = false;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});

loadButton.addEventListener('click', async () => {
  page += 1;
  const images = await fetchImg(inputData, page);
  const imagesArray = images.data.hits;
  imageList.insertAdjacentHTML('beforeend', createMarkup(imagesArray));

  gallery.on('show.simplelightbox').refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  if (images.data.hits.length < 40) {
    loadButton.hidden = true;
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
});
