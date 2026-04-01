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
            }
            else portfolioGroup.classList.add("d-none"); // Hide image

            page.appendChild(portfolioGroup);
        });

        document.querySelectorAll('.main-nav ul ul li').forEach((item, i) => {
            item.addEventListener("click", changePage);
        });
    });
}