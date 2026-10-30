/*
 * KCL Printing & Photocopy Shop
 * Commit 2: Enhanced Website and Interactive Features
 *
 * Features:
 * - Light and dark mode toggle
 * - Mobile navigation menu
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // DARK MODE
    // =========================================

    const themeToggle = document.getElementById("themeToggle");
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");

    const themeIcon = document.getElementById("themeIcon");
    const mobileThemeIcon = document.getElementById("mobileThemeIcon");

    const updateThemeButtons = () => {
        const isDark = document.documentElement.classList.contains("dark");

        const label = isDark ? "Light" : "Dark";
        const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

        if (themeIcon) {
            themeIcon.textContent = label;
        }

        if (mobileThemeIcon) {
            mobileThemeIcon.textContent = label;
        }

        if (themeToggle) {
            themeToggle.setAttribute("aria-label", ariaLabel);
        }

        if (mobileThemeToggle) {
            mobileThemeToggle.setAttribute("aria-label", ariaLabel);
        }
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
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

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

    // Close the menu after selecting a navigation link.
    const mobileLinks = mobileMenu?.querySelectorAll("a");

    mobileLinks?.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close the mobile menu when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
});
