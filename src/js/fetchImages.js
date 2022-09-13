import axios from 'axios';

export async function fetchImg(e, page) {
  const API_KEY = '29872901-4e143f668c6284d5f724066ff';
  const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios.get(BASE_URL);
}
