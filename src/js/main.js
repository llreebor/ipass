// ===================== Mobile Menu =============================
// Manages mobile menu functionality
function initializeMobileMenu() {
	// DOM elements selection
	const menu = document.querySelector("#mobile-menu")
	const burger = document.querySelector("#burger")
	const body = document.querySelector("body")

	// Constants
	const BREAKPOINT = 991.98 // Desktop breakpoint in pixels

	if (!menu) return

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

	// Handle clicks on all links within topMenu and submenus
	const allMenuLinks = document.querySelectorAll(".mobile-menu-link")

	allMenuLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			// Allow default behavior (navigation) if href is valid
			const href = link.getAttribute("href")
			if (href && href !== "#") {
				menu.classList.remove("open")
				burger.classList.remove("active")
				body.classList.remove("overflow-hidden")
			}
		})
	})
}
initializeMobileMenu()

// ======================= FAQ Page ==============================
// Initialize accordion functionality
function initializeAccordion() {
	// Select the accordion container (assuming items are inside a common parent)
	const accordion = document.querySelector(".accordion")
	const accordionItems = document.querySelectorAll(".accordion-item")

	// Exit if no accordion container or items are found
	if (!accordion || !accordionItems.length) return

	// Set initial state for all accordion items
	accordionItems.forEach((item) => {
		const content = item.querySelector(".accordion-content")
		const trigger = item.querySelector(".accordion-trigger")

		if (!content || !trigger) return

		// Set ARIA attributes for accessibility
		trigger.setAttribute("aria-expanded", item.classList.contains("active"))
		content.setAttribute("aria-hidden", !item.classList.contains("active"))

		// Ensure content has active class if item is active
		if (item.classList.contains("active")) {
			content.classList.add("active")
		}
	})

	// Use event delegation for accordion triggers
	accordion.addEventListener("click", (event) => {
		const trigger = event.target.closest(".accordion-trigger")
		if (!trigger) return // Exit if not a trigger

		const parent = trigger.closest(".accordion-item")
		if (!parent) return // Exit if no parent item

		const content = parent.querySelector(".accordion-content")
		if (!content) return

		// Toggle active state
		const isOpening = !parent.classList.contains("active")
		parent.classList.toggle("active")
		content.classList.toggle("active")

		// Update ARIA attributes
		trigger.setAttribute("aria-expanded", isOpening)
		content.setAttribute("aria-hidden", !isOpening)

		// Optional: Close other items if only one should be open
		/*
  if (isOpening) {
    document.querySelectorAll(".accordion-item").forEach((otherItem) => {
      if (otherItem !== parent && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
        const otherContent = otherItem.querySelector(".accordion-content");
        const otherTrigger = otherItem.querySelector(".accordion-trigger");
        if (otherContent && otherTrigger) {
          otherContent.classList.remove("active");
          otherTrigger.setAttribute("aria-expanded", "false");
          otherContent.setAttribute("aria-hidden", "true");
        }
      }
    });
  }
  */
	})

	// Add keyboard support for accessibility
	accordion.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			const trigger = event.target.closest(".accordion-trigger")
			if (!trigger) return

			event.preventDefault() // Prevent default scrolling for spacebar
			trigger.click() // Simulate click to reuse logic
		}
	})
}
initializeAccordion()

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

// Sliders
if (document.querySelectorAll(".swiper").length) {
	new Swiper(".swiper-smart-access-reader", {
		// Optional parameters
		slidesPerView: 1,
		loop: true,
		autoHeight: true,

		// Navigation arrows
		navigation: {
			nextEl: ".smart-access-reader-next",
			prevEl: ".smart-access-reader-prev",
		},
		breakpoints: {
			1025: {
				autoHeight: false,
			},
		},
	})

	new Swiper(".swiper-mullion-reader", {
		// Optional parameters
		slidesPerView: 1,
		loop: true,
		autoHeight: true,

		// Navigation arrows
		navigation: {
			nextEl: ".mullion-reader-next",
			prevEl: ".mullion-reader-prev",
		},
		breakpoints: {
			1025: {
				autoHeight: false,
			},
		},
	})

	new Swiper(".swiper-keypad-reader", {
		// Optional parameters
		slidesPerView: 1,
		loop: true,
		autoHeight: true,

		// Navigation arrows
		navigation: {
			nextEl: ".keypad-reader-next",
			prevEl: ".keypad-reader-prev",
		},
		breakpoints: {
			1025: {
				autoHeight: false,
			},
		},
	})

	new Swiper(".swiper-dual-reader", {
		// Optional parameters
		slidesPerView: 1,
		loop: true,
		autoHeight: true,

		// Navigation arrows
		navigation: {
			nextEl: ".dual-reader-next",
			prevEl: ".dual-reader-prev",
		},
		breakpoints: {
			1025: {
				autoHeight: false,
			},
		},
	})
}
