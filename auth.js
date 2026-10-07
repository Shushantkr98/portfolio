// ========================================
// WORKORA - GLOBAL AUTHENTICATION SYSTEM
// ========================================

const WORKORA_LOGIN_KEY = "workoraLoggedIn";


// ========================================
// GET LOGGED IN USER
// ========================================

function getWorkoraUser() {

    try {

        const user =
            localStorage.getItem(WORKORA_LOGIN_KEY);

        if (!user) {
            return null;
        }

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "Workora auth error:",
            error
        );

        return null;

    }

}


// ========================================
// UPDATE NAVBAR
// ========================================

function updateWorkoraAuth() {

    const user =
        getWorkoraUser();


    // ------------------------------------
    // OLD / EXISTING AUTH NAV
    // ------------------------------------

    const guestNav =
        document.getElementById("guestNav");

    const userNav =
        document.getElementById("userNav");

    const profileNavName =
        document.getElementById("profileNavName");


    // ------------------------------------
    // IF guestNav + userNav EXIST
    // ------------------------------------

    if (guestNav && userNav) {

        if (user) {

            guestNav.style.display = "none";

            userNav.style.display = "flex";

        } else {

            guestNav.style.display = "flex";

            userNav.style.display = "none";

        }

    }


    // ------------------------------------
    // PROFILE NAME
    // ------------------------------------

    if (profileNavName && user) {

        profileNavName.textContent =
            user.name ||
            user.email ||
            "Profile";

    }


    // ====================================
    // GENERIC NAVBAR
    // ====================================

    const navActions =
        document.querySelector(".nav-actions");


    if (!navActions) {
        return;
    }


    // ------------------------------------
    // IF PAGE ALREADY HAS guestNav/userNav
    // ------------------------------------

    if (guestNav && userNav) {

        return;

    }


    // ------------------------------------
    // LOGIN / REGISTER BUTTONS
    // ------------------------------------

    const loginButton =
        navActions.querySelector(
            'a[href="login.html"]'
        );

    const registerButton =
        navActions.querySelector(
            'a[href="register.html"]'
        );


    // ====================================
    // USER LOGGED IN
    // ====================================

    if (user) {

        // Hide Login

        if (loginButton) {

            loginButton.style.display =
                "none";

        }


        // Hide Register

        if (registerButton) {

            registerButton.style.display =
                "none";

        }


        // --------------------------------
        // Create logged-in navigation
        // --------------------------------

        let dynamicUserNav =
            document.getElementById(
                "dynamicUserNav"
            );


        if (!dynamicUserNav) {

            dynamicUserNav =
                document.createElement("div");

            dynamicUserNav.id =
                "dynamicUserNav";

            dynamicUserNav.className =
                "dynamic-user-nav";


            dynamicUserNav.innerHTML = `

                <a
                    href="dashboard.html"
                    class="dashboard-nav-btn"
                >
                    📊 Dashboard
                </a>

                <a
                    href="profile.html"
                    class="profile-nav-btn"
                >
                    👤
                    <span>
                        ${
                            user.name ||
                            "Profile"
                        }
                    </span>
                </a>

                <button
                    type="button"
                    class="logout-nav-btn"
                    id="dynamicLogoutBtn"
                >
                    Logout
                </button>

            `;


            navActions.appendChild(
                dynamicUserNav
            );


            // --------------------------------
            // Logout
            // --------------------------------

            const logoutButton =
                document.getElementById(
                    "dynamicLogoutBtn"
                );


            if (logoutButton) {

                logoutButton.addEventListener(
                    "click",
                    function () {

                        localStorage.removeItem(
                            WORKORA_LOGIN_KEY
                        );

                        localStorage.removeItem(
                            "workoraRememberMe"
                        );

                        window.location.href =
                            "index.html";

                    }
                );

            }

        }

    }


    // ====================================
    // USER NOT LOGGED IN
    // ====================================

    else {

        if (loginButton) {

            loginButton.style.display = "";

        }


        if (registerButton) {

            registerButton.style.display = "";

        }


        const dynamicUserNav =
            document.getElementById(
                "dynamicUserNav"
            );


        if (dynamicUserNav) {

            dynamicUserNav.remove();

        }

    }

}


// ========================================
// LOGOUT EXISTING BUTTON
// ========================================

function setupWorkoraLogout() {

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (!logoutBtn) {
        return;
    }


    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem(
                WORKORA_LOGIN_KEY
            );

            localStorage.removeItem(
                "workoraRememberMe"
            );


            window.location.href =
                "index.html";

        }
    );

}


// ========================================
// RUN AUTH SYSTEM
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateWorkoraAuth();

        setupWorkoraLogout();

    }
);