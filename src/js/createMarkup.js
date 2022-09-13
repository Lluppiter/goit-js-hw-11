export function createMarkup(images) {
  return images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="photo-card">    
    <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes</b> <br />${image.likes}
    </p>
    <p class="info-item">
    <b>Views</b> <br />${image.views}
    </p>
    <p class="info-item">
    <b>Comments</b> <br />${image.comments}
    <p class="info-item">
    <b>Downloads</b> <br />${image.downloads}
    </p>
    </div>    
    </a>`
    )
    .join('');
}
