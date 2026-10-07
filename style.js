// ========================================
// WORKORA - MAIN JAVASCRIPT
// ========================================


// ========================================
// AUTHENTICATION CONFIGURATION
// ========================================

const WORKORA_LOGIN_KEY = "workoraLoggedIn";
const WORKORA_USER_KEY = "workoraUser";


// ========================================
// GET LOGGED-IN USER
// ========================================

function getLoggedInUser() {

    try {

        const loginData =
            localStorage.getItem(
                WORKORA_LOGIN_KEY
            );


        // No login data
        if (!loginData) {

            return null;

        }


        // ========================================
        // TRY TO PARSE LOGIN DATA
        // ========================================

        let parsedLoginData = null;


        try {

            parsedLoginData =
                JSON.parse(loginData);

        } catch (error) {

            parsedLoginData =
                loginData;

        }


        // ========================================
        // CASE 1:
        // workoraLoggedIn contains USER OBJECT
        // ========================================

        if (
            parsedLoginData &&
            typeof parsedLoginData === "object"
        ) {

            return parsedLoginData;

        }


        // ========================================
        // CASE 2:
        // workoraLoggedIn = true
        // ========================================

        if (
            parsedLoginData === true ||
            parsedLoginData === "true"
        ) {

            const savedUser =
                localStorage.getItem(
                    WORKORA_USER_KEY
                );


            if (savedUser) {

                try {

                    const user =
                        JSON.parse(
                            savedUser
                        );


                    if (
                        user &&
                        typeof user === "object"
                    ) {

                        return user;

                    }

                } catch (error) {

                    console.error(
                        "Error reading Workora user:",
                        error
                    );

                }

            }


            // Login exists but user information
            // is not available.
            return {
                name: "User",
                email: ""
            };

        }


        // ========================================
        // INVALID LOGIN DATA
        // ========================================

        return null;


    } catch (error) {

        console.error(
            "Error reading login data:",
            error
        );

        return null;

    }

}


// ========================================
// CHECK LOGIN STATUS
// ========================================

function isUserLoggedIn() {

    return getLoggedInUser() !== null;

}


// ========================================
// LOGOUT USER
// ========================================

function logoutWorkoraUser() {

    localStorage.removeItem(
        WORKORA_LOGIN_KEY
    );

    localStorage.removeItem(
        WORKORA_USER_KEY
    );

    localStorage.removeItem(
        "workoraRememberMe"
    );


    window.location.href =
        "index.html";

}


// ========================================
// UPDATE NAVBAR
// ========================================

function updateWorkoraNavbar() {

    const loggedInUser =
        getLoggedInUser();


    const guestNav =
        document.getElementById(
            "guestNav"
        );


    const userNav =
        document.getElementById(
            "userNav"
        );


    const profileNavName =
        document.getElementById(
            "profileNavName"
        );


    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    // ========================================
    // EXISTING NAVBAR
    // ========================================

    if (
        guestNav &&
        userNav
    ) {

        if (loggedInUser) {

            guestNav.style.display =
                "none";

            userNav.style.display =
                "flex";


            if (profileNavName) {

                profileNavName.textContent =
                    loggedInUser.name ||
                    loggedInUser.email ||
                    "Profile";

            }

        } else {

            guestNav.style.display =
                "flex";

            userNav.style.display =
                "none";

        }

    }


    // ========================================
    // LOGOUT
    // ========================================

    if (logoutBtn) {

        logoutBtn.onclick =
            function (event) {

                event.preventDefault();

                logoutWorkoraUser();

            };

    }


    // ========================================
    // FALLBACK NAVBAR
    // ========================================

    const navActions =
        document.querySelector(
            ".nav-actions"
        );


    if (
        !navActions ||
        (guestNav && userNav)
    ) {

        return;

    }


    let dynamicUserNav =
        document.getElementById(
            "dynamicUserNav"
        );


    // ========================================
    // LOGGED IN USER
    // ========================================

    if (loggedInUser) {

        const loginButton =
            navActions.querySelector(
                'a[href="login.html"]'
            );


        const registerButton =
            navActions.querySelector(
                'a[href="register.html"]'
            );


        if (loginButton) {

            loginButton.style.display =
                "none";

        }


        if (registerButton) {

            registerButton.style.display =
                "none";

        }


        // ========================================
        // CREATE DYNAMIC USER NAV
        // ========================================

        if (!dynamicUserNav) {

            dynamicUserNav =
                document.createElement(
                    "div"
                );


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

                    <span class="profile-avatar">
                        ${getUserInitial(loggedInUser)}
                    </span>

                    <span class="profile-nav-name">
                        ${escapeHTML(
                            loggedInUser.name ||
                            "Profile"
                        )}
                    </span>

                </a>


                <button
                    type="button"
                    id="dynamicLogoutBtn"
                    class="logout-nav-btn"
                >
                    Logout
                </button>

            `;


            navActions.appendChild(
                dynamicUserNav
            );


            const dynamicLogoutBtn =
                document.getElementById(
                    "dynamicLogoutBtn"
                );


            if (dynamicLogoutBtn) {

                dynamicLogoutBtn.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        logoutWorkoraUser();

                    }
                );

            }

        }

    }

    // ========================================
    // LOGGED OUT USER
    // ========================================

    else {

        const loginButton =
            navActions.querySelector(
                'a[href="login.html"]'
            );


        const registerButton =
            navActions.querySelector(
                'a[href="register.html"]'
            );


        if (loginButton) {

            loginButton.style.display =
                "";

        }


        if (registerButton) {

            registerButton.style.display =
                "";

        }


        if (dynamicUserNav) {

            dynamicUserNav.remove();

        }

    }

}


// ========================================
// GET USER INITIAL
// ========================================

function getUserInitial(user) {

    const name =
        user?.name ||
        user?.email ||
        "U";


    return name
        .charAt(0)
        .toUpperCase();

}


// ========================================
// BASIC HTML ESCAPE
// ========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ========================================
// MOBILE MENU
// ========================================

const menuBtn =
    document.querySelector(
        ".menu-btn"
    );


const navLinks =
    document.querySelector(
        ".nav-links"
    );


if (
    menuBtn &&
    navLinks
) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );


            menuBtn.classList.toggle(
                "active"
            );

        }
    );

}


// ========================================
// CLOSE MOBILE MENU
// ========================================

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navigationLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navLinks?.classList.remove(
                    "active"
                );


                menuBtn?.classList.remove(
                    "active"
                );

            }
        );

    }
);


// ========================================
// SMOOTH SCROLL
// ========================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    }

                }
            );

        }
    );


// ========================================
// WORKORA - 15 JOBS
// ========================================

const WORKORA_JOBS = [

    {
        id: "frontend",

        title: "Frontend Developer",

        company: "Google Technologies",

        location: "Delhi",

        type: "Full Time",

        workMode: "Remote",

        salary: "₹6 - 10 LPA",

        experience: "0 - 2 Years",

        logo: "G",

        logoClass: "blue",

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "Git"
        ]
    },


    {
        id: "java",

        title: "Java Developer",

        company: "Microsoft",

        location: "Bangalore",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹8 - 14 LPA",

        experience: "1 - 3 Years",

        logo: "M",

        logoClass: "orange",

        skills: [
            "Java",
            "OOP",
            "SQL",
            "Spring Boot",
            "Git"
        ]
    },


    {
        id: "designer",

        title: "UI/UX Designer",

        company: "Adobe",

        location: "Mumbai",

        type: "Full Time",

        workMode: "Remote",

        salary: "₹5 - 9 LPA",

        experience: "0 - 2 Years",

        logo: "A",

        logoClass: "purple",

        skills: [
            "Figma",
            "UI Design",
            "UX Design",
            "Wireframing",
            "Prototyping"
        ]
    },


    {
        id: "backend",

        title: "Backend Developer",

        company: "Amazon",

        location: "Bangalore",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹7 - 13 LPA",

        experience: "1 - 3 Years",

        logo: "A",

        logoClass: "orange",

        skills: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST API",
            "Git"
        ]
    },


    {
        id: "react",

        title: "React Developer",

        company: "Flipkart",

        location: "Bangalore",

        type: "Full Time",

        workMode: "Remote",

        salary: "₹6 - 12 LPA",

        experience: "1 - 2 Years",

        logo: "F",

        logoClass: "blue",

        skills: [
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "Git"
        ]
    },


    {
        id: "python",

        title: "Python Developer",

        company: "Infosys",

        location: "Pune",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹5 - 10 LPA",

        experience: "0 - 2 Years",

        logo: "I",

        logoClass: "blue",

        skills: [
            "Python",
            "Django",
            "SQL",
            "REST API",
            "Git"
        ]
    },


    {
        id: "fullstack",

        title: "Full Stack Developer",

        company: "TCS",

        location: "Mumbai",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹7 - 14 LPA",

        experience: "1 - 4 Years",

        logo: "T",

        logoClass: "purple",

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js"
        ]
    },


    {
        id: "mobile",

        title: "Android Developer",

        company: "PhonePe",

        location: "Bangalore",

        type: "Full Time",

        workMode: "On-site",

        salary: "₹6 - 11 LPA",

        experience: "1 - 3 Years",

        logo: "P",

        logoClass: "purple",

        skills: [
            "Kotlin",
            "Android",
            "Java",
            "Firebase",
            "Git"
        ]
    },


    {
        id: "data",

        title: "Data Analyst",

        company: "Deloitte",

        location: "Gurgaon",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹5 - 9 LPA",

        experience: "0 - 2 Years",

        logo: "D",

        logoClass: "orange",

        skills: [
            "Excel",
            "SQL",
            "Python",
            "Power BI",
            "Data Analysis"
        ]
    },


    {
        id: "devops",

        title: "DevOps Engineer",

        company: "Wipro",

        location: "Hyderabad",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹7 - 13 LPA",

        experience: "1 - 4 Years",

        logo: "W",

        logoClass: "blue",

        skills: [
            "Docker",
            "AWS",
            "Linux",
            "Jenkins",
            "CI/CD"
        ]
    },


    {
        id: "cybersecurity",

        title: "Cybersecurity Analyst",

        company: "IBM",

        location: "Pune",

        type: "Full Time",

        workMode: "On-site",

        salary: "₹6 - 12 LPA",

        experience: "1 - 3 Years",

        logo: "I",

        logoClass: "purple",

        skills: [
            "Cybersecurity",
            "Network Security",
            "Linux",
            "SIEM",
            "Security"
        ]
    },


    {
        id: "digitalmarketing",

        title: "Digital Marketing Executive",

        company: "HCL Technologies",

        location: "Noida",

        type: "Full Time",

        workMode: "Remote",

        salary: "₹4 - 8 LPA",

        experience: "0 - 2 Years",

        logo: "H",

        logoClass: "orange",

        skills: [
            "SEO",
            "SEM",
            "Social Media",
            "Google Ads",
            "Analytics"
        ]
    },


    {
        id: "productdesigner",

        title: "Product Designer",

        company: "Myntra",

        location: "Bangalore",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹7 - 13 LPA",

        experience: "1 - 3 Years",

        logo: "M",

        logoClass: "purple",

        skills: [
            "Figma",
            "UI Design",
            "UX Research",
            "Prototyping",
            "Design Systems"
        ]
    },


    {
        id: "software",

        title: "Software Engineer",

        company: "Accenture",

        location: "Hyderabad",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹6 - 11 LPA",

        experience: "0 - 3 Years",

        logo: "A",

        logoClass: "blue",

        skills: [
            "Java",
            "Python",
            "SQL",
            "DSA",
            "Git"
        ]
    },


    {
        id: "business",

        title: "Business Analyst",

        company: "EY",

        location: "Gurgaon",

        type: "Full Time",

        workMode: "Hybrid",

        salary: "₹6 - 10 LPA",

        experience: "1 - 3 Years",

        logo: "E",

        logoClass: "orange",

        skills: [
            "Business Analysis",
            "Excel",
            "SQL",
            "Power BI",
            "Communication"
        ]
    }

];


// ========================================
// RENDER JOBS
// ========================================

function renderWorkoraJobs() {

    const jobsGrid =
        document.querySelector(
            ".jobs-grid"
        );


    if (!jobsGrid) {

        return;

    }


    // ========================================
    // DETECT CURRENT PAGE
    // ========================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // ========================================
    // HOME = 6 JOBS
    // JOBS PAGE = ALL 15
    // ========================================

    const isJobsPage =
        currentPage === "jobs.html";


    const jobsToDisplay =
        isJobsPage
            ? WORKORA_JOBS
            : WORKORA_JOBS.slice(0, 6);


    // ========================================
    // CLEAR EXISTING STATIC JOBS
    // ========================================

    jobsGrid.innerHTML =
        "";


    // ========================================
    // RENDER JOB CARDS
    // ========================================

    jobsToDisplay.forEach(
        job => {

            const jobCard =
                document.createElement(
                    "article"
                );


            jobCard.className =
                "job-card";


            jobCard.dataset.jobId =
                job.id;


            jobCard.innerHTML = `

                <div class="job-card-top">

                    <div class="company-logo ${job.logoClass}">
                        ${escapeHTML(job.logo)}
                    </div>


                    <button
                        class="save-btn"
                        type="button"
                        aria-label="Save job"
                        title="Save job"
                    >
                        ♡
                    </button>

                </div>


                <h3>
                    ${escapeHTML(job.title)}
                </h3>


                <p class="company-name">
                    ${escapeHTML(job.company)}
                </p>


                <div class="job-tags">

                    <span>
                        ${escapeHTML(job.type)}
                    </span>

                    <span>
                        ${escapeHTML(job.workMode)}
                    </span>

                </div>


                <div class="job-card-bottom">

                    <div>

                        <strong>
                            ${escapeHTML(job.salary)}
                        </strong>

                        <small>
                            ${escapeHTML(job.location)}
                        </small>

                    </div>


                    <a
                        href="job-details.html?job=${encodeURIComponent(job.id)}"
                    >
                        View →
                    </a>

                </div>

            `;


            jobsGrid.appendChild(
                jobCard
            );

        }
    );

}


// ========================================
// SAVE JOB SYSTEM
// ========================================

const SAVED_JOBS_KEY =
    "workoraSavedJobs";


function normalizeSavedJobs(
    jobs
) {

    if (!Array.isArray(jobs)) {

        return [];

    }


    return [

        ...new Set(

            jobs

                .map(
                    job => {

                        if (
                            typeof job === "string" ||
                            typeof job === "number"
                        ) {

                            return String(
                                job
                            );

                        }


                        if (
                            job &&
                            typeof job === "object" &&
                            job.id !== undefined &&
                            job.id !== null
                        ) {

                            return String(
                                job.id
                            );

                        }


                        return null;

                    }
                )

                .filter(Boolean)

        )

    ];

}


function getSavedJobs() {

    try {

        const savedJobs =
            localStorage.getItem(
                SAVED_JOBS_KEY
            );


        if (!savedJobs) {

            return [];

        }


        const parsedJobs =
            JSON.parse(
                savedJobs
            );


        return normalizeSavedJobs(
            parsedJobs
        );


    } catch (error) {

        console.error(
            "Error loading saved jobs:",
            error
        );


        return [];

    }

}


function setSavedJobs(
    savedJobs
) {

    try {

        const normalizedJobs =
            normalizeSavedJobs(
                savedJobs
            );


        localStorage.setItem(

            SAVED_JOBS_KEY,

            JSON.stringify(
                normalizedJobs
            )

        );


    } catch (error) {

        console.error(
            "Error saving jobs:",
            error
        );

    }

}


function isJobSaved(
    jobId
) {

    return getSavedJobs()
        .includes(
            String(jobId)
        );

}


// ========================================
// UPDATE SAVE BUTTON
// ========================================

function updateSaveButton(
    button,
    isSaved
) {

    if (!button) {

        return;

    }


    if (isSaved) {

        button.textContent =
            "♥";


        button.classList.add(
            "saved"
        );


        button.setAttribute(
            "aria-label",
            "Remove saved job"
        );


        button.setAttribute(
            "title",
            "Remove saved job"
        );


    } else {

        button.textContent =
            "♡";


        button.classList.remove(
            "saved"
        );


        button.setAttribute(
            "aria-label",
            "Save job"
        );


        button.setAttribute(
            "title",
            "Save job"
        );

    }

}


// ========================================
// UPDATE ALL SAVE BUTTONS
// ========================================

function updateAllSaveButtons() {

    const saveButtons =
        document.querySelectorAll(
            ".job-card[data-job-id] .save-btn"
        );


    saveButtons.forEach(
        button => {

            const jobCard =
                button.closest(
                    ".job-card"
                );


            if (!jobCard) {

                return;

            }


            const jobId =
                jobCard.dataset.jobId;


            if (!jobId) {

                return;

            }


            updateSaveButton(

                button,

                isJobSaved(
                    jobId
                )

            );

        }
    );

}


// ========================================
// TOGGLE SAVED JOB
// ========================================

function toggleSavedJob(
    jobId,
    button
) {

    if (!jobId) {

        return;

    }


    const normalizedJobId =
        String(jobId);


    const savedJobs =
        getSavedJobs();


    const jobIndex =
        savedJobs.indexOf(
            normalizedJobId
        );


    if (jobIndex === -1) {

        savedJobs.push(
            normalizedJobId
        );


        setSavedJobs(
            savedJobs
        );


        updateSaveButton(
            button,
            true
        );


        // Toast
        if (window.showWorkoraToast) {

            window.showWorkoraToast(

                "Job has been added to your saved jobs.",

                "success",

                "Job Saved"

            );

        }


    } else {

        savedJobs.splice(
            jobIndex,
            1
        );


        setSavedJobs(
            savedJobs
        );


        updateSaveButton(
            button,
            false
        );


        // Toast
        if (window.showWorkoraToast) {

            window.showWorkoraToast(

                "Job has been removed from your saved jobs.",

                "info",

                "Job Removed"

            );

        }

    }


    window.dispatchEvent(
        new CustomEvent(
            "workoraSavedJobsChanged"
        )
    );

}


// ========================================
// RENDER JOBS FIRST
// ========================================

renderWorkoraJobs();


// ========================================
// ATTACH SAVE BUTTON EVENTS
// ========================================

function attachSaveButtonEvents() {

    const saveButtons =
        document.querySelectorAll(
            ".job-card[data-job-id] .save-btn"
        );


    saveButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const jobCard =
                        button.closest(
                            ".job-card"
                        );


                    if (!jobCard) {

                        return;

                    }


                    const jobId =
                        jobCard.dataset.jobId;


                    toggleSavedJob(
                        jobId,
                        button
                    );

                }
            );

        }
    );

}


// ========================================
// LOAD SAVED STATE
// ========================================

attachSaveButtonEvents();

updateAllSaveButtons();


// ========================================
// JOB SEARCH SYSTEM
// ========================================

const searchBtn =
    document.getElementById(
        "searchBtn"
    );


const jobSearch =
    document.getElementById(
        "jobSearch"
    );


const locationSearch =
    document.getElementById(
        "locationSearch"
    );


// ========================================
// SEARCH JOBS
// ========================================

function searchJobs() {

    if (
        !jobSearch ||
        !locationSearch
    ) {

        return;

    }


    const searchText =
        jobSearch.value
            .trim()
            .toLowerCase();


    const locationText =
        locationSearch.value
            .trim()
            .toLowerCase();


    const jobCards =
        document.querySelectorAll(
            ".job-card[data-job-id]"
        );


    let visibleJobs = 0;


    jobCards.forEach(
        card => {

            const jobTitle =
                card.querySelector(
                    "h3"
                )
                ?.textContent
                .toLowerCase() || "";


            const company =
                card.querySelector(
                    ".company-name"
                )
                ?.textContent
                .toLowerCase() || "";


            const location =
                card.querySelector(
                    ".job-card-bottom small"
                )
                ?.textContent
                .toLowerCase() || "";


            const tags =
                card.querySelector(
                    ".job-tags"
                )
                ?.textContent
                .toLowerCase() || "";


            const jobInformation =
                `${jobTitle} ${company} ${location} ${tags}`;


            const matchesJob =
                searchText === "" ||
                jobInformation.includes(
                    searchText
                );


            const matchesLocation =
                locationText === "" ||
                location.includes(
                    locationText
                );


            if (
                matchesJob &&
                matchesLocation
            ) {

                card.style.display =
                    "";

                visibleJobs++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    showNoResults(
        visibleJobs === 0
    );

}


// ========================================
// NO RESULTS
// ========================================

function showNoResults(
    show
) {

    let noResults =
        document.getElementById(
            "noResults"
        );


    if (show) {

        if (!noResults) {

            noResults =
                document.createElement(
                    "div"
                );


            noResults.id =
                "noResults";


            noResults.innerHTML = `

                <div class="no-results-content">

                    <div class="no-results-icon">
                        🔍
                    </div>


                    <h3>
                        No Jobs Found
                    </h3>


                    <p>
                        We couldn't find any jobs
                        matching your search.
                        Try another keyword
                        or location.
                    </p>


                    <button id="clearSearch">
                        Clear Search
                    </button>

                </div>

            `;


            const jobsGrid =
                document.querySelector(
                    ".jobs-grid"
                );


            if (jobsGrid) {

                jobsGrid.appendChild(
                    noResults
                );

            }


            const clearButton =
                document.getElementById(
                    "clearSearch"
                );


            if (clearButton) {

                clearButton.addEventListener(
                    "click",
                    clearSearch
                );

            }

        }

    } else {

        if (noResults) {

            noResults.remove();

        }

    }

}


// ========================================
// CLEAR SEARCH
// ========================================

function clearSearch() {

    if (jobSearch) {

        jobSearch.value =
            "";

    }


    if (locationSearch) {

        locationSearch.value =
            "";

    }


    searchJobs();


    document
        .querySelector("#jobs")
        ?.scrollIntoView({

            behavior: "smooth"

        });

}


// ========================================
// SEARCH BUTTON
// ========================================

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            searchJobs();


            document
                .querySelector("#jobs")
                ?.scrollIntoView({

                    behavior: "smooth"

                });

        }
    );

}


// ========================================
// ENTER KEY SEARCH
// ========================================

if (jobSearch) {

    jobSearch.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                searchJobs();


                document
                    .querySelector("#jobs")
                    ?.scrollIntoView({

                        behavior: "smooth"

                    });

            }

        }
    );

}


if (locationSearch) {

    locationSearch.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                searchJobs();


                document
                    .querySelector("#jobs")
                    ?.scrollIntoView({

                        behavior: "smooth"

                    });

            }

        }
    );

}


// ========================================
// LIVE SEARCH
// ========================================

if (jobSearch) {

    jobSearch.addEventListener(
        "input",
        () => {

            if (
                jobSearch.value.trim() === ""
            ) {

                searchJobs();

            }

        }
    );

}


if (locationSearch) {

    locationSearch.addEventListener(
        "input",
        () => {

            if (
                locationSearch.value.trim() === ""
            ) {

                searchJobs();

            }

        }
    );

}


// ========================================
// POPULAR SEARCHES
// ========================================

const popularLinks =
    document.querySelectorAll(
        ".popular-searches a"
    );


popularLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const searchValue =
                    link.textContent.trim();


                if (jobSearch) {

                    jobSearch.value =
                        searchValue;

                }


                searchJobs();


                document
                    .querySelector("#jobs")
                    ?.scrollIntoView({

                        behavior: "smooth"

                    });

            }

        );

    }
);


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements =
    document.querySelectorAll(
        ".stat-card, .job-card, .feature-card, .section-heading"
    );


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(
        element => {

            const elementTop =
                element
                    .getBoundingClientRect()
                    .top;


            if (
                elementTop <
                windowHeight - 80
            ) {

                element.classList.add(
                    "show"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar =
    document.querySelector(
        ".navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) {

            return;

        }


        if (
            window.scrollY > 50
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


// ========================================
// CTA BUTTON
// ========================================

const ctaButton =
    document.querySelector(
        ".cta-btn"
    );


if (ctaButton) {

    ctaButton.addEventListener(
        "click",
        () => {

            // Normal link behaviour
            // is preserved.

        }
    );

}


// ========================================
// RUN NAVBAR AUTH SYSTEM
// ========================================

updateWorkoraNavbar();


// ========================================
// WORKORA TOAST NOTIFICATION SYSTEM
// ========================================

(function () {

    function createToastContainer() {

        let container =
            document.querySelector(
                ".workora-toast-container"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );


            container.className =
                "workora-toast-container";


            document.body.appendChild(
                container
            );

        }


        return container;

    }


    window.showWorkoraToast =
        function (
            message,
            type = "success",
            title = ""
        ) {

            const container =
                createToastContainer();


            const toast =
                document.createElement(
                    "div"
                );


            toast.className =
                `workora-toast ${type}`;


            let icon = "✓";


            if (type === "error") {

                icon = "!";

            }


            if (type === "warning") {

                icon = "!";

            }


            if (type === "info") {

                icon = "i";

            }


            if (!title) {

                if (type === "success") {

                    title =
                        "Success";

                }


                if (type === "error") {

                    title =
                        "Something went wrong";

                }


                if (type === "warning") {

                    title =
                        "Warning";

                }


                if (type === "info") {

                    title =
                        "Information";

                }

            }


            toast.innerHTML = `

                <div class="workora-toast-icon">
                    ${icon}
                </div>


                <div class="workora-toast-content">

                    <span class="workora-toast-title">
                        ${escapeHTML(title)}
                    </span>


                    <span class="workora-toast-message">
                        ${escapeHTML(message)}
                    </span>

                </div>


                <button
                    class="workora-toast-close"
                    type="button"
                    aria-label="Close notification"
                >
                    ×
                </button>

            `;


            container.appendChild(
                toast
            );


            const closeButton =
                toast.querySelector(
                    ".workora-toast-close"
                );


            if (closeButton) {

                closeButton.addEventListener(
                    "click",
                    function () {

                        toast.style.animation =
                            "workoraToastOut 0.35s ease forwards";


                        setTimeout(
                            function () {

                                toast.remove();

                            },
                            350
                        );

                    }
                );

            }


            setTimeout(
                function () {

                    if (
                        toast.parentElement
                    ) {

                        toast.remove();

                    }

                },
                3800
            );

        };

})();


// ========================================
// CONSOLE
// ========================================

console.log(
    "🚀 Workora is running successfully!"
);


console.log(
    "❤️ Save Job System is active!"
);


console.log(
    `💼 ${WORKORA_JOBS.length} jobs loaded successfully!`
);


console.log(
    isUserLoggedIn()
        ? "🔐 User is logged in."
        : "👤 User is browsing as guest."
);