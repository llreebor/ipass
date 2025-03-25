function burgerMenu() {
	const menu = document.querySelector("#mobile-menu")
	const burger = document.querySelector("#burger")
	const body = document.querySelector("body")

	burger.addEventListener("click", () => {
		burger.classList.toggle("active")
		menu.classList.toggle("open")
		body.classList.toggle("overflow-hidden")
	})

	menu.addEventListener("click", (e) => {
		if (e.target.classList.contains("mobile-menu")) {
			menu.classList.remove("open")
			burger.classList.remove("active")
			body.classList.remove("overflow-hidden")
		}
	})

	// Вот тут мы ставим брейкпоинт навбара
	window.addEventListener("resize", () => {
		if (window.innerWidth > 991.98) {
			menu.classList.remove("open")
			burger.classList.remove("active")
			body.classList.remove("overflow-hidden")
		}
	})
}
function toggleSubmenu() {
	const submenuTriggers = document.querySelectorAll(".with-submenu")

	submenuTriggers.forEach((trigger) => {
		trigger.addEventListener("click", (e) => {
			if (e.target.classList.contains("submenu-trigger")) {
				trigger.classList.toggle("active")
			}
		})
	})
}
if (document.getElementById("mobile-menu")) {
	burgerMenu()
	toggleSubmenu()
}
