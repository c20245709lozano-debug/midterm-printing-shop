/*
 * KCL Printing & Photocopy Shop
 * Commit 4: Final Refinements
 *
 * Features:
 * - Light and dark mode toggle
 * - Mobile navigation menu
 * - GSAP hero intro timeline
 * - Individually staggered hero buttons
 * - Replay intro button
 * - ScrollTrigger section and card reveals
 * - Scroll progress bar
 * - Reduced-motion support
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // THEME TOGGLE
    // =========================================

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

    // =========================================
    // MOBILE NAVIGATION
    // =========================================

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

    mobileMenu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });

    // =========================================
    // FAQ ACCORDION
    // =========================================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });

    // =========================================
    // GSAP AVAILABILITY CHECK
    // =========================================

    const progressBar = document.getElementById("progressBar");

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        document.querySelectorAll(".reveal").forEach((element) => {
            element.style.opacity = "1";
            element.style.visibility = "visible";
        });

        if (progressBar) {
            progressBar.style.transform = "scaleX(1)";
        }

        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // =========================================
    // HERO ELEMENTS
    // =========================================

    const heroElements = [
        "#heroLabel",
        "#heroTitle",
        "#heroDescription",
        "#heroButtons",
        "#heroVisual"
    ];

    const replayBtn = document.getElementById("replayBtn");

    // =========================================
    // REDUCED-MOTION SUPPORT
    // =========================================

    const motionSettings = gsap.matchMedia();

    motionSettings.add(
        {
            reduceMotion: "(prefers-reduced-motion: reduce)",
            normalMotion: "(prefers-reduced-motion: no-preference)"
        },
        (context) => {
            const { reduceMotion } = context.conditions;

            // Display everything without animation when reduced motion is enabled.
            if (reduceMotion) {
                gsap.set(
                    [...heroElements, ".reveal"],
                    {
                        clearProps: "all",
                        autoAlpha: 1,
                        y: 0
                    }
                );

                gsap.set("#progressBar", {
                    scaleX: 1
                });

                if (replayBtn) {
                    replayBtn.disabled = true;
                    replayBtn.setAttribute(
                        "aria-label",
                        "Introduction animation is disabled because reduced motion is enabled"
                    );
                    replayBtn.classList.add("opacity-50", "cursor-not-allowed");
                }

                return;
            }

            // =====================================
            // HERO INTRO TIMELINE
            // =====================================

            gsap.set(heroElements, {
                autoAlpha: 0,
                y: 24
            });

            const introTimeline = gsap.timeline({
                defaults: {
                    duration: 0.5,
                    ease: "power2.out"
                    // Smoothly eases each hero element into place.
                }
            });

            introTimeline
                .to("#heroLabel", {
                    autoAlpha: 1,
                    y: 0
                })
                .to(
                    "#heroTitle",
                    {
                        autoAlpha: 1,
                        y: 0
                    },
                    "-=0.25"
                )
                .to(
                    "#heroDescription",
                    {
                        autoAlpha: 1,
                        y: 0
                    },
                    "-=0.25"
                )
                .to(
                    "#heroButtons",
                    {
                        autoAlpha: 1,
                        y: 0
                    },
                    "-=0.2"
                )
                .to(
                    "#heroButtons a",
                    {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.12
                    },
                    "<"
                )
                .to(
                    "#heroVisual",
                    {
                        autoAlpha: 1,
                        y: 0
                    },
                    "-=0.2"
                );

            // Replay the complete hero introduction.
            replayBtn?.addEventListener("click", () => {
                introTimeline.restart();
            });

            // =====================================
            // SCROLL REVEAL ANIMATIONS
            // =====================================

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
                        // Gives each reveal a soft, natural finish.

                        scrollTrigger: {
                            trigger: element,
                            start: "top 86%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // =====================================
            // SCROLL PROGRESS BAR
            // =====================================

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
