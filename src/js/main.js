// ===================== Mobile Menu =============================
// Manages mobile menu functionality
function initializeMobileMenu() {
  // DOM elements selection
  const menu = document.querySelector("#mobile-menu")
  const burger = document.querySelector("#burger")
  const body = document.querySelector("body")

  // Constants
  const BREAKPOINT = 991.98 // Desktop breakpoint in pixels

  // Toggles mobile menu state
  const toggleMenu = () => {
    burger.classList.toggle("active")
    menu.classList.toggle("open")
    body.classList.toggle("overflow-hidden")
  }

  // Closes mobile menu and resets states
  const closeMenu = () => {
    burger.classList.remove("active")
    menu.classList.remove("open")
    body.classList.remove("overflow-hidden")
  }

  // Burger button click handler
  burger.addEventListener("click", toggleMenu)

  // Close menu when clicking on the menu itself (background)
  menu.addEventListener("click", (event) => {
    if (event.target.classList.contains("mobile-menu")) {
      closeMenu()
    }
  })

  // Handle window resize to close menu on desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > BREAKPOINT) {
      closeMenu()
    }
  })
}
// Manages submenu toggle functionality
function initializeSubmenus() {
  const submenuTriggers = document.querySelectorAll(".with-submenu")

  // Toggle submenu visibility
  const toggleSubmenu = (trigger) => {
    trigger.classList.toggle("active")
  }

  // Add click handlers to all submenu triggers
  submenuTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (event.target.classList.contains("submenu-trigger")) {
        toggleSubmenu(trigger)
      }
    })
  })
}
// Initialize features only if mobile menu exists
function initializeMobileFeatures() {
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenu) {
    initializeMobileMenu()
    initializeSubmenus()
  }
}
// Execute initialization
initializeMobileFeatures()

// ====================== Home Page ==============================
// Home Page Form Visibility
function showHomeForm() {
  const inputs = document.querySelectorAll(".show-form-checkbox")
  const form = document.getElementById("contact-form")

  function updateFormVisibility() {
    // Check if at least one checkbox is checked
    const isAnyChecked = Array.from(inputs).some((input) => input.checked)

    if (isAnyChecked) {
      form.classList.add("flex")
      form.classList.remove("hidden")
    } else {
      form.classList.add("hidden")
      form.classList.remove("flex")
    }
  }

  // Add event listener to each checkbox
  inputs.forEach((input) => {
    input.addEventListener("input", updateFormVisibility)
  })

  if (form) {
    // Initial check when the function runs
    updateFormVisibility()
  }
}
showHomeForm()

// ============= Multi-Technology Access Readers =================
//Tabs
function toggleTabs() {
  // Get all elements with class 'tabs'
  const allTabs = document.querySelectorAll(".tabs")

  // Loop through each tabs container
  allTabs.forEach((tabs) => {
    // Get all the tabs triggers and contents within this specific tabs container
    const tabsTriggers = tabs.querySelectorAll(".tab-trigger")
    const tabsContents = tabs.querySelectorAll(".tab-content")

    // Add a click event listener to each tabs trigger within this container
    tabsTriggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => {
        // Remove the "active" class from all tabs triggers in this container
        tabsTriggers.forEach((trigger) => trigger.classList.remove("active"))
        // Add the "active" class to the clicked tabs trigger
        trigger.classList.add("active")

        // Hide all tabs contents in this container
        tabsContents.forEach((content) => content.classList.add("hidden"))
        // Show the corresponding tabs content
        tabsContents[index].classList.remove("hidden")
      })
    })
  })
}
toggleTabs()
