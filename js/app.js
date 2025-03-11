/**
 * Define Global Variables
 */
const navList = document.getElementById("navbar__list"); // Navigation menu container
const sections = document.querySelectorAll("section"); // List of all sections on the page

/**
 * Helper Function: Creates a new navigation list item for a given section
 * @param {HTMLElement} section - The section element for which the nav item is created
 * @returns {HTMLElement} - The newly created <li> element containing the link
 */
function createList(section) {
  const newList = document.createElement("li");
  newList.innerHTML = `<a href="#${section.getAttribute("id")}" class="menu__link">
    ${section.getAttribute("data-nav")}</a>`;
  return newList;
}

/**
 * Function to dynamically build the navigation menu based on available sections
 * @param {HTMLElement} navList - The <ul> element where nav items will be added
 * @param {NodeList} sections - The list of all sections in the document
 */
function createNav(navList, sections) {
  sections.forEach(section => {
    const secList = createList(section);
    navList.appendChild(secList);
  });
}
createNav(navList, sections); // Call function to generate navigation items

/**
 * Add smooth scrolling behavior to navigation links
 */
const navLinks = document.querySelectorAll(".menu__link");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetSection = document.querySelector(link.getAttribute("href")); // Get target section
    targetSection.scrollIntoView({
      behavior: "smooth" // Enable smooth scrolling
    });
  });
});

/**
 * Function to highlight the active section and corresponding navigation link
 * Uses the Intersection Observer API to detect when a section is in view
 * @param {NodeList} sections - The list of all sections in the document
 * @param {NodeList} navLinks - The list of all navigation links
 */
function activeWhenScroll(sections, navLinks) {
  const options = {
    root: null, // Observes within the viewport
    rootMargin: "0px",
    threshold: 0.63 // 63% of the section must be visible to be considered active
  };

  sections.forEach((section, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add active class when the section is in view
          navLinks[index].classList.add("active");
          section.classList.add("your-active-class");
        } else {
          // Remove active class when section is out of view
          navLinks[index].classList.remove("active");
          section.classList.remove("your-active-class");
        }
      });
    }, options);
    observer.observe(section); // Start observing each section
  });
}
activeWhenScroll(sections, navLinks); // Initialize the observer


