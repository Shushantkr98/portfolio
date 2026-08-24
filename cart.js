const cartItems =
    document.getElementById("cartItems");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");


let cart =
    JSON.parse(
        localStorage.getItem("elanCart")
    ) || [];


/* ================================
   FORMAT PRICE
================================ */

function formatPrice(price) {

    return `₹${price.toLocaleString("en-IN")}`;

}


/* ================================
   RENDER CART
================================ */

function renderCart() {

    cartItems.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>YOUR BAG IS EMPTY</span>

                <h2>Nothing here yet.</h2>

                <a href="men.html">
                    EXPLORE COLLECTION →
                </a>

            </div>

        `;

        cartSubtotal.textContent = "₹0";
        cartTotal.textContent = "₹0";
        cartCount.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach((product, index) => {

        const quantity =
            product.quantity || 1;


        /* TOTAL WITH QUANTITY */

        total +=
            product.price * quantity;


        cartItems.innerHTML += `

            <article class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <div>

                        <span>
                            ${product.category
                                ? product.category.toUpperCase()
                                : "PRODUCT"}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                    </div>


                    <!-- QUANTITY -->

                    <div class="quantity-box">

                        <button
                            class="quantity-btn minus"
                            data-index="${index}"
                            type="button"
                        >
                            −
                        </button>


                        <span class="quantity">
                            ${quantity}
                        </span>


                        <button
                            class="quantity-btn plus"
                            data-index="${index}"
                            type="button"
                        >
                            +
                        </button>

                    </div>


                    <!-- ITEM TOTAL -->

                    <strong>
                        ${formatPrice(
                            product.price * quantity
                        )}
                    </strong>


                    <button
                        class="remove-item"
                        data-index="${index}"
                        type="button"
                    >
                        REMOVE
                    </button>

                </div>

            </article>

        `;

    });


    /* UPDATE TOTALS */

    cartSubtotal.textContent =
        formatPrice(total);

    cartTotal.textContent =
        formatPrice(total);


    /* UPDATE CART COUNT */

    const totalItems =
        cart.reduce(
            (sum, product) =>
                sum + (product.quantity || 1),
            0
        );

    cartCount.textContent =
        totalItems;


    /* EVENTS */

    addRemoveEvents();

    addQuantityEvents();

}


/* ================================
   REMOVE ITEM
================================ */

function addRemoveEvents() {

    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(index, 1);


                    localStorage.setItem(
                        "elanCart",
                        JSON.stringify(cart)
                    );


                    renderCart();

                }
            );

        });

}


/* ================================
   QUANTITY EVENTS
================================ */

function addQuantityEvents() {

    /* PLUS */

    document
        .querySelectorAll(".plus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart[index].quantity =
                        (cart[index].quantity || 1) + 1;


                    localStorage.setItem(
                        "elanCart",
                        JSON.stringify(cart)
                    );


                    renderCart();

                }
            );

        });


    /* MINUS */

    document
        .querySelectorAll(".minus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const quantity =
                        cart[index].quantity || 1;


                    if (quantity > 1) {

                        cart[index].quantity--;

                    }


                    localStorage.setItem(
                        "elanCart",
                        JSON.stringify(cart)
                    );


                    renderCart();

                }
            );

        });

}


/* ================================
   CHECKOUT
================================ */

const checkoutBtn =
    document.getElementById("checkoutBtn");


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert("Your bag is empty.");

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


/* ================================
   INITIAL LOAD
================================ */

renderCart();