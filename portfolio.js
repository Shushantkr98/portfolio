/* ==================================================
   NAVBAR ACTIVE LINK
================================================== */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener("click", function () {

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});

/* ==================================================
   ABOUT ME MODAL
================================================== */

const aboutModal = document.getElementById("aboutModal");
const openAboutModal = document.getElementById("openAboutModal");
const closeAboutModal = document.getElementById("closeAboutModal");
const closeAboutButton = document.getElementById("closeAboutButton");


/* Open Modal */

openAboutModal.addEventListener("click", () => {

    aboutModal.classList.add("active");

    document.body.style.overflow = "hidden";

});


/* Close Modal - Outside Click */

closeAboutModal.addEventListener("click", () => {

    aboutModal.classList.remove("active");

    document.body.style.overflow = "";

});


/* Close Modal - X Button */

closeAboutButton.addEventListener("click", () => {

    aboutModal.classList.remove("active");

    document.body.style.overflow = "";

});


/* Close Modal - Escape Key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        aboutModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

/* ================= HOME SECTION JS ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Typing Cursor */

    const cursor = document.querySelector(".typing-cursor");

    if (cursor) {

        setInterval(() => {
            cursor.style.opacity =
                cursor.style.opacity === "0" ? "1" : "0";
        }, 500);

    }


    /* Stat Counter Animation */

    const stats = document.querySelectorAll(".stat-box h3");

    stats.forEach(stat => {

        const originalText = stat.textContent;
        const number = parseInt(originalText);

        let current = 0;

        const interval = setInterval(() => {

            current++;

            stat.textContent =
                current + originalText.replace(number, "");

            if (current >= number) {
                clearInterval(interval);
                stat.textContent = originalText;
            }

        }, 70);

    });


    /* Mouse Parallax */

    const visual = document.querySelector(".home-visual");

    if (visual) {

        visual.addEventListener("mousemove", (e) => {

            const rect = visual.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) / rect.width - 0.5;

            const y =
                (e.clientY - rect.top) / rect.height - 0.5;

            visual.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;

        });

        visual.addEventListener("mouseleave", () => {

            visual.style.transform = "translate(0, 0)";

        });

    }

});

/* ================= ABOUT SECTION JS ================= */

document.addEventListener("DOMContentLoaded", () => {

    const aboutSection =
        document.querySelector(".about-section");

    const aboutStats =
        document.querySelectorAll(".about-stat h3");


    if (!aboutSection) return;


    /* Scroll Reveal */

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    aboutSection.classList.add("about-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );

    observer.observe(aboutSection);


    /* Statistics Counter */

    aboutStats.forEach(stat => {

        const finalValue = stat.textContent;

        const number =
            parseInt(finalValue.replace(/\D/g, ""));

        const suffix =
            finalValue.replace(/[0-9]/g, "");

        let current = 0;

        const duration = 1200;

        const steps = Math.max(
            number,
            1
        );

        const incrementTime =
            duration / steps;


        const counter = setInterval(() => {

            current++;

            stat.textContent =
                current + suffix;

            if (current >= number) {

                clearInterval(counter);

                stat.textContent =
                    finalValue;
            }

        }, incrementTime);

    });


    /* Image Tilt Effect */

    const imageWrapper =
        document.querySelector(
            ".about-image-wrapper"
        );


    if (imageWrapper) {

        imageWrapper.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    imageWrapper.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - .5) * -8;

                const rotateY =
                    ((x / rect.width) - .5) * 8;

                imageWrapper.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        imageWrapper.addEventListener(
            "mouseleave",
            () => {

                imageWrapper.style.transform =
                    "perspective(700px) rotateX(0) rotateY(0)";

            }
        );

    }

});

/* =========================================================
   SKILLS SECTION ANIMATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const skillsSection =
            document.querySelector(
                ".skills-section"
            );

        const skillsHeading =
            document.querySelector(
                ".skills-heading"
            );

        const skillCards =
            document.querySelectorAll(
                ".skill-card"
            );


        if (!skillsSection) {
            return;
        }


        let animationStarted = false;


        /* =================================================
           INTERSECTION OBSERVER
        ================================================= */

        const skillsObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting &&
                                !animationStarted
                            ) {

                                animationStarted = true;


                                /* Heading */

                                if (
                                    skillsHeading
                                ) {

                                    skillsHeading
                                        .classList
                                        .add(
                                            "active"
                                        );

                                }


                                /* Cards */

                                skillCards.forEach(
                                    (card) => {

                                        card.classList
                                            .add(
                                                "active"
                                            );

                                    }
                                );


                                /* Progress */

                                skillCards.forEach(
                                    (card) => {

                                        const progress =
                                            card.querySelector(
                                                ".skill-progress"
                                            );

                                        const circle =
                                            card.querySelector(
                                                ".progress-circle"
                                            );


                                        if (
                                            !progress ||
                                            !circle
                                        ) {
                                            return;
                                        }


                                        const percentage =
                                            parseInt(
                                                progress
                                                    .dataset
                                                    .percent
                                            );


                                        /* Start at 0 */

                                        circle.style
                                            .setProperty(
                                                "--progress",
                                                "0%"
                                            );


                                        /*
                                         * Wait for card
                                         * reveal animation
                                         */

                                        setTimeout(
                                            () => {

                                                let current =
                                                    0;

                                                const duration =
                                                    1400;

                                                const intervalTime =
                                                    duration /
                                                    percentage;


                                                const timer =
                                                    setInterval(
                                                        () => {

                                                            current++;


                                                            circle.style
                                                                .setProperty(
                                                                    "--progress",
                                                                    current +
                                                                    "%"
                                                                );


                                                            if (
                                                                current >=
                                                                percentage
                                                            ) {

                                                                clearInterval(
                                                                    timer
                                                                );

                                                            }

                                                        },
                                                        intervalTime
                                                    );

                                            },
                                            500
                                        );

                                    }
                                );


                                /*
                                 * Observe only once
                                 */

                                skillsObserver
                                    .unobserve(
                                        skillsSection
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.25
                }
            );


        skillsObserver.observe(
            skillsSection
        );

    }
);

/* =========================================================
   PROJECTS SECTION ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const projectsSection =
        document.querySelector(".projects-section");

    const heading =
        document.querySelector(".projects-heading");

    const cards =
        document.querySelectorAll(".project-card");


    /* =====================================================
       PROJECT ANIMATION
    ===================================================== */

    if (projectsSection) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            if (heading) {

                                heading.classList.add("show");

                            }


                            cards.forEach(function (card) {

                                card.classList.add("show");

                            });


                            observer.unobserve(
                                projectsSection
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        observer.observe(
            projectsSection
        );

    }


    /* =====================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ===================================================== */

    const modal =
        document.getElementById("codeModal");


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeCode();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeCode();

            }

        }
    );

});



/* =========================================================
   PROJECT FILES
========================================================= */

const projectFiles = {

    /* =====================================================
       RASHTRAPATI UDYAN
    ===================================================== */

    rashtrapati: {

        title: "Rashtrapati Udyan - Source Code",

        files: [

            {
                name: "website project.html",
                path: "./website%20project.html"
            },

            {
                name: "website.css",
                path: "./website.css"
            }

        ]

    },


    /* =====================================================
       CALCULATOR
    ===================================================== */

    calculator: {

        title: "Calculator - Source Code",

        files: [

            {
                name: "calculation.html",
                path: "./calculation.html"
            },

            {
                name: "cal.css",
                path: "./cal.css"
            },

            {
                name: "calci.js",
                path: "./calci.js"
            }

        ]

    },

/* =====================================================
   BLOG WEBSITE
===================================================== */

blog: {

    title: "Blog Website - Source Code",

    files: [

        {
            name: "project.html",
            path: "./project.html"
        },

        {
            name: "about.html",
            path: "./about.html"
        },

        {
            name: "contact.html",
            path: "./contact.html"
        }

    ]

}
};



/* =========================================================
   OPEN PROJECT CODE
========================================================= */

async function openProjectCode(
    projectName
) {

    const modal =
        document.getElementById("codeModal");

    const viewer =
        document.getElementById("codeViewer");

    const modalTitle =
        document.getElementById("codeModalTitle");


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


    document.body.style.overflow =
        "hidden";


    try {

        let completeCode = "";


        for (
            const file
            of project.files
        ) {

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
                    "\n\n" +
                    "============================================================\n" +
                    "FILE: " +
                    file.name +
                    "\n" +
                    "============================================================\n\n" +
                    code +
                    "\n";

            }

            catch (error) {

                completeCode +=
                    "\n\n" +
                    "============================================================\n" +
                    "FILE: " +
                    file.name +
                    "\n" +
                    "============================================================\n\n" +
                    "Unable to load this file.\n" +
                    "Make sure the file exists in the same folder as portfolio.html.\n";

            }

        }


        viewer.textContent =
            completeCode;

    }

    catch (error) {

        viewer.textContent =
            "Unable to load source code.";

        console.error(error);

    }

}



/* =========================================================
   CLOSE CODE MODAL
========================================================= */

function closeCode() {

    const modal =
        document.getElementById("codeModal");


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}

/* =========================================================
   EDUCATION SECTION ANIMATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           SELECT EDUCATION ELEMENTS
        ================================================== */

        const educationSection =
            document.querySelector(
                ".education-section"
            );


        const educationHeading =
            document.querySelector(
                ".education-heading"
            );


        const educationItems =
            document.querySelectorAll(
                ".education-item"
            );



        /* =================================================
           CHECK SECTION
        ================================================== */

        if (!educationSection) {

            return;

        }



        /* =================================================
           INTERSECTION OBSERVER
        ================================================== */

        const educationObserver =
            new IntersectionObserver(

                function (entries) {


                    entries.forEach(
                        function (entry) {


                            /* =============================
                               SECTION VISIBLE
                            ============================== */

                            if (
                                entry.isIntersecting
                            ) {


                                /* =============================
                                   HEADING ANIMATION
                                ============================== */

                                if (
                                    educationHeading
                                ) {

                                    educationHeading.classList.add(
                                        "show"
                                    );

                                }



                                /* =============================
                                   EDUCATION ITEMS ANIMATION
                                ============================== */

                                educationItems.forEach(
                                    function (item) {

                                        item.classList.add(
                                            "show"
                                        );

                                    }
                                );



                                /* =============================
                                   STOP OBSERVING
                                ============================== */

                                educationObserver.unobserve(
                                    educationSection
                                );

                            }

                        }
                    );

                },


                {
                    threshold: 0.2
                }

            );



        /* =================================================
           START OBSERVER
        ================================================== */

        educationObserver.observe(
            educationSection
        );



    }
);

/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const button =
                contactForm.querySelector("button");

            const originalText =
                button.innerHTML;

            button.innerHTML =
                '<i class="fa-solid fa-check"></i> Message Sent';

            button.style.background =
                "linear-gradient(90deg, #18a85c, #08743c)";


            setTimeout(function () {

                button.innerHTML =
                    originalText;

                button.style.background =
                    "linear-gradient(90deg, #7628e8, #6530df)";

                contactForm.reset();

            }, 2500);

        }
    );

}
/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.style.opacity = "1";

        backToTop.style.visibility = "visible";

    } else {

        backToTop.style.opacity = "0";

        backToTop.style.visibility = "hidden";

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ================= VIEW ALL PROJECTS =================

const viewAllProjects = document.getElementById("viewAllProjects");
const hiddenProject = document.querySelector(".hidden-project");

if (viewAllProjects && hiddenProject) {

    viewAllProjects.addEventListener("click", function () {

        hiddenProject.classList.add("show-project");

        viewAllProjects.style.display = "none";

    });

}