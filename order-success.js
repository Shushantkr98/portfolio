/* =========================================
   ÉLAN ORDER SUCCESS
========================================= */


/* GET SAVED ORDER */

const order =
    JSON.parse(
        localStorage.getItem(
            "elanLatestOrder"
        )
    );


/* =========================================
   DOM
========================================= */

const orderId =
    document.getElementById(
        "orderId"
    );

const orderDate =
    document.getElementById(
        "orderDate"
    );

const customerName =
    document.getElementById(
        "customerName"
    );

const paymentMethod =
    document.getElementById(
        "paymentMethod"
    );

const deliveryAddress =
    document.getElementById(
        "deliveryAddress"
    );

const orderTotal =
    document.getElementById(
        "orderTotal"
    );

const successProducts =
    document.getElementById(
        "successProducts"
    );


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return `₹${price.toLocaleString("en-IN")}`;

}


/* =========================================
   NO ORDER
========================================= */

if (!order) {

    orderId.textContent =
        "NO ORDER";

    customerName.textContent =
        "No recent order found.";

    paymentMethod.textContent =
        "—";

    deliveryAddress.textContent =
        "—";

    orderTotal.textContent =
        "₹0";


    successProducts.innerHTML = `

        <div class="success-empty">

            No recent order found.

            <br><br>

            <a href="men.html">
                START SHOPPING →
            </a>

        </div>

    `;

}


/* =========================================
   DISPLAY ORDER
========================================= */

if (order) {


    /* ORDER ID */

    orderId.textContent =
        order.orderId;


    /* DATE */

    orderDate.textContent =
        order.date;


    /* CUSTOMER */

    customerName.textContent =
        `${order.customer.firstName}
         ${order.customer.lastName}`;


    /* PAYMENT */

    paymentMethod.textContent =
        order.payment === "cod"
            ? "Cash on Delivery"
            : "Online Payment";


    /* ADDRESS */

    deliveryAddress.innerHTML = `

        ${order.customer.address}<br>

        ${order.customer.city},
        ${order.customer.state}
        ${order.customer.pincode}<br>

        India

    `;


    /* TOTAL */

    orderTotal.textContent =
        formatPrice(
            order.total
        );


    /* PRODUCTS */

    successProducts.innerHTML = "";


    order.products.forEach(
        (product) => {

            const quantity =
                product.quantity || 1;


            successProducts.innerHTML += `

                <article class="success-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >


                    <div class="success-product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <span>
                            QUANTITY: ${quantity}
                        </span>

                    </div>


                    <strong>

                        ${formatPrice(
                            product.price *
                            quantity
                        )}

                    </strong>

                </article>

            `;

        }
    );

}