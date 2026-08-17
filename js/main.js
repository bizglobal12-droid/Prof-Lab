/* ==========================================================================
   PROFESSOR LIBRARY - MAIN INTERACTION SCRIPT
   File: js/main.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollSpy();
    initSmoothScroll();
});

/**
 * Automatically updates active state in the sidebar as the user scrolls
 */
function initScrollSpy() {
    const sidebarLinks = document.querySelectorAll(".module-nav a");
    const sections = document.querySelectorAll(".lecture-section, section[id]");

    if (sidebarLinks.length === 0 || sections.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Trigger when section enters top/middle reading zone
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute("id");
                
                sidebarLinks.forEach((link) => {
                    const parentLi = link.parentElement;
                    if (link.getAttribute("href") === `#${activeId}`) {
                        parentLi.classList.add("active");
                    } else {
                        parentLi.classList.remove("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
}

/**
 * Handles smooth scrolling for internal anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update URL fragment without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}
