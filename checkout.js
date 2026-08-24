/* =========================================
   ÉLAN CHECKOUT
========================================= */


/* =========================================
   CART
========================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("elanCart")
    ) || [];

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


/* =========================================
   CALCULATE TOTALS
========================================= */

function calculateTotals() {

    const cart = getCart();

    const subtotal = cart.reduce(
        (sum, item) =>
            sum + (
                Number(item.price) *
                Number(item.quantity)
            ),
        0
    );

    const shipping =
        subtotal >= 2999
            ? 0
            : subtotal > 0
                ? 199
                : 0;

    const total =
        subtotal + shipping;

    return {
        subtotal,
        shipping,
        total
    };

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function renderCheckoutProducts() {

    const container =
        document.getElementById(
            "checkoutProducts"
        );

    const cart = getCart();

    if (!cart.length) {

        container.innerHTML = `
            <div class="checkout-empty">

                <p>
                    Your bag is empty.
                </p>

                <a href="E_commerce.html">
                    CONTINUE SHOPPING →
                </a>

            </div>
        `;

        document.getElementById(
            "checkoutSubtotal"
        ).textContent = "₹0";

        document.getElementById(
            "shippingCost"
        ).textContent = "₹0";

        document.getElementById(
            "checkoutTotal"
        ).textContent = "₹0";

        document.getElementById(
            "placeOrderBtn"
        ).disabled = true;

        return;

    }


    container.innerHTML = cart.map(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);

        return `
            <div class="checkout-product">

                <div class="checkout-product-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <span>
                        ${item.quantity}
                    </span>

                </div>


                <div class="checkout-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ÉLAN / Selected Style
                    </p>

                </div>


                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </div>
        `;

    }).join("");


    updateTotals();

}


/* =========================================
   UPDATE TOTALS
========================================= */

function updateTotals() {

    const totals =
        calculateTotals();


    document.getElementById(
        "checkoutSubtotal"
    ).textContent =
        formatPrice(
            totals.subtotal
        );


    document.getElementById(
        "shippingCost"
    ).textContent =
        totals.shipping === 0
            ? "FREE"
            : formatPrice(
                totals.shipping
            );


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        formatPrice(
            totals.total
        );

}


/* =========================================
   FORM VALIDATION
========================================= */

function validateForm() {

    const fields = [
        "email",
        "phone",
        "firstName",
        "lastName",
        "address",
        "city",
        "state",
        "pincode"
    ];


    for (const id of fields) {

        const field =
            document.getElementById(id);

        if (!field.value.trim()) {

            field.focus();

            alert(
                "Please complete all required fields."
            );

            return false;

        }

    }


    /* EMAIL */

    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        document
            .getElementById("email")
            .focus();

        alert(
            "Please enter a valid email address."
        );

        return false;

    }


    /* PHONE */

    const phone =
        document
            .getElementById("phone")
            .value
            .replace(/\D/g, "");


    if (phone.length < 10) {

        document
            .getElementById("phone")
            .focus();

        alert(
            "Please enter a valid phone number."
        );

        return false;

    }


    /* PIN CODE */

    const pincode =
        document
            .getElementById("pincode")
            .value
            .trim();


    if (!/^\d{6}$/.test(pincode)) {

        document
            .getElementById("pincode")
            .focus();

        alert(
            "Please enter a valid 6-digit PIN code."
        );

        return false;

    }


    return true;

}


/* =========================================
   CUSTOMER DATA
========================================= */

function getCustomerData() {

    return {

        email:
            document
                .getElementById("email")
                .value
                .trim(),

        phone:
            document
                .getElementById("phone")
                .value
                .trim(),

        firstName:
            document
                .getElementById("firstName")
                .value
                .trim(),

        lastName:
            document
                .getElementById("lastName")
                .value
                .trim(),

        address:
            document
                .getElementById("address")
                .value
                .trim(),

        city:
            document
                .getElementById("city")
                .value
                .trim(),

        state:
            document
                .getElementById("state")
                .value
                .trim(),

        pincode:
            document
                .getElementById("pincode")
                .value
                .trim(),

        country: "India"

    };

}


/* =========================================
   PAYMENT METHOD
========================================= */

function getPaymentMethod() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    return selected
        ? selected.value
        : "cod";

}


/* =========================================
   PAYMENT UI
========================================= */

document
    .querySelectorAll(
        'input[name="payment"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                document
                    .querySelectorAll(
                        ".payment-option"
                    )
                    .forEach(option => {

                        option.classList.remove(
                            "active"
                        );

                    });


                input
                    .closest(
                        ".payment-option"
                    )
                    .classList.add(
                        "active"
                    );

            }
        );

    });


/* =========================================
   PLACE ORDER
========================================= */

document
    .getElementById("placeOrderBtn")
    .addEventListener(
        "click",
        () => {

            const cart =
                getCart();


            /* EMPTY CART */

            if (!cart.length) {

                alert(
                    "Your bag is empty."
                );

                window.location.href =
                    "E_commerce.html";

                return;

            }


            /* VALIDATE */

            if (!validateForm()) {

                return;

            }


            const customer =
                getCustomerData();


            const totals =
                calculateTotals();


            const payment =
                getPaymentMethod();


            /* ORDER ID */

            const orderId =
                "ELAN-" +
                Date.now()
                    .toString()
                    .slice(-8);


            /* ORDER */

            const order = {

                orderId,

                date:
                    new Date().toISOString(),

                status:
                    "Order Confirmed",

                customer,

                payment,

                products: cart,

                subtotal:
                    totals.subtotal,

                shipping:
                    totals.shipping,

                total:
                    totals.total

            };


            /* SAVE ORDER */

            localStorage.setItem(
                "elanLastOrder",
                JSON.stringify(order)
            );


            /* SAVE ALL ORDERS */

            const existingOrders =
                JSON.parse(
                    localStorage.getItem("elanOrders")
                ) || [];

            existingOrders.push(order);

            localStorage.setItem(
                "elanOrders",
                JSON.stringify(existingOrders)
            );


            /* CLEAR CART */

            localStorage.removeItem(
                "elanCart"
            );


            /* SUCCESS PAGE */

            document.body.innerHTML = `

                <div class="order-success">

                    <div class="success-box">

                        <p class="eyebrow">
                            ÉLAN / ORDER CONFIRMED
                        </p>


                        <div class="success-icon">
                            ✓
                        </div>


                        <h1>
                            Thank you,
                            <em>${customer.firstName}.</em>
                        </h1>


                        <p class="success-message">

                            Your order has been
                            successfully placed.

                        </p>


                        <div class="order-number">

                            <span>
                                ORDER
                            </span>

                            <strong>
                                ${orderId}
                            </strong>

                        </div>


                        <div class="success-total">

                            <span>
                                TOTAL
                            </span>

                            <strong>
                                ${formatPrice(
                totals.total
            )}
                            </strong>

                        </div>


                        <p class="payment-message">

                            ${payment === "cod"
                    ? "Payment will be collected when your order arrives."
                    : "Online payment selected. Connect a real payment gateway before accepting live payments."
                }

                        </p>


                        <div class="success-actions">

                            <a
                                href="order-tracking.html"
                                class="success-btn"
                            >
                                TRACK ORDER →
                            </a>


                            <a
                                href="E_commerce.html"
                                class="success-btn secondary"
                            >
                                CONTINUE SHOPPING →
                            </a>

                        </div>

                    </div>

                </div>

            `;


            /* SUCCESS PAGE CSS */

            const style =
                document.createElement(
                    "style"
                );


            style.textContent = `

                .order-success {

                    min-height: 100vh;

                    background: #f5f2ec;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    padding: 40px 20px;

                    text-align: center;

                }


                .success-box {

                    max-width: 650px;

                    width: 100%;

                }


                .success-icon {

                    width: 70px;

                    height: 70px;

                    border-radius: 50%;

                    background: #171717;

                    color: #fff;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    margin: 30px auto;

                    font-size: 28px;

                }


                .success-box h1 {

                    font-family:
                        "Playfair Display",
                        serif;

                    font-size:
                        clamp(
                            48px,
                            7vw,
                            80px
                        );

                    font-weight: 400;

                    line-height: .95;

                    margin-bottom: 25px;

                }


                .success-box h1 em {

                    font-weight: 400;

                }


                .success-message {

                    color: #6f6c66;

                    font-size: 14px;

                    line-height: 1.7;

                    margin-bottom: 35px;

                }


                .order-number,
                .success-total {

                    max-width: 420px;

                    margin: 0 auto;

                    padding: 18px 0;

                    border-top:
                        1px solid #d0cdc6;

                    display: flex;

                    justify-content:
                        space-between;

                    font-size: 10px;

                    letter-spacing: 1.5px;

                }


                .success-total {

                    border-bottom:
                        1px solid #d0cdc6;

                }


                .order-number strong,
                .success-total strong {

                    font-size: 12px;

                    letter-spacing: 0;

                }


                .payment-message {

                    color: #77736d;

                    font-size: 12px;

                    line-height: 1.6;

                    margin: 30px auto;

                    max-width: 450px;

                }


                .success-actions {

                    display: flex;

                    justify-content: center;

                    gap: 12px;

                    flex-wrap: wrap;

                }


                .success-btn {

                    display: inline-flex;

                    align-items: center;

                    justify-content: center;

                    background: #171717;

                    color: #fff;

                    padding: 17px 28px;

                    font-size: 10px;

                    letter-spacing: 2px;

                    text-decoration: none;

                    transition: .3s ease;

                }


                .success-btn:hover {

                    background: #333;

                    transform:
                        translateY(-2px);

                }


                .success-btn.secondary {

                    background: transparent;

                    color: #171717;

                    border:
                        1px solid #171717;

                }


                .success-btn.secondary:hover {

                    background: #171717;

                    color: #fff;

                }

            `;


            document.head.appendChild(
                style
            );

        }
    );


/* =========================================
   INITIAL LOAD
========================================= */

renderCheckoutProducts();