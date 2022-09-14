import { createMarkup } from './js/createMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImagesAPI } from './js/imagesAPI';

const searchForm = document.querySelector('#search-form');
const imageList = document.querySelector('.gallery');
const loadButton = document.querySelector('.load');
let gallery;

function checkTotalHits(event, page) {
  const totalHits = event.data.totalHits;
  if (totalHits > 40 * page) {
    loadButton.hidden = false;
  } else {
    loadButton.hidden = true;
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

searchForm.addEventListener('submit', event => {
  onFormSubmit(event);
});

async function onFormSubmit(e) {
  e.preventDefault();
  loadButton.hidden = true;
  ImagesAPI.page = 1;
  const query = e.currentTarget.elements.searchQuery.value.trim();
  const images = await ImagesAPI.searchImg(query);
  const imagesArray = images.data.hits;
  imageList.innerHTML = '';
  if (images.data.totalHits === 0) {
    Notiflix.Notify.warning(
      '"Sorry, there are no images matching your search query. Please try again."'
    );
  } else {
    Notiflix.Notify.success(
      `Hooray! We found ${images.data.totalHits} images.`
    );
    checkTotalHits(images, ImagesAPI.page);
  }
  imageList.insertAdjacentHTML('beforeend', createMarkup(imagesArray));
  gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

loadButton.addEventListener('click', async () => {
  ImagesAPI.page += 1;
  const images = await ImagesAPI.searchImg('');
  checkTotalHits(images, ImagesAPI.page);
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
});
