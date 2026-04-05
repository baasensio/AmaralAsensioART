let fillCart = (arte) => {
    document.addEventListener('DOMContentLoaded', () => {
        let cart = getCart();
        let page = document.querySelector(".portfolio-page");
        let emptyCart = document.querySelector('.empty-cart');

        if (cart.length) {
            emptyCart.classList.add('d-none');
        }

        for (const key of cart) {
            let image = arte.images[parseInt(key)];

            const cartItem = document.createElement('div');
            cartItem.className = `cart-item col-12`;

            const imgItem = document.createElement('div');
            imgItem.className = `img-item col-6`;

            const img = document.createElement('img');
            img.src = image.filePath;
            img.alt = image.caption;

            imgItem.appendChild(img);

            const purchaseItem = document.createElement('div');
            purchaseItem.className = 'purchase-item col-6';
            const priceDetail = document.createElement('div');
            priceDetail.className = 'price-detail';
            const priceTitle = document.createElement('p');
            priceTitle.textContent = "Price";
            const priceTag = document.createElement('p');
            priceTag.textContent = `${image.price}€`;
            priceDetail.appendChild(priceTitle);
            priceDetail.appendChild(priceTag);

            const binButton = document.createElement('div');
            binButton.className = 'bin-button';
            binButton.innerHTML = `<svg viewBox="0 0 64 64" fill="#2e52a0" width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M20.1685 0h14.663a2.1848 1.6919 90 0 1 1.6919 2.1848l0 0a2.1848 1.6919 90 0 1-1.6919 2.1848l-14.663 0a2.1848 1.6919 90 0 1-1.6919-2.1848l0 0A2.1848 1.6919 90 0 1 20.1685 0z" />
                <path d="M0.9655 7.8653l53.069 0c0.2675 0 0.535 0 0.7502 0.2153C55 8.2958 55 8.5633 55 8.8308v2.4386c0 0.2675 0 0.535-0.2153 0.7503-0.2152 0.2153-0.4827 0.2153-0.7502 0.2153l-53.069 0c-0.2675 0-0.535 0-0.7502-0.2153C0 11.8044 0 11.5369 0 11.2694V8.8308c0-0.2675 0-0.535 0.2153-0.7502 0.2152-0.2153 0.4827-0.2153 0.7502-0.2153z" />
                <path d="M33.2015 19.2264l3.2064 0c0.2701 0 0.5402 0 0.7576 0.2173 0.2173 0.2174 0.2173 0.4875 0.2173 0.7576l0 27.7636c0 0.2701 0 0.5402-0.2173 0.7575-0.2174 0.2174-0.4875 0.2174-0.7576 0.2174l-3.2064 0c-0.2701 0-0.5402 0-0.7576-0.2174-0.2173-0.2173-0.2173-0.4874-0.2173-0.7575l0-27.7636c0-0.2701 0-0.5402 0.2173-0.7576 0.2174-0.2173 0.4875-0.2173 0.7576-0.2173z" />
                <path stroke-width="4.37" stroke="#2e52a0" fill="none" d="M6.875 10.0501l41.25 0v47.5562c0 1.093 0 2.1861-0.8796 3.0657-0.8796 0.8796-1.9727 0.8796-3.0657 0.8796l-33.3594 0c-1.093 0-2.1861 0-3.0657-0.8796-0.8796-0.8796-0.8796-1.9727-0.8796-3.0657z" />
                <path transform="translate(-0.5)" d="M19.006 19.2264l3.3787 0c0.2462 0 0.4924 0 0.6906 0.1981 0.1981 0.1982 0.1981 0.4444 0.1981 0.6906l0 27.9359c0 0.2463 0 0.4925-0.1981 0.6907-0.1982 0.1981-0.4444 0.1981-0.6906 0.1981l-3.3787 0c-0.2463 0-0.4925 0-0.6907-0.1981-0.1981-0.1982-0.1981-0.4444-0.1981-0.6907l0-27.9359c0-0.2462 0-0.4924 0.1981-0.6906 0.1982-0.1981 0.4444-0.1981 0.6907-0.1981z" />
            </svg>`;

            binButton.addEventListener("click", (event) => {
                removeElementFromCart(key);
                binButton.closest('.cart-item').classList.add('d-none');
                if (!document.querySelectorAll(".portfolio-page>.cart-item:not(.d-none)").length) emptyCart.classList.remove('d-none')
            });

            purchaseItem.appendChild(priceDetail);
            purchaseItem.appendChild(binButton);

            
			// <div class="bin-button">
			// 	<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			// 		<polygon stroke-linecap="square" transform="translate(5513e-6 0.015687)" points="0.050182 0.389558 0.458421 -0.015687 7.995984 7.57757 15.589241 0.040007 15.994487 0.448247 8.401229 7.98581 15.938792 15.579067 15.530552 15.984313 7.99299 8.391055 0.399732 15.928618 -5513e-6 15.520378 7.587744 7.982815" />
			// 	</svg>
			// </div>

            cartItem.appendChild(imgItem);
            cartItem.appendChild(purchaseItem);

            page.appendChild(cartItem);
        }

        document.querySelectorAll('.main-nav ul ul li').forEach((item, i) => {
            item.addEventListener("click", changePage);
        });
    });
}

function changePage(event) {
  sessionStorage.setItem('pendingSubmenuTarget', this.id);
  window.location.href = "index.html";
}
