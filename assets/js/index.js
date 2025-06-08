document.addEventListener("DOMContentLoaded", () => {
	const menuButton = document.getElementById("menu-btn");
	const mobileNav = document.querySelector(".mobile_nav");

	const cartButton = document.getElementById("cart-btn");
	const cartNav = document.querySelector(".mobile_cart");

	if (menuButton && mobileNav) {
		menuButton.addEventListener("click", (event) => {
			mobileNav.classList.toggle("show");
		});

		document.addEventListener("click", (event) => {
			if (!mobileNav.contains(event.target) && event.target !== menuButton) {
				mobileNav.classList.add("hide");
			}
		});
	}
	else {
		console.warn("Menu button or mobile nav not found!");
	}

	if (cartButton && cartNav) {
		cartButton.addEventListener("click", (event) => {
			cartNav.classList.toggle("show");
			cartNav.classList.toggle("hide");
		});

		document.addEventListener("click", (event) => {
			if (!cartNav.contains(event.target) && event.target !== cartButton) {
				cartNav.classList.add("hide");
			}
		});
	}
	else {
		console.warn("Cart button or cart nav not found!");
	}
});
