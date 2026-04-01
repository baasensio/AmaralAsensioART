/* Pagination */
function changePage(event) {
  sessionStorage.setItem('pendingSubmenuTarget', this.id);
  const isArtWork = window.location.pathname.includes("/index");

  if (!isArtWork) window.location.href = "index.html";

  let page = this.id;
  let images = document.querySelectorAll(`.portfolio-group`);

  let to_hide = [...images].filter(el => el.matches(`:not(.${page})`));
  to_hide = [...to_hide].filter(el => el.matches(":not(.d-none)"));

  let to_show = [...images].filter(el => el.matches(`.${page}`));
  to_show = [...to_show].filter(el => el.matches(".d-none"));

  to_hide.forEach((img) => {
    img.classList.add("d-none");
  });

  to_show.forEach((img) => {
    img.classList.remove("d-none");
  });
}

function expandImage(event) {

  let imgOverlay = document.querySelector(".image-overlay");
  if (!imgOverlay) return;
  let expImg = imgOverlay.querySelector(".expanded-image");
  expImg.src = this.dataset.filePath;
  let priceTag = imgOverlay.querySelector("#price-tag");
  priceTag.innerHTML = `${this.dataset.price}€`;
  let imageCaption = imgOverlay.querySelector(".image-caption>p");
  imageCaption.innerHTML = `${this.dataset.caption}. ${this.dataset.year}`;

  imgOverlay.classList.remove("d-none");
}

/*  Google Map */
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initialize';
  document.body.appendChild(script);
}

function initialize() {
    var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(40.7823234,-73.9654161)
    };
    var map = new google.maps.Map(document.getElementById('templatemo_map'),  mapOptions);
}