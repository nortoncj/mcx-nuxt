/**
 * MCX Profile Management System
 * Handles all interactive functionality for the profile page
 */

class MCXProfile {
	constructor() {
		this.currentUser = {
			name: "David Harrison",
			title: "Senior Associate",
			department: "Corporate Law",
			avatar: null,
			subscription: {
				tier: "Premium",
				status: "MEMBER",
				renewalDate: "May 13, 2024",
				isActive: true,
			},
			nfcStats: {
				totalTaps: 1589,
				lastUpdated: new Date(),
			},
		};

		this.addons = [
			{ name: "Custom Card Design", enabled: true, price: 29.99 },
			{ name: "Profile Enhancements", enabled: true, price: 19.99 },
			{ name: "Networking Toolkit", enabled: false, price: 39.99 },
		];

		this.init();
	}

	init() {
		this.setupEventListeners();
		this.loadUserData();
		this.startRealTimeUpdates();
		this.setupFormValidation();
	}

	setupEventListeners() {
		// Navigation
		this.setupNavigation();

		// Profile customization
		this.setupAvatarUpload();
		this.setupFormHandlers();

		// Subscription management
		this.setupSubscriptionHandlers();

		// NFC card interactions
		this.setupNFCHandlers();

		// Add-ons management
		this.setupAddonHandlers();

		// Mobile menu
		this.setupMobileMenu();

		// Keyboard shortcuts
		this.setupKeyboardShortcuts();
	}

	setupNavigation() {
		const navLinks = document.querySelectorAll(".nav-link");

		navLinks.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				this.setActiveNavItem(link);
				this.handleNavigation(link.textContent.trim());
			});
		});
	}

	setActiveNavItem(activeLink) {
		document.querySelectorAll(".nav-link").forEach((link) => {
			link.classList.remove("active");
		});
		activeLink.classList.add("active");

		// Add navigation animation
		activeLink.style.transform = "translateX(5px)";
		setTimeout(() => {
			activeLink.style.transform = "translateX(0)";
		}, 150);
	}

	handleNavigation(section) {
		console.log(`Navigating to: ${section}`);

		// In a real app, this would handle route changes
		switch (section.toLowerCase()) {
			case "profile":
				this.showSection("profile");
				break;
			case "subscription":
				this.showSection("subscription");
				break;
			case "nfc cards":
				this.showSection("nfc-cards");
				break;
			case "store":
				this.showSection("store");
				break;
			case "security":
				this.showSection("security");
				break;
		}
	}

	showSection(sectionId) {
		// Hide all sections and show selected one
		// This would be more complex in a real SPA
		console.log(`Showing section: ${sectionId}`);
	}

	setupAvatarUpload() {
		const uploadOverlay = document.querySelector(".upload-overlay");
		const avatarPreview = document.querySelector(".avatar-preview");

		if (uploadOverlay) {
			uploadOverlay.addEventListener("click", () => {
				this.handleAvatarUpload();
			});
		}

		// Drag and drop functionality
		if (avatarPreview) {
			avatarPreview.addEventListener("dragover", (e) => {
				e.preventDefault();
				avatarPreview.style.opacity = "0.7";
				avatarPreview.style.transform = "scale(1.05)";
			});

			avatarPreview.addEventListener("dragleave", () => {
				avatarPreview.style.opacity = "1";
				avatarPreview.style.transform = "scale(1)";
			});

			avatarPreview.addEventListener("drop", (e) => {
				e.preventDefault();
				avatarPreview.style.opacity = "1";
				avatarPreview.style.transform = "scale(1)";

				const files = e.dataTransfer.files;
				if (files.length > 0) {
					this.processAvatarFile(files[0]);
				}
			});
		}
	}

	handleAvatarUpload() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";

		input.addEventListener("change", (e) => {
			const file = e.target.files[0];
			if (file) {
				this.processAvatarFile(file);
			}
		});

		input.click();
	}

	processAvatarFile(file) {
		// Validate file
		if (!file.type.startsWith("image/")) {
			this.showNotification("Please select a valid image file", "error");
			return;
		}

		if (file.size > 5 * 1024 * 1024) { // 5MB limit
			this.showNotification("File size must be less than 5MB", "error");
			return;
		}

		// Create file reader
		const reader = new FileReader();
		reader.onload = (e) => {
			const imageUrl = e.target.result;
			this.updateAvatar(imageUrl);
		};
		reader.readAsDataURL(file);
	}

	updateAvatar(imageUrl) {
		const avatarElements = document.querySelectorAll(".avatar-preview, .profile-avatar");

		avatarElements.forEach((element) => {
			element.src = imageUrl;
			// Add update animation
			element.style.transform = "scale(0.9)";
			setTimeout(() => {
				element.style.transform = "scale(1)";
			}, 150);
		});

		this.currentUser.avatar = imageUrl;
		this.showNotification("Avatar updated successfully!", "success");
	}

	setupFormHandlers() {
		const formInputs = document.querySelectorAll(".form-input");

		formInputs.forEach((input) => {
			// Real-time validation
			input.addEventListener("input", (e) => {
				this.validateField(e.target);
			});

			// Save on blur
			input.addEventListener("blur", (e) => {
				this.saveFieldValue(e.target);
			});

			// Enhanced focus animations
			input.addEventListener("focus", (e) => {
				e.target.parentElement.style.transform = "translateY(-2px)";
			});

			input.addEventListener("blur", (e) => {
				e.target.parentElement.style.transform = "translateY(0)";
			});
		});

		// Manage Branding button
		const manageBrandingBtn = document.querySelector(".btn-primary");
		if (manageBrandingBtn && manageBrandingBtn.textContent.includes("Manage Branding")) {
			manageBrandingBtn.addEventListener("click", () => {
				this.openBrandingManager();
			});
		}

		// Portfolio link
		const portfolioLink = document.querySelector(".btn-secondary");
		if (portfolioLink) {
			portfolioLink.addEventListener("click", (e) => {
				e.preventDefault();
				this.openPortfolio();
			});
		}
	}

	validateField(field) {
		const value = field.value.trim();
		let isValid = true;
		let message = "";

		switch (field.previousElementSibling.textContent) {
			case "Name":
				isValid = value.length >= 2;
				message = isValid ? "" : "Name must be at least 2 characters";
				break;
			case "Title":
				isValid = value.length >= 2;
				message = isValid ? "" : "Title must be at least 2 characters";
				break;
			case "Department":
				isValid = value.length >= 2;
				message = isValid ? "" : "Department must be at least 2 characters";
				break;
		}

		this.setFieldValidation(field, isValid, message);
		return isValid;
	}

	setFieldValidation(field, isValid, message) {
		if (isValid) {
			field.style.borderColor = "#333333";
			field.style.boxShadow = "none";
		}
		else {
			field.style.borderColor = "#ef4444";
			field.style.boxShadow = "0 0 0 2px rgba(239, 68, 68, 0.2)";
		}

		// Remove existing error message
		const existingError = field.parentElement.querySelector(".error-message");
		if (existingError) {
			existingError.remove();
		}

		// Add new error message if needed
		if (!isValid && message) {
			const errorElement = document.createElement("div");
			errorElement.className = "error-message";
			errorElement.style.color = "#ef4444";
			errorElement.style.fontSize = "0.8rem";
			errorElement.style.marginTop = "0.25rem";
			errorElement.textContent = message;
			field.parentElement.appendChild(errorElement);
		}
	}

	saveFieldValue(field) {
		if (this.validateField(field)) {
			const fieldName = field.previousElementSibling.textContent.toLowerCase();
			const value = field.value.trim();

			switch (fieldName) {
				case "name":
					this.currentUser.name = value;
					this.updateProfileHeader();
					break;
				case "title":
					this.currentUser.title = value;
					this.updateProfileHeader();
					break;
				case "department":
					this.currentUser.department = value;
					this.updateProfileHeader();
					break;
			}

			this.showNotification("Profile updated", "success");
		}
	}

	updateProfileHeader() {
		const nameElement = document.querySelector(".profile-info h1");
		const subtitleElement = document.querySelector(".profile-subtitle");

		if (nameElement) {
			nameElement.textContent = this.currentUser.name;
		}

		if (subtitleElement) {
			subtitleElement.textContent = `${this.currentUser.title} | ${this.currentUser.department}`;
		}
	}

	openBrandingManager() {
		this.showNotification("Opening Branding Manager...", "info");
		// In a real app, this would open a modal or navigate to branding page
		console.log("Branding Manager opened");
	}

	openPortfolio() {
		this.showNotification("Opening Portfolio...", "info");
		// In a real app, this would navigate to portfolio page
		console.log("Portfolio opened");
	}

	setupSubscriptionHandlers() {
		const upgradeBtn = document.querySelector(".subscription-info .btn-primary");
		const billingItem = document.querySelector(".billing-item");

		if (upgradeBtn) {
			upgradeBtn.addEventListener("click", () => {
				this.handleSubscriptionUpgrade();
			});
		}

		if (billingItem) {
			billingItem.addEventListener("click", () => {
				this.openBillingHistory();
			});
		}
	}

	handleSubscriptionUpgrade() {
		this.showNotification("Redirecting to upgrade options...", "info");
		// In a real app, this would open payment flow
		console.log("Subscription upgrade initiated");
	}

	openBillingHistory() {
		this.showNotification("Opening billing history...", "info");
		// In a real app, this would show billing details
		console.log("Billing history opened");
	}

	setupNFCHandlers() {
		const viewDetailsLink = document.querySelector(".view-details");
		const nfcCard = document.querySelector(".nfc-card-preview");

		if (viewDetailsLink) {
			viewDetailsLink.addEventListener("click", (e) => {
				e.preventDefault();
				this.openNFCDetails();
			});
		}

		if (nfcCard) {
			nfcCard.addEventListener("click", () => {
				this.simulateNFCTap();
			});
		}
	}

	openNFCDetails() {
		this.showNotification("Opening detailed NFC analytics...", "info");
		console.log("NFC details opened");
	}

	simulateNFCTap() {
		// Simulate a new tap
		this.currentUser.nfcStats.totalTaps++;
		this.updateNFCStats();

		// Visual feedback
		const nfcCard = document.querySelector(".nfc-card-preview");
		nfcCard.style.transform = "scale(0.95)";
		nfcCard.style.boxShadow = "0 0 20px rgba(212, 175, 55, 0.5)";

		setTimeout(() => {
			nfcCard.style.transform = "scale(1)";
			nfcCard.style.boxShadow = "none";
		}, 200);

		this.showNotification("NFC Tap simulated!", "success");
	}

	updateNFCStats() {
		const statValue = document.querySelector(".stat-value");
		if (statValue) {
			statValue.textContent = this.currentUser.nfcStats.totalTaps.toLocaleString();
		}
	}

	setupAddonHandlers() {
		const visitStoreBtn = document.querySelector(".card:last-child .btn-primary");

		if (visitStoreBtn) {
			visitStoreBtn.addEventListener("click", () => {
				this.openStore();
			});
		}

		// Make addon items interactive
		const addonItems = document.querySelectorAll(".addon-item");
		addonItems.forEach((item, index) => {
			item.style.cursor = "pointer";
			item.addEventListener("click", () => {
				this.toggleAddon(index);
			});
		});
	}

	toggleAddon(index) {
		if (this.addons[index]) {
			this.addons[index].enabled = !this.addons[index].enabled;
			const item = document.querySelectorAll(".addon-item")[index];

			if (this.addons[index].enabled) {
				item.style.color = "#d4af37";
				this.showNotification(`${this.addons[index].name} enabled`, "success");
			}
			else {
				item.style.color = "#cccccc";
				this.showNotification(`${this.addons[index].name} disabled`, "info");
			}
		}
	}

	openStore() {
		this.showNotification("Opening MCX Store...", "info");
		console.log("Store opened");
	}

	setupMobileMenu() {
		const menuToggle = document.querySelector(".menu-toggle");
		const sidebar = document.querySelector(".sidebar");

		if (menuToggle && sidebar) {
			menuToggle.addEventListener("click", () => {
				sidebar.classList.toggle("mobile-open");
				this.updateMenuToggleIcon(sidebar.classList.contains("mobile-open"));
			});

			// Close menu when clicking outside
			document.addEventListener("click", (e) => {
				if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
					sidebar.classList.remove("mobile-open");
					this.updateMenuToggleIcon(false);
				}
			});
		}
	}

	updateMenuToggleIcon(isOpen) {
		const menuToggle = document.querySelector(".menu-toggle");
		if (menuToggle) {
			menuToggle.textContent = isOpen ? "✕" : "☰";
		}
	}

	setupKeyboardShortcuts() {
		document.addEventListener("keydown", (e) => {
			if (e.ctrlKey || e.metaKey) {
				switch (e.key) {
					case "s":
						e.preventDefault();
						this.saveProfile();
						break;
					case "u":
						e.preventDefault();
						this.handleAvatarUpload();
						break;
					case "r":
						e.preventDefault();
						location.reload();
						break;
				}
			}

			// ESC to close mobile menu
			if (e.key === "Escape") {
				const sidebar = document.querySelector(".sidebar");
				if (sidebar.classList.contains("mobile-open")) {
					sidebar.classList.remove("mobile-open");
					this.updateMenuToggleIcon(false);
				}
			}
		});
	}

	saveProfile() {
		const formData = this.gatherFormData();
		console.log("Saving profile:", formData);
		this.showNotification("Profile saved successfully!", "success");
	}

	gatherFormData() {
		const formInputs = document.querySelectorAll(".form-input");
		const data = {};

		formInputs.forEach((input) => {
			const label = input.previousElementSibling.textContent.toLowerCase();
			data[label] = input.value.trim();
		});

		return data;
	}

	setupFormValidation() {
		// Add CSS for validation styles
		const style = document.createElement("style");
		style.textContent = `
            .form-field {
                transition: transform 0.3s ease;
            }
            .error-message {
                animation: slideDown 0.3s ease;
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
		document.head.appendChild(style);
	}

	loadUserData() {
		// In a real app, this would fetch from API
		console.log("Loading user data:", this.currentUser);
		this.updateNFCStats();
	}

	startRealTimeUpdates() {
		// Simulate real-time NFC tap updates
		setInterval(() => {
			if (Math.random() > 0.95) { // 5% chance per interval
				this.currentUser.nfcStats.totalTaps++;
				this.updateNFCStats();
			}
		}, 10000); // Check every 10 seconds
	}

	showNotification(message, type = "info") {
		// Create notification element
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.textContent = message;

		// Style the notification
		Object.assign(notification.style, {
			position: "fixed",
			top: "20px",
			right: "20px",
			background: type === "success"
				? "#22c55e"
				: type === "error" ? "#ef4444" : "#d4af37",
			color: type === "success" || type === "error" ? "#ffffff" : "#000000",
			padding: "1rem 1.5rem",
			borderRadius: "8px",
			boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
			zIndex: "1000",
			animation: "slideInRight 0.3s ease",
			maxWidth: "300px",
		});

		// Add animation keyframes
		if (!document.querySelector("#notification-styles")) {
			const style = document.createElement("style");
			style.id = "notification-styles";
			style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
			document.head.appendChild(style);
		}

		document.body.appendChild(notification);

		// Auto remove after 3 seconds
		setTimeout(() => {
			notification.style.animation = "slideOutRight 0.3s ease";
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification);
				}
			}, 300);
		}, 3000);
	}
}

// Initialize the profile system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	const profileSystem = new MCXProfile();

	// Make it globally accessible for debugging
	window.MCXProfile = profileSystem;

	console.log("MCX Profile System initialized");
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
	module.exports = MCXProfile;
}
