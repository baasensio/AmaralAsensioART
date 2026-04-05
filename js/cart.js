function expandImage(event) {
    let imgOverlay = document.querySelector(".image-overlay");
    if (!imgOverlay) return;
    let expImg = imgOverlay.querySelector(".expanded-image");
    expImg.src = this.dataset.filePath;
    let priceTag = imgOverlay.querySelector("#price-tag");
    priceTag.innerHTML = `${this.dataset.price}€`;
    let imageCaption = imgOverlay.querySelector(".image-caption>p");
    imageCaption.innerHTML = `${this.dataset.caption}. ${this.dataset.year}`;
    let shopButtons = imgOverlay.querySelector(".purchase-buttons-section").children;
    let addToCart = shopButtons[0];
    let buyNow = shopButtons[1];

    if (isElementInCart(this.dataset.id)) addToCart.classList.add('inactive');
    else addToCart.classList.remove('inactive');
    addToCart.dataset.key = this.dataset.id;

    imgOverlay.classList.remove("d-none");
}

function saveCart(cart) {
    try {
        const jsonString = JSON.stringify(cart);
        localStorage.setItem("shoppingCart", jsonString);
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}

function getCart() {
    const jsonString = localStorage.getItem("shoppingCart");
    if (!jsonString) return [];
    
    return JSON.parse(jsonString) || [];
}

function addElementToCart(key) {
    const intKey = parseInt(key);
    const currentCart = getCart();
    if (currentCart.includes(intKey)) return false;
    currentCart.push(intKey);
    saveCart(currentCart);
    return true;
}

function removeElementFromCart(key) {
    const currentCart = getCart();
    const index = currentCart.indexOf(key);
    if (index !== -1) {
        currentCart.splice(index, 1);
        saveCart(currentCart);
        return true;
    }
    return false;
}

function isElementInCart(key) {
    return getCart().includes(parseInt(key));
}