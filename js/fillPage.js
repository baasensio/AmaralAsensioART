const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

        if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            entry.target.classList.add("opaque");
            observer.unobserve(entry.target);
        }
    })
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.75
})

function changePage(event) {
  sessionStorage.setItem('pendingSubmenuTarget', this.id);
  const isArtWork = window.location.pathname.includes("/index");

  if (!isArtWork) window.location.href = "index.html";

  let page = this.id;
  let images = document.querySelectorAll(`.portfolio-group`);

  let to_hide = [...images].filter(el => el.matches(`:not(.${page})`));
//   to_hide = [...to_hide].filter(el => el.matches(":not(.d-none)"));

  let wantedArt = [...images].filter(el => el.matches(`.${page}`));

  to_hide.forEach((img) => {
    img.classList.add("d-none");
  });

  wantedArt.forEach((img, i) => {
    img.classList.toggle("opaque", i<2)
    if (i >= 2) observer.observe(img);
    img.classList.remove("d-none");
  })
}


let fillPage = (arte, condition) => {
    document.addEventListener('DOMContentLoaded', () => {
        const pendingTarget = sessionStorage.getItem('pendingSubmenuTarget');
        if (pendingTarget) sessionStorage.removeItem('pendingSubmenuTarget');
        const isArtWork = window.location.pathname.includes("/index");


        let page = document.querySelector(".portfolio-page");
        const alignmentValues = ['center', 'end', 'start'];
        let previousAlignment;
        let visibleImages = 0;

        arte.images.forEach((image, i) => {
            const portfolioGroup = document.createElement('div');
            portfolioGroup.className = `portfolio-group col-6 ${image.type}`;

            const portfolioItem = document.createElement('div');
            portfolioItem.dataset.id = i;
            portfolioItem.dataset.filePath = image.filePath;
            portfolioItem.dataset.caption = image.caption;
            portfolioItem.dataset.price = image.price;
            portfolioItem.dataset.year = image.year;
            portfolioItem.dataset.type = image.type;
            portfolioItem.dataset.available = image.available;
            portfolioItem.className = 'portfolio-item';

            const img = document.createElement('img');
            img.src = image.filePath;
            img.alt = image.caption;

            const detail = document.createElement('span');
            detail.className = 'detail';
            detail.textContent = image.caption;

            portfolioItem.addEventListener('click', expandImage);
            portfolioItem.appendChild(img);
            portfolioItem.appendChild(detail);
            portfolioGroup.appendChild(portfolioItem);

            // Align images to display avoiding 2 centered
            if (condition(image, visibleImages) & (!isArtWork | !pendingTarget | pendingTarget === image.type)) {
                let availableValues = alignmentValues.length;
                if (visibleImages%2 & previousAlignment == "end") {
                    availableValues = 2;
                }
                const randomAlignment = alignmentValues[Math.floor(Math.random() * availableValues)];
                portfolioGroup.style.alignItems = randomAlignment;
                previousAlignment = randomAlignment;
                visibleImages += 1;

                // Apply opacity when on screen
                if (visibleImages <= 2) portfolioGroup.classList.add("opaque");
                else observer.observe(portfolioGroup);
            }
            else portfolioGroup.classList.add("d-none"); // Hide image

            page.appendChild(portfolioGroup);
        });

        document.querySelectorAll('.main-nav ul ul li').forEach((item, i) => {
            item.addEventListener("click", changePage);
        });

        if (!isArtWork) {
            let shopButtons = document.querySelector(".purchase-buttons-section").children;
            let addToCart = shopButtons[0];
            let buyNow = shopButtons[1];

            addToCart.addEventListener("click", (event) => {
                addToCart.classList.add('inactive');
                addElementToCart(event.target.dataset.key);
            })
        }
    });
}