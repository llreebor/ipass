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

// ==================== Contact Us Page ===========================
// Initializes clipboard copy functionality for elements with class 'copy-btn'
function copyToClipboard() {
	// Select all buttons with the 'copy-btn' class
	const buttons = document.querySelectorAll(".copy-btn")

	// Exit early if no buttons are found
	if (!buttons.length) {
		console.warn("No copy buttons found on the page")
		return
	}

	// Iterate through each copy button
	buttons.forEach((button) => {
		// Add click event listener to each button
		button.addEventListener("click", async () => {
			// Prevent multiple rapid clicks by disabling the button temporarily
			if (button.disabled) return
			button.disabled = true

			try {
				// Find the closest parent element with class 'copy-card'
				const card = button.closest(".copy-card")
				if (!card) {
					console.error("Copy card not found for button:", button)
					return
				}

				// Get the text element to copy from
				const textElement = card.querySelector(".copy-text")
				if (!textElement) {
					console.error("Copy text element not found in card:", card)
					return
				}

				// Extract and clean the text content
				const text = textElement.textContent.trim()
				if (!text) {
					console.warn("No text content to copy in element:", textElement)
					return
				}

				// Copy text to clipboard using the Clipboard API
				await navigator.clipboard.writeText(text)

				// Show visual feedback by adding tooltip class
				button.classList.add("show-tooltip")

				// Remove tooltip after 1.5 seconds
				setTimeout(() => {
					button.classList.remove("show-tooltip")
					button.disabled = false // Re-enable the button
				}, 1500)
			} catch (error) {
				// Handle any errors during clipboard operation
				console.error("Failed to copy text to clipboard:", error)
				button.disabled = false // Re-enable the button on error
			}
		})
	})
}

// Execute the function when the script loads
copyToClipboard()

// Select
// Initializes a custom dropdown select menu with specified elements
// Parameters:
// - selectId: ID of the custom select container element
// - optionsId: ID of the options container element
// - selectedOptionId: ID of the element displaying the selected option
function initializeCustomSelect(
	selectId,
	optionsId,
	selectedOptionId,
	resultInputId,
) {
	// Retrieve DOM elements by their IDs
	const customSelect = document.getElementById(selectId)
	const selectedOption = document.getElementById(selectedOptionId)
	const customOptions = document.getElementById(optionsId)
	const resultInput = document.getElementById(resultInputId)
	// Get all elements with class 'option' within the options container
	const options = customOptions.getElementsByClassName("option")

	// Exit early if any required element is missing
	if (!customSelect || !options || !selectedOption || !customOptions) {
		console.warn("Required elements for custom select not found")
		return
	}

	// Add click event listener to toggle the options visibility
	customSelect.addEventListener("click", () => {
		// Toggle the 'hidden' class to show/hide the options menu
		customOptions.classList.toggle("hidden")
		// Select the arrow SVG element within the custom select
		const arrow = customSelect.querySelector(".arrow svg")
		// Rotate arrow based on options visibility
		arrow.style.transform = customOptions.classList.contains("hidden")
			? "rotate(0deg)"
			: "rotate(180deg)"
	})

	// Iterate through each option element
	for (let option of options) {
		// Add click event listener to each option
		option.addEventListener("click", () => {
			// Update the displayed selected option text
			selectedOption.innerText = option.innerText
			selectedOption.classList.add("text-white")
			customSelect.classList.add("selected")
			resultInput.value = option.textContent.trim()
			// Hide the options menu
			customOptions.classList.add("hidden")
			// Reset arrow rotation
			const arrow = customSelect.querySelector(".arrow svg")
			arrow.style.transform = "rotate(0deg)"

			customSelect.classList.add("outline", "outline-green-300")
		})
	}

	// Add global click event listener to close the menu when clicking outside
	document.addEventListener("click", (event) => {
		const target = event.target
		// Check if click is outside both select and options containers
		if (!customSelect.contains(target) && !customOptions.contains(target)) {
			// Hide the options menu
			customOptions.classList.add("hidden")
			// Reset arrow rotation
			const arrow = customSelect.querySelector(".arrow svg")
			arrow.style.transform = "rotate(0deg)"
		}
	})
}
if (document.getElementById("area-select")) {
	initializeCustomSelect(
		"area-select",
		"area-options",
		"area-selected-option",
		"interest_area",
	)
}

// File Prewview
function showUploadedFilePreview() {
	const fileInput = document.getElementById("file")
	const fileList = document.getElementById("fileList")

	if (!fileInput || !fileList) return

	fileInput.addEventListener("change", (event) => {
		const files = event.target.files

		;[...files].forEach((file) => {
			const container = document.createElement("div")
			container.className = "relative w-10 group"

			// File name
			const name = document.createElement("p")
			name.className =
				"text-center text-[10px] text-white break-all mt-1 leading-[90%]"
			const dotIndex = file.name.lastIndexOf(".")
			const baseName = file.name.slice(0, dotIndex)
			const extension = file.name.slice(dotIndex)
			name.textContent =
				baseName.length > 6
					? baseName.slice(0, 6) + "..." + extension
					: baseName + extension

			// File preview or icon
			const preview = document.createElement("div")
			preview.className =
				"flex size-10 items-center justify-center rounded-[10px] bg-[#949494] p-1 group-[.uploaded]:bg-[#D9D9D9]"

			preview.innerHTML = `
				<svg
																xmlns="http://www.w3.org/2000/svg"
																width="33"
																height="32"
																viewBox="0 0 33 32"
																fill="none"
															>
																<path
																	class="stroke-[#313131] group-[.uploaded]:stroke-purple-400"
																	d="M16.3484 11.291L11.8531 19.0772C11.5334 19.6517 11.4524 20.3289 11.6276 20.9627C11.8028 21.5964 12.2201 22.1359 12.7895 22.4646C13.359 22.7934 14.0348 22.8851 14.6713 22.7199C15.3077 22.5548 15.8537 22.146 16.1914 21.5818L22.0906 11.3803C22.3775 10.8971 22.5656 10.3617 22.644 9.80528C22.7224 9.24882 22.6896 8.68233 22.5474 8.13864C22.4053 7.59496 22.1566 7.0849 21.8159 6.63803C21.4751 6.19116 21.0491 5.81637 20.5624 5.53539C20.0757 5.25441 19.5381 5.07283 18.9807 5.00117C18.4234 4.92951 17.8573 4.96919 17.3154 5.11793C16.7735 5.26667 16.2665 5.52149 15.8238 5.86763C15.3811 6.21378 15.0115 6.64435 14.7364 7.1344L8.80455 17.4087C8.39909 18.0881 8.13272 18.8413 8.02095 19.6245C7.90917 20.4078 7.95421 21.2054 8.15345 21.9711C8.35268 22.7368 8.70215 23.4552 9.18151 24.0847C9.66088 24.7141 10.2606 25.2419 10.9458 25.6375C11.6309 26.0331 12.3879 26.2885 13.1727 26.389C13.9575 26.4894 14.7544 26.4328 15.5171 26.2225C16.2798 26.0122 16.9931 25.6524 17.6156 25.164C18.238 24.6756 18.7571 24.0683 19.1427 23.3775L24.6859 13.7765"
																	stroke="#313131"
																	stroke-width="1.5"
																	stroke-miterlimit="10"
																	stroke-linecap="round"
																/>
															</svg>
				`
			// Progress bar
			const progressBarWrapper = document.createElement("div")
			progressBarWrapper.className =
				"mx-auto mt-1 h-[3px] w-[25px] overflow-hidden rounded-full bg-[#D9D9D9] transition-opacity duration-300"

			const progressBar = document.createElement("div")
			progressBar.className =
				"h-full rounded-full bg-purple-200 transition-all duration-200 ease-linear"
			progressBar.style.width = "0%"

			progressBarWrapper.appendChild(progressBar)

			// Remove button
			const removeBtn = document.createElement("button")
			removeBtn.className =
				"absolute top-[-5px] right-[-5px] flex size-4 items-center justify-center rounded-full bg-gray-100 hover:bg-purple-300 group/close"
			removeBtn.innerHTML = `
				 <svg
																xmlns="http://www.w3.org/2000/svg"
																width="8"
																height="8"
																viewBox="0 0 8 8"
																fill="none"
															>
																<path class="group-hover/close:stroke-white" d="M7 1L1 7M1 1L7 7" stroke="#402F9E" />
															</svg>
				`
			removeBtn.onclick = () => container.remove()

			// Append everything
			container.appendChild(preview)
			container.appendChild(progressBarWrapper)
			container.appendChild(name)
			container.appendChild(removeBtn)
			fileList.appendChild(container)

			// Simulate loading progress
			let progress = 0
			const interval = setInterval(() => {
				progress += Math.random() * 10
				const value = Math.min(progress, 100)
				progressBar.style.width = `${value}%`

				if (value >= 100) {
					clearInterval(interval)
					progressBarWrapper.classList.add("opacity-0")
					progressBarWrapper.classList.add("hidden")
					container.classList.add("uploaded")
					preview.classList.style.background = "red"
					setTimeout(() => {
						progressBarWrapper.remove()
					}, 400)
				}
			}, 100)
		})

		fileInput.value = ""
	})
}
showUploadedFilePreview()

// Form Validation
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("contacts_form")
	const phoneInput = document.getElementById("phone")
	const submitBtn = form.querySelector('[type="submit"]')
	const requiredInputs = form.querySelectorAll("[required]")
	let formAttempted = false

	// ===== Phone mask =====
	function formatPhone(value) {
		const digits = value.replace(/\D/g, "").substring(0, 10)
		let result = ""

		if (digits.length > 0) result = "(" + digits.substring(0, 3)
		if (digits.length >= 4) result += ") " + digits.substring(3, 6)
		if (digits.length >= 7) result += "-" + digits.substring(6, 10)

		return result
	}

	phoneInput.addEventListener("input", () => {
		const digitsOnly = phoneInput.value.replace(/\D/g, "")
		phoneInput.value = formatPhone(phoneInput.value)

		// Снимаем ошибку, если 10 цифр
		if (digitsOnly.length === 10) {
			phoneInput.classList.remove("invalid")
		}

		if (formAttempted && validateForm()) {
			submitBtn.disabled = false
		}
	})

	// ===== Email validation =====
	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	// ===== Form validation =====
	function validateForm() {
		let isValid = true

		requiredInputs.forEach((input) => {
			const value = input.value.trim()
			const isEmail = input.type === "email"
			const isPhone = input.id === "phone"

			if (isPhone) {
				const digits = value.replace(/\D/g, "")
				if (digits.length !== 10) {
					input.classList.add("invalid")
					isValid = false
				} else {
					input.classList.remove("invalid")
				}
			} else if (isEmail) {
				if (!isValidEmail(value)) {
					input.classList.add("invalid")
					isValid = false
				} else {
					input.classList.remove("invalid")
				}
			} else {
				if (value === "") {
					input.classList.add("invalid")
					isValid = false
				} else {
					input.classList.remove("invalid")
				}
			}
		})

		return isValid
	}

	// ===== Real-time input validation =====
	requiredInputs.forEach((input) => {
		input.addEventListener("input", () => {
			if (input.id === "phone") return // телефон обрабатывается отдельно

			const value = input.value.trim()
			const isEmail = input.type === "email"

			if (isEmail) {
				if (isValidEmail(value)) {
					input.classList.remove("invalid")
				}
			} else {
				if (value !== "") {
					input.classList.remove("invalid")
				}
			}

			if (formAttempted && validateForm()) {
				submitBtn.disabled = false
			}
		})
	})

	// ===== Modal message =====
	function showModal(message) {
		const modal = document.createElement("div")
		modal.textContent = message
		modal.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: white;
			padding: 2rem;
			box-shadow: 0 0 20px rgba(0,0,0,0.2);
			z-index: 1000;
		`
		document.body.appendChild(modal)
		setTimeout(() => modal.remove(), 3000)
	}

	// ===== Submit handler =====
	form.addEventListener("submit", (e) => {
		formAttempted = true

		const isValid = validateForm()

		if (!isValid) {
			e.preventDefault()
			submitBtn.disabled = true
			return
		}

		// Всё хорошо — показать модалку
		setTimeout(() => {
			showModal("Form was successfully submitted.")
		}, 100)
	})
})
