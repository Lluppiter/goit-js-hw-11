import axios from 'axios';
const baseURL = 'https://pixabay.com/api/';

export class ImagesAPI {
  static q = '';
  static size = 40;
  static page = 1;
  static async searchImg(query) {
    if (query.trim()) ImagesAPI.q = query;
    const config = {
      params: {
        key: '29872901-4e143f668c6284d5f724066ff',
        q: ImagesAPI.q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: ImagesAPI.size,
        page: ImagesAPI.page,
      },
    };
    try {
      return await axios.get(baseURL, config);
    } catch (error) {
      console.log(error.message);
    }
  }
}
