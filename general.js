/* --------------------------------------------------
   Template by espace（https://espace.monbalcon.net/）
   Copyright: 2020 espace.

   利用規約を遵守の上、ご利用ください。
   二次配布、販売は禁止しています。
   --------------------------------------------------*/

let windowSize;
const setWindowSize = () => windowSize = window.innerWidth;
setWindowSize();

const spViewPoint = 1024;
const isSp = () => {
    return spViewPoint >= windowSize;
};

let headerHeight;

let scrollViewPoint;
const setScrollViewPoint = () => {
    scrollViewPoint = isSp() ? window.innerHeight * 0.8 : window.innerWidth * 0.5;
}
setScrollViewPoint();

const existsElement = (element) => {
    return typeof element !== "undefined" && element !== null;
}

//-- ▼ firefoxの:has対応
const headerElement = document.getElementsByTagName("header")[0];
const existsHeader = existsElement(headerElement);
if (existsHeader) {
    document.querySelector("body").classList.add("get-header");
}
//-- ▲ firefoxの:has対応

const isFixMenu = document.querySelector("body").classList.contains("fix-menu");

const smoothScroll = (targetY) => {
    window.scrollTo({
        top: targetY,
        behavior: 'smooth',
    });
}

const getTargetTop = (targetElement) => {
    if (targetElement) {
        const rect = targetElement.getBoundingClientRect().top;
        const offset = window.pageYOffset;
        return rect + offset;
    }
}

const jumpInPage = (trigger) => {
    const href = trigger.getAttribute("href");
    const targetElement = document.getElementById(href.replace('#', ''));
    const targetPosition = getTargetTop(targetElement);
    smoothScroll(targetPosition);
}

const pageTopTrigger = document.getElementById("pageTop");
pageTopTrigger.addEventListener("click", () => smoothScroll(0));

const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
smoothScrollTrigger.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
        e.preventDefault();
        jumpInPage(trigger);
    });
});

const menuElement = document.getElementById("mainMenu");
const existsMenu = existsElement(menuElement);

const scrollMenu = (isScroll = null) => {
    if (isScroll === null) {
        if (window.scrollY >= scrollViewPoint) {
            headerElement.classList.add("scroll");
            menuElement.classList.add("scroll");
        } else {
            headerElement.classList.remove("scroll");
            menuElement.classList.remove("scroll");
        }
    } else {
        if (isScroll) {
            headerElement.classList.add("scroll");
            menuElement.classList.add("scroll");
        } else {
            headerElement.classList.remove("scroll");
            menuElement.classList.remove("scroll");
        }
    }
};

if (existsMenu) {
    isFixMenu ? scrollMenu(true) : scrollMenu();

    window.addEventListener("scroll", () => !isFixMenu && scrollMenu());

    window.addEventListener("resize", () => {
        !isFixMenu && scrollMenu();
        setWindowSize();
    });
}