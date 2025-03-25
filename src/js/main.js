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

	// Initial check when the function runs
	updateFormVisibility()
}
showHomeForm()
