window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('body').addEventListener('click', function(e){
    if(e.target.classList.contains('catalog__item-favorite--like')){
      e.target.classList.toggle('active');
    }
  })

  document.querySelectorAll('.js_open_list_trigger').forEach(item=>{
    item.addEventListener('click', ()=>{
      item.classList.toggle('active');
      item.parentElement.querySelector('.js_open_list').classList.toggle('active');
    });
  });

  document.querySelector('.main-sidebar__toggler').addEventListener('click', function(){
    this.parentElement.classList.toggle('active');
    toggleOverlay();
  })

  document.querySelector('.overlay').addEventListener('click', function(){
    document.querySelector('.main-sidebar').classList.remove('active');
    toggleOverlay();
  })

  axios.get('https://my-json-server.typicode.com/demeja1610/inova_test/catalog').then(response=>{
    fillCatalog(response.data);
  }).catch(error=>{
    show_notification(error, 'error', 1)
  })
})

function show_notification(text, className, isInfinite){
  Toastify({
    text: text,
    duration: isInfinite ? -1 : 3000, 
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: className
  }).showToast();
}

function fillCatalog(data){
  let catalog = document.querySelector('.catalog');
  if(catalog){
    data.forEach(item=>{
      let itemWrapper = document.createElement('div');
      itemWrapper.classList.add('catalog__item');
      itemWrapper.setAttribute('data-id', item.id)
      itemWrapper.innerHTML = 
      `<div class="catalog__item-controls">
        <button class="catalog__item-favorite catalog__item-favorite--like">
          <svg class="catalog__item-favorite-icon" width="20" height="20">
            <use xlink:href="images/svg/sprite.svg#icon-heart"></use>
          </svg>
        </button>
        <button class="catalog__item-favorite catalog__item-favorite--remove" title="Удалить из избранного">
          <svg class="catalog__item-favorite-icon" width="20" height="20">
            <use xlink:href="images/svg/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <button class="catalog__item-play">
          <svg class="catalog__item-play-icon" width="30" height="30">
            <use xlink:href="images/svg/sprite.svg#icon-play"></use>
          </svg>
        </button>
        <picture class="catalog__item-image">
          <source class="catalog__item-img" srcset="${item.webp}" type="image/webp">
          <img class="catalog__item-img" src="${item.image}" alt="${item.title}">
        </picture>
        <div class="catalog__item-ratings">
          <span class="catalog__item-rating">КП: ${item.kinopoisk}</span>
          <span class="catalog__item-rating">IMDb: ${item.imdb}</span>
        </div>
      </div>
      <div class="catalog__item-scores">
        <button class="catalog__item-like">
          <svg class="catalog__item-like-icon" width="16" height="16">
            <use xlink:href="images/svg/sprite.svg#icon-like"></use>
          </svg>
          ${item.liked}
        </button>
        <button class="catalog__item-dislike">
          <svg class="catalog__item-dislike-icon" width="16" height="16">
            <use xlink:href="images/svg/sprite.svg#icon-dislike"></use>
          </svg>
          ${item.disliked}
        </button>
      </div>
      <p class="catalog__item-title">${item.title}</p>
      <p class="catalog__item-seasons">${item.seasons} сезона, ${item.episodes} серий</p>`;
      catalog.classList.remove('loading');
      catalog.appendChild(itemWrapper);
    })
  }
}

function toggleOverlay(){
  document.querySelector('.overlay').classList.toggle('active');
}