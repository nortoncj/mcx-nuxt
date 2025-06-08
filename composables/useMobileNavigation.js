// composables/useMobileNavigation.js
export const useMobileNavigation = () => {
	// Template refs
	const menuButton = ref(null);
	const mobileNav = ref(null);
	const cartButton = ref(null);
	const cartNav = ref(null);

	// Reactive state
	const isMobileNavOpen = ref(false);
	const isCartOpen = ref(false);

	// Methods
	const toggleMobileNav = () => {
		isMobileNavOpen.value = !isMobileNavOpen.value;
		// Close cart if open
		if (isCartOpen.value) {
			isCartOpen.value = false;
		}
	};

	const closeMobileNav = () => {
		isMobileNavOpen.value = false;
	};

	const toggleCart = () => {
		isCartOpen.value = !isCartOpen.value;
		// Close mobile nav if open
		if (isMobileNavOpen.value) {
			isMobileNavOpen.value = false;
		}
	};

	const closeCart = () => {
		isCartOpen.value = false;
	};

	const handleClickOutside = (event) => {
		// Close mobile nav if clicked outside
		if (mobileNav.value
			&& !mobileNav.value.contains(event.target)
			&& menuButton.value
			&& !menuButton.value.contains(event.target)) {
			closeMobileNav();
		}

		// Close cart if clicked outside
		if (cartNav.value
			&& !cartNav.value.contains(event.target)
			&& cartButton.value
			&& !cartButton.value.contains(event.target)) {
			closeCart();
		}
	};

	// Close menus on escape key
	const handleEscapeKey = (event) => {
		if (event.key === "Escape") {
			closeMobileNav();
			closeCart();
		}
	};

	// Prevent body scroll when menus are open
	const updateBodyScroll = () => {
		if (isMobileNavOpen.value || isCartOpen.value) {
			document.body.style.overflow = "hidden";
		}
		else {
			document.body.style.overflow = "";
		}
	};

	// Watch for state changes to update body scroll
	watch([isMobileNavOpen, isCartOpen], updateBodyScroll);

	// Lifecycle
	onMounted(() => {
		// Add global click listener
		document.addEventListener("click", handleClickOutside);
		// Add escape key listener
		document.addEventListener("keydown", handleEscapeKey);
	});

	onBeforeUnmount(() => {
		// Cleanup event listeners
		document.removeEventListener("click", handleClickOutside);
		document.removeEventListener("keydown", handleEscapeKey);
		// Restore body scroll
		document.body.style.overflow = "";
	});

	return {
		// Template refs
		menuButton,
		mobileNav,
		cartButton,
		cartNav,

		// State
		isMobileNavOpen: readonly(isMobileNavOpen),
		isCartOpen: readonly(isCartOpen),

		// Methods
		toggleMobileNav,
		closeMobileNav,
		toggleCart,
		closeCart,
	};
};
