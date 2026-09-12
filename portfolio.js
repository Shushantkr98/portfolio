/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hide");
    }, 500);

});


/* =========================================================
   ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /* Close menu after clicking a link */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   NAVBAR SCROLL
========================================================= */

function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
);

handleNavbarScroll();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    if (!navLinks.length) return;

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";


    sections.forEach((section) => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;

        const id =
            section.getAttribute("id");


        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            currentSection = id;

        }

    });


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        if (href === `#${currentSection}`) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNav
);

updateActiveNav();


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   TYPING CURSOR
========================================================= */

const typingCursor =
    document.querySelector(".typing-cursor");


if (typingCursor) {

    setInterval(() => {

        typingCursor.style.opacity =
            typingCursor.style.opacity === "0"
                ? "1"
                : "0";

    }, 500);

}


/* =========================================================
   NUMBER COUNTER
========================================================= */

function animateCounter(element) {

    if (!element) return;


    const target =
        parseInt(
            element.dataset.count,
            10
        );


    if (isNaN(target)) return;


    const originalText =
        element.textContent.trim();


    let suffix = "";

    if (originalText.includes("%")) {

        suffix = "%";

    } else if (originalText.includes("+")) {

        suffix = "+";

    }


    let current = 0;

    const duration = 1200;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                eased * target
            );


        element.textContent =
            `${current}${suffix}`;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                `${target}${suffix}`;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const counterElements =
    document.querySelectorAll(
        "[data-count]"
    );


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    counterElements.forEach((counter) => {

        counterObserver.observe(counter);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal-up, .reveal-left, .reveal-right"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

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


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach((element) => {

        element.classList.add("show");

    });

}


/* =========================================================
   SKILLS PROGRESS
========================================================= */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


if ("IntersectionObserver" in window) {

    const skillObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const progress =
                        entry.target.querySelector(
                            ".skill-progress"
                        );


                    if (!progress) return;


                    const percent =
                        parseInt(
                            progress.dataset.percent,
                            10
                        );


                    const bar =
                        progress.querySelector(
                            ".progress-bar span"
                        );


                    if (
                        bar &&
                        !isNaN(percent)
                    ) {

                        setTimeout(() => {

                            bar.style.width =
                                `${percent}%`;

                        }, 250);

                    }


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.35
            }
        );


    skillCards.forEach((card) => {

        skillObserver.observe(card);

    });

}


/* =========================================================
   HOME VISUAL PARALLAX
========================================================= */

const homeVisual =
    document.getElementById(
        "homeVisual"
    );


if (
    homeVisual &&
    window.matchMedia("(pointer: fine)").matches
) {

    homeVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                homeVisual.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            const moveX =
                x * 14;

            const moveY =
                y * 14;


            homeVisual.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;

        }
    );


    homeVisual.addEventListener(
        "mouseleave",
        () => {

            homeVisual.style.transform =
                "translate3d(0, 0, 0)";

        }
    );

}


/* =========================================================
   ABOUT IMAGE TILT
========================================================= */

const aboutImage =
    document.querySelector(
        ".about-image-wrapper"
    );


if (
    aboutImage &&
    window.matchMedia("(pointer: fine)").matches
) {

    aboutImage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                aboutImage.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            const rotateX =
                y * -8;

            const rotateY =
                x * 8;


            aboutImage.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    aboutImage.addEventListener(
        "mouseleave",
        () => {

            /* FIXED: template literal used
               for multi-line transform */

            aboutImage.style.transform =
                `perspective(700px)
                 rotateX(0deg)
                 rotateY(0deg)
                 translateY(0)`;

        }
    );

}


/* =========================================================
   ABOUT MODAL
========================================================= */

const aboutModal =
    document.getElementById(
        "aboutModal"
    );


const openAboutModal =
    document.getElementById(
        "openAboutModal"
    );


const closeAboutModal =
    document.getElementById(
        "closeAboutModal"
    );


const closeAboutButton =
    document.getElementById(
        "closeAboutButton"
    );


function openAbout() {

    if (!aboutModal) return;


    aboutModal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeAbout() {

    if (!aboutModal) return;


    aboutModal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


if (openAboutModal) {

    openAboutModal.addEventListener(
        "click",
        openAbout
    );

}


if (closeAboutModal) {

    closeAboutModal.addEventListener(
        "click",
        closeAbout
    );

}


if (closeAboutButton) {

    closeAboutButton.addEventListener(
        "click",
        closeAbout
    );

}


/* =========================================================
   CLOSE ABOUT MODAL ON OUTSIDE CLICK
========================================================= */

if (aboutModal) {

    aboutModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === aboutModal
            ) {

                closeAbout();

            }

        }
    );

}


/* =========================================================
   PROJECT CODE MODAL
========================================================= */

const projectFiles = {

    rashtrapati: {

        title:
            "Rashtrapati Udyan - Source Code",

        files: [

            {
                name:
                    "website project.html",

                path:
                    "./website%20project.html"
            },

            {
                name:
                    "website.css",

                path:
                    "./website.css"
            }

        ]

    },


    calculator: {

        title:
            "Calculator - Source Code",

        files: [

            {
                name:
                    "calculation.html",

                path:
                    "./calculation.html"
            },

            {
                name:
                    "cal.css",

                path:
                    "./cal.css"
            },

            {
                name:
                    "calci.js",

                path:
                    "./calci.js"
            }

        ]

    },


    blog: {

        title:
            "Blog Website - Source Code",

        files: [

            {
                name:
                    "project.html",

                path:
                    "./project.html"
            },

            {
                name:
                    "about.html",

                path:
                    "./about.html"
            },

            {
                name:
                    "contact.html",

                path:
                    "./contact.html"
            }

        ]

    }

};


/* =========================================================
   OPEN PROJECT CODE
========================================================= */

async function openProjectCode(projectName) {

    const modal =
        document.getElementById(
            "codeModal"
        );


    const viewer =
        document.getElementById(
            "codeViewer"
        );


    const modalTitle =
        document.getElementById(
            "codeModalTitle"
        );


    if (
        !modal ||
        !viewer ||
        !modalTitle
    ) {

        return;

    }


    const project =
        projectFiles[projectName];


    if (!project) {

        viewer.textContent =
            "Project files not found.";

        return;

    }


    modalTitle.textContent =
        project.title;


    viewer.textContent =
        "Loading source code...";


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    let completeCode = "";


    for (
        const file
        of project.files
    ) {

        completeCode +=
            "\n\n" +
            "============================================================\n" +
            `FILE: ${file.name}\n` +
            "============================================================\n\n";


        try {

            const response =
                await fetch(
                    file.path
                );


            if (!response.ok) {

                throw new Error(
                    "File not found"
                );

            }


            const code =
                await response.text();


            completeCode +=
                code +
                "\n";

        }

        catch (error) {

            completeCode +=
                "Unable to load this file.\n" +
                "Make sure the file exists in the same folder as your portfolio.\n";

        }

    }


    viewer.textContent =
        completeCode;

}


/* =========================================================
   CLOSE PROJECT CODE
========================================================= */

function closeCode() {

    const modal =
        document.getElementById(
            "codeModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   CLOSE PROJECT MODAL ON OUTSIDE CLICK
========================================================= */

const codeModal =
    document.getElementById(
        "codeModal"
    );


if (codeModal) {

    codeModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === codeModal
            ) {

                closeCode();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeAbout();

        closeCode();

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    "button"
                );


            if (!button) return;


            const originalHTML =
                button.innerHTML;


            button.disabled = true;


            button.innerHTML =
                `
                <i class="fa-solid fa-check"></i>
                <span>Message Sent</span>
                `;


            button.style.background =
                "linear-gradient(90deg, #16a34a, #15803d)";


            setTimeout(() => {

                button.innerHTML =
                    originalHTML;


                button.disabled = false;


                button.style.background =
                    "";


                contactForm.reset();

            }, 2200);

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


function handleBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 400) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   PROJECT CARD IMAGE FALLBACK
========================================================= */

document.querySelectorAll(
    ".project-image img"
).forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";


            if (image.parentElement) {

                image.parentElement.style.background =
                    "linear-gradient(135deg, #111c40, #301064)";

            }

        }
    );

});


/* =========================================================
   PREVENT ACCIDENTAL HORIZONTAL SCROLL
========================================================= */

function checkOverflow() {

    const bodyWidth =
        document.documentElement.scrollWidth;

    const viewportWidth =
        window.innerWidth;


    if (
        bodyWidth >
        viewportWidth + 2
    ) {

        console.warn(
            "Horizontal overflow detected:",
            bodyWidth - viewportWidth,
            "px"
        );

    }

}


window.addEventListener(
    "load",
    checkOverflow
);


window.addEventListener(
    "resize",
    checkOverflow
);


/* =========================================================
   INITIALIZE
========================================================= */

handleNavbarScroll();

updateActiveNav();

handleBackToTop();

checkOverflow();
