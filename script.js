/*
 * KCL Printing & Photocopy Shop
 * Commit 3: GSAP Animations and Scroll Effects
 *
 * Features:
 * - Light and dark mode toggle
 * - Mobile navigation menu
 * - GSAP hero intro timeline
 * - Replay intro button
 * - ScrollTrigger section and card reveals
 * - Scroll progress bar
 * - Reduced-motion support
 */

document.addEventListener("DOMContentLoaded", () => {


    const themeToggle = document.getElementById("darkModeToggle");
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");

    const themeIcon = document.getElementById("themeIcon");
    const mobileThemeIcon = document.getElementById("mobileThemeIcon");

    const updateThemeButtons = () => {
        const isDark = document.documentElement.classList.contains("dark");

        const label = isDark ? "Light" : "Dark";
        const ariaLabel = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";

        if (themeIcon) themeIcon.textContent = label;
        if (mobileThemeIcon) mobileThemeIcon.textContent = label;

        themeToggle?.setAttribute("aria-label", ariaLabel);
        mobileThemeToggle?.setAttribute("aria-label", ariaLabel);
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        updateThemeButtons();
    };

    themeToggle?.addEventListener("click", toggleTheme);
    mobileThemeToggle?.addEventListener("click", toggleTheme);

    updateThemeButtons();



    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");

    const closeMobileMenu = () => {
        mobileMenu?.classList.add("hidden");

        menuToggle?.setAttribute("aria-expanded", "false");

        if (menuIcon) {
            menuIcon.textContent = "Menu";
        }
    };

    menuToggle?.addEventListener("click", () => {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            closeMobileMenu();
        } else {
            mobileMenu?.classList.remove("hidden");

            menuToggle.setAttribute("aria-expanded", "true");

            if (menuIcon) {
                menuIcon.textContent = "Close";
            }
        }
    });

    // Close the mobile menu after selecting a navigation link.
    mobileMenu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close the mobile menu when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            // Keep only one FAQ answer open at a time.
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });


    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        // Keep all content visible if GSAP fails to load.
        document.querySelectorAll(".reveal").forEach((element) => {
            element.style.opacity = "1";
            element.style.visibility = "visible";
        });

        const progressBar = document.getElementById("progressBar");

        if (progressBar) {
            progressBar.style.transform = "scaleX(1)";
        }

        return;
    }

    gsap.registerPlugin(ScrollTrigger);



    const heroElements = [
        "#heroLabel",
        "#heroTitle",
        "#heroDescription",
        "#heroButtons",
        "#heroVisual"
    ];

    // Set the starting position of the hero elements.
    gsap.set(heroElements, {
        autoAlpha: 0,
        y: 24
    });

    // Create one timeline for the complete hero introduction.
    const introTimeline = gsap.timeline({
        defaults: {
            duration: 0.55,
            ease: "power2.out"
            // Smoothly eases each element into place.
        }
    });

    introTimeline
        .to("#heroLabel", {
            autoAlpha: 1,
            y: 0
        })

        .to("#heroTitle", {
            autoAlpha: 1,
            y: 0
        }, "-=0.28")

        .to("#heroDescription", {
            autoAlpha: 1,
            y: 0
        }, "-=0.28")

        .to("#heroButtons", {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12
        }, "-=0.22")

        .to("#heroVisual", {
            autoAlpha: 1,
            y: 0
        }, "-=0.28");


    // =========================================
    // REPLAY INTRO BUTTON
    // =========================================

    const replayBtn = document.getElementById("replayBtn");

    replayBtn?.addEventListener("click", () => {
        introTimeline.restart();
    });


    // =========================================
    // SCROLL REVEALS AND REDUCED MOTION
    // =========================================

    const motionSettings = gsap.matchMedia();

    motionSettings.add(
        {
            reduceMotion: "(prefers-reduced-motion: reduce)",
            normalMotion: "(prefers-reduced-motion: no-preference)"
        },

        (context) => {

            const { reduceMotion } = context.conditions;

            // Show all content immediately if reduced motion is preferred.
            if (reduceMotion) {

                gsap.set(".reveal", {
                    clearProps: "all",
                    autoAlpha: 1,
                    y: 0
                });

                gsap.set("#progressBar", {
                    scaleX: 1
                });

                gsap.set(heroElements, {
                    clearProps: "all",
                    autoAlpha: 1,
                    y: 0
                });

                introTimeline.pause(0);

                return;
            }


            // =====================================
            // SECTION REVEAL ANIMATIONS
            // =====================================

            // Give every reveal element its own ScrollTrigger.
            gsap.utils.toArray(".reveal").forEach((element) => {

                gsap.fromTo(
                    element,

                    {
                        autoAlpha: 0,
                        y: 32
                    },

                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        // Gives the reveal a soft, natural finish.

                        scrollTrigger: {
                            trigger: element,
                            start: "top 86%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

            });


            gsap.to("#progressBar", {
                scaleX: 1,
                ease: "none",

                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });

        }
    );

});