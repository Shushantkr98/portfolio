/* =========================================
   ÉLAN HOME PAGE JAVASCRIPT
========================================= */


/* =========================================
   CART
========================================= */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("elanCart")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "elanCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, product) => {

            return total +
                (product.quantity || 1);

        },
        0
    );


    const cartCounter =
        document.getElementById("cartCount");


    if (cartCounter) {

        cartCounter.textContent = totalItems;

    }

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================
   ADD TO BAG
========================================= */

function addHomeProductToCart(button) {

    const card =
        button.closest(".product-card");


    if (!card) return;


    /* PRODUCT NAME */

    const productName =
        card.querySelector(".product-info h3")
            ?.textContent
            .trim() || "Product";


    /* PRODUCT IMAGE */

    const image =
        card.querySelector("img")
            ?.src || "";


    /* PRODUCT PRICE */

    const priceText =
        card.querySelector(".product-info strong")
            ?.textContent || "0";


    const price = Number(

        priceText.replace(/[^\d]/g, "")

    );


    /* CREATE PRODUCT ID */

    const productId =

        card.dataset.id ||

        "home-" +

        productName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");


    const product = {

        id: productId,

        name: productName,

        price: price,

        image: image,

        category: "home",

        size: "M",

        quantity: 1

    };


    const cart = getCart();


    const existingProduct =

        cart.find(item =>
            String(item.id) ===
            String(product.id)
        );


    if (existingProduct) {

        existingProduct.quantity =

            (existingProduct.quantity || 1) + 1;

    }

    else {

        cart.push(product);

    }


    saveCart(cart);

    updateCartCount();


    showToast(
        `${productName} added to bag ✓`
    );

}


/* =========================================
   QUICK ADD BUTTONS
========================================= */

const quickAddButtons =
    document.querySelectorAll(".quick-add");


quickAddButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            addHomeProductToCart(button);

        }
    );

});


/* =========================================
   WISHLIST
========================================= */

const wishlistButtons =
    document.querySelectorAll(".wishlist");


wishlistButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            button.classList.toggle("active");


            if (
                button.classList.contains("active")
            ) {

                button.textContent = "♥";

                showToast(
                    "Added to wishlist ♡"
                );

            }

            else {

                button.textContent = "♡";

                showToast(
                    "Removed from wishlist"
                );

            }

        }
    );

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const mobileNav =
    document.getElementById("mobileNav");


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();


            if (navLinks) {

                navLinks.classList.toggle(
                    "active"
                );

            }


            if (mobileNav) {

                mobileNav.classList.toggle(
                    "active"
                );

            }

        }
    );

}


/* CLOSE MENU AFTER CLICKING LINK */

const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }


            if (mobileNav) {

                mobileNav.classList.remove(
                    "active"
                );

            }

        }
    );

});


/* =========================================
   SEARCH
========================================= */

const searchBtn =
    document.getElementById("searchBtn");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


function openSearchOverlay() {

    if (!searchOverlay) return;


    searchOverlay.classList.add("active");

    document.body.style.overflow = "hidden";


    setTimeout(() => {

        if (searchInput) {

            searchInput.focus();

        }

    }, 300);

}


function closeSearchOverlay() {

    if (searchOverlay) {

        searchOverlay.classList.remove(
            "active"
        );

    }


    document.body.style.overflow = "";

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openSearchOverlay();

        }
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        closeSearchOverlay
    );

}


/* =========================================
   POPULAR SEARCHES
========================================= */

const popularButtons =
    document.querySelectorAll(
        ".popular-searches button"
    );


popularButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (!searchInput) return;


            searchInput.value =
                button.textContent.trim();


            searchInput.focus();

        }
    );

});


/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById("newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const emailInput =
                document.getElementById("email");


            const email =
                emailInput
                    ?.value
                    .trim();


            if (email) {

                showToast(
                    "You're on the list ✓"
                );

                newsletterForm.reset();

            }

        }
    );

}


/* =========================================
   BAG DRAWER
========================================= */

const bagDrawer =
    document.getElementById("bagDrawer");

const bagOverlay =
    document.getElementById("bagOverlay");

const closeBag =
    document.getElementById("closeBag");

const bagProducts =
    document.getElementById("bagProducts");

const bagTotal =
    document.getElementById("bagTotal");

const bagButton =
    document.querySelector(".bag-btn");


function renderBagDrawer() {

    if (!bagProducts || !bagTotal) return;


    const cart = getCart();


    bagProducts.innerHTML = "";


    let total = 0;


    if (!cart.length) {

        bagProducts.innerHTML = `

            <div class="empty-bag">
                YOUR BAG IS EMPTY
            </div>

        `;


        bagTotal.textContent = "₹0";

        return;

    }


    cart.forEach(product => {

        const quantity =
            product.quantity || 1;


        const itemTotal =
            product.price * quantity;


        total += itemTotal;


        bagProducts.innerHTML += `

            <div class="bag-product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        QTY ${quantity}
                    </p>

                </div>

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

            </div>

        `;

    });


    bagTotal.textContent =

        `₹${total.toLocaleString("en-IN")}`;

}


function openBagDrawer() {

    if (!bagDrawer || !bagOverlay) return;


    renderBagDrawer();


    bagDrawer.classList.add("open");

    bagOverlay.classList.add("open");


    document.body.style.overflow = "hidden";

}


function closeBagDrawer() {

    if (bagDrawer) {

        bagDrawer.classList.remove("open");

    }


    if (bagOverlay) {

        bagOverlay.classList.remove("open");

    }


    document.body.style.overflow = "";

}


/* BAG BUTTON */

if (bagButton) {

    bagButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            openBagDrawer();

        }
    );

}


/* CLOSE BAG BUTTON */

if (closeBag) {

    closeBag.addEventListener(
        "click",
        closeBagDrawer
    );

}


/* CLOSE BAG OVERLAY */

if (bagOverlay) {

    bagOverlay.addEventListener(
        "click",
        closeBagDrawer
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchOverlay();

            closeBagDrawer();

        }

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(

        ".section-heading, " +
        ".collection-card, " +
        ".product-card, " +
        ".story-content, " +
        ".story-image, " +
        ".newsletter"

    );


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        element.style.opacity = "0";


        element.style.transform =
            "translateY(25px)";


        element.style.transition =
            "opacity 0.7s ease, " +
            "transform 0.7s ease";


        observer.observe(element);

    });

}


/* =========================================
   INITIAL LOAD
========================================= */

updateCartCount();