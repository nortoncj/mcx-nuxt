<template>
	<div class="main-content">
		<header class="header">
			<div class="profile-header">
				<img
					:src="currentUser.avatar"
					:alt="currentUser.name"
					class="profile-avatar"
					@click="handleAvatarUpload"
				>
				<div class="profile-info">
					<h1>{{ currentUser.name }}</h1>
					<p class="profile-subtitle">
						{{ currentUser.title }} | {{ currentUser.department }}
					</p>
				</div>
			</div>
		</header>

		<div class="content-grid">
			<div class="card">
				<h2 class="card-title">
					Profile Customization
				</h2>
				<div class="profile-customization">
					<div
						class="avatar-upload"
						@click="handleAvatarUpload"
					>
						<img
							:src="avatarPreview"
							alt="Avatar"
							class="avatar-preview"
							@dragover.prevent="handleDragOver"
							@dragleave="handleDragLeave"
							@drop.prevent="handleDrop"
						>
						<div class="upload-overlay">
							Upload New
						</div>
					</div>
					<div class="profile-fields">
						<div class="field-group">
							<div class="form-field">
								<label class="form-label">Name</label>
								<input
									v-model="currentUser.name"
									type="text"
									class="form-input"
									@input="validateField($event, 'name')"
									@focus="handleFieldFocus"
									@blur="handleFieldBlur('name')"
								>
								<div
									v-if="fieldErrors.name"
									class="error-message"
								>
									{{ fieldErrors.name }}
								</div>
							</div>
							<div class="form-field">
								<label class="form-label">Title</label>
								<input
									v-model="currentUser.title"
									type="text"
									class="form-input"
									@input="validateField($event, 'title')"
									@focus="handleFieldFocus"
									@blur="handleFieldBlur('title')"
								>
								<div
									v-if="fieldErrors.title"
									class="error-message"
								>
									{{ fieldErrors.title }}
								</div>
							</div>
						</div>
						<div class="form-field">
							<label class="form-label">Department</label>
							<input
								v-model="currentUser.department"
								type="text"
								class="form-input"
								@input="validateField($event, 'department')"
								@focus="handleFieldFocus"
								@blur="handleFieldBlur('department')"
							>
							<div
								v-if="fieldErrors.department"
								class="error-message"
							>
								{{ fieldErrors.department }}
							</div>
						</div>
						<div class="action-buttons">
							<button
								class="btn btn-primary"
								@click="openBrandingManager"
							>
								Manage Branding
							</button>
							<a
								href="#"
								class="btn btn-secondary"
								@click.prevent="openPortfolio"
							>
								Portfolio →
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<h2 class="card-title">
					Subscription
				</h2>
				<div class="subscription-info">
					<div class="subscription-tier">
						{{ currentUser.subscription.tier }}
					</div>
					<span class="member-badge">{{ currentUser.subscription.status }}</span>
					<p class="renewal-date">
						Renews on {{ currentUser.subscription.renewalDate }}
					</p>
					<button
						class="btn btn-primary"
						@click="handleSubscriptionUpgrade"
					>
						Upgrade Plan
					</button>
				</div>
				<div style="margin-top: 2rem;">
					<div
						class="billing-item"
						@click="openBillingHistory"
					>
						<span>Billing & History</span>
						<span class="arrow-right">→</span>
					</div>
				</div>
			</div>

			<div class="card">
				<h2 class="card-title">
					NFC Card Stats
				</h2>
				<div class="nfc-stats">
					<div
						class="nfc-card-preview"
						@click="simulateNFCTap"
					>
						<div class="nfc-logo">
							MCX
						</div>
					</div>
					<div class="stats-info">
						<div class="stat-label">
							Total Taps
						</div>
						<div
							ref="statValue"
							class="stat-value"
						>
							{{ currentUser.nfcStats.totalTaps.toLocaleString() }}
						</div>
						<a
							href="#"
							class="view-details"
							@click.prevent="openNFCDetails"
						>
							View Details
							<span class="arrow-right">→</span>
						</a>
					</div>
				</div>
			</div>

			<div class="card">
				<h2 class="card-title">
					Add-ons
				</h2>
				<ul class="addons-list">
					<li
						v-for="(addon, index) in addons"
						:key="index"
						class="addon-item"
						:class="{ enabled: addon.enabled, disabled: !addon.enabled }"
						@click="toggleAddon(index)"
					>
						{{ addon.name }}
						<span class="addon-status">{{ addon.enabled ? '✓' : '○' }}</span>
					</li>
				</ul>
				<button
					class="btn btn-primary"
					@click="openStore"
				>
					Visit Store
				</button>
			</div>
		</div>

		<!-- Notification Container -->
		<div class="notification-container">
			<Transition
				v-for="notification in notifications"
				:key="notification.id"
				name="notification"
			>
				<div
					v-show="notification.visible"
					:class="['notification', `notification-${notification.type}`]"
				>
					{{ notification.message }}
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from "vue";

definePageMeta({
	layout: "admin",
});

// Reactive data
const currentUser = reactive({
	name: "David Harrison",
	title: "Senior Associate",
	department: "Corporate Law",
	avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23333'/%3E%3Cstop offset='100%25' stop-color='%23555'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='60' cy='60' r='60' fill='url(%23grad)'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%23888'/%3E%3Cpath d='M30 85 Q60 70 90 85' fill='%23888'/%3E%3C/svg%3E",
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
});

const addons = reactive([
	{ name: "Custom Card Design", enabled: true, price: 29.99 },
	{ name: "Profile Enhancements", enabled: true, price: 19.99 },
	{ name: "Networking Toolkit", enabled: false, price: 39.99 },
]);

const avatarPreview = ref("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23333'/%3E%3Cstop offset='100%25' stop-color='%23555'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='12' fill='url(%23grad2)'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23888'/%3E%3Cpath d='M25 75 Q50 60 75 75' fill='%23888'/%3E%3C/svg%3E");

const isMobileMenuOpen = ref(false);
const fieldErrors = reactive({});
const notifications = ref([]);
const statValue = ref(null);

let notificationId = 0;

// Avatar Upload Methods
const handleAvatarUpload = () => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "image/*";

	input.addEventListener("change", (e) => {
		const file = e.target.files[0];
		if (file) {
			processAvatarFile(file);
		}
	});

	input.click();
};

const handleDragOver = (e) => {
	e.target.style.opacity = "0.7";
	e.target.style.transform = "scale(1.05)";
};

const handleDragLeave = (e) => {
	e.target.style.opacity = "1";
	e.target.style.transform = "scale(1)";
};

const handleDrop = (e) => {
	e.target.style.opacity = "1";
	e.target.style.transform = "scale(1)";

	const files = e.dataTransfer.files;
	if (files.length > 0) {
		processAvatarFile(files[0]);
	}
};

const processAvatarFile = (file) => {
	if (!file.type.startsWith("image/")) {
		showNotification("Please select a valid image file", "error");
		return;
	}

	if (file.size > 5 * 1024 * 1024) {
		showNotification("File size must be less than 5MB", "error");
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		const imageUrl = e.target.result;
		updateAvatar(imageUrl);
	};
	reader.readAsDataURL(file);
};

const updateAvatar = (imageUrl) => {
	currentUser.avatar = imageUrl;
	avatarPreview.value = imageUrl;
	showNotification("Avatar updated successfully!", "success");
};

// Form Validation Methods
const validateField = (event, fieldType) => {
	const value = event.target.value.trim();
	let isValid = true;
	let message = "";

	switch (fieldType) {
		case "name":
			isValid = value.length >= 2;
			message = isValid ? "" : "Name must be at least 2 characters";
			break;
		case "title":
			isValid = value.length >= 2;
			message = isValid ? "" : "Title must be at least 2 characters";
			break;
		case "department":
			isValid = value.length >= 2;
			message = isValid ? "" : "Department must be at least 2 characters";
			break;
	}

	if (isValid) {
		delete fieldErrors[fieldType];
	}
	else {
		fieldErrors[fieldType] = message;
	}

	// Update border color
	if (isValid) {
		event.target.style.borderColor = "rgba(212, 175, 55, 0.3)";
		event.target.style.boxShadow = "none";
	}
	else {
		event.target.style.borderColor = "#ef4444";
		event.target.style.boxShadow = "0 0 0 2px rgba(239, 68, 68, 0.2)";
	}

	return isValid;
};

const handleFieldFocus = (e) => {
	e.target.parentElement.style.transform = "translateY(-2px)";
};

const handleFieldBlur = (fieldType) => {
	// Handle visual blur effect
	event.target.parentElement.style.transform = "translateY(0)";

	// Save the field if validation passes
	if (!fieldErrors[fieldType]) {
		showNotification("Profile updated", "success");
	}
};

// Action Methods
const openBrandingManager = () => {
	showNotification("Opening Branding Manager...", "info");
	console.log("Branding Manager opened");
};

const openPortfolio = () => {
	showNotification("Opening Portfolio...", "info");
	console.log("Portfolio opened");
};

const handleSubscriptionUpgrade = () => {
	showNotification("Redirecting to upgrade options...", "info");
	console.log("Subscription upgrade initiated");
};

const openBillingHistory = () => {
	showNotification("Opening billing history...", "info");
	console.log("Billing history opened");
};

const openNFCDetails = () => {
	showNotification("Opening detailed NFC analytics...", "info");
	console.log("NFC details opened");
};

const openStore = () => {
	showNotification("Opening MCX Store...", "info");
	console.log("Store opened");
};

// NFC Methods
const simulateNFCTap = () => {
	currentUser.nfcStats.totalTaps++;

	// Visual feedback
	const nfcCard = document.querySelector(".nfc-card-preview");

	if (nfcCard) {
		nfcCard.style.transform = "scale(0.95)";
		nfcCard.style.boxShadow = "0 0 20px rgba(212, 175, 55, 0.5)";
	}

	if (statValue.value) {
		statValue.value.style.transform = "scale(1.1)";
		statValue.value.style.color = "#22c55e";
	}

	setTimeout(() => {
		if (nfcCard) {
			nfcCard.style.transform = "scale(1)";
			nfcCard.style.boxShadow = "none";
		}
		if (statValue.value) {
			statValue.value.style.transform = "scale(1)";
			statValue.value.style.color = "#d4af37";
		}
	}, 200);

	showNotification("NFC Tap simulated!", "success");
};

// Add-on Methods
const toggleAddon = (index) => {
	addons[index].enabled = !addons[index].enabled;

	if (addons[index].enabled) {
		showNotification(`${addons[index].name} enabled`, "success");
	}
	else {
		showNotification(`${addons[index].name} disabled`, "info");
	}
};

// Notification System
const showNotification = (message, type = "info") => {
	const id = ++notificationId;
	const notification = {
		id,
		message,
		type,
		visible: true,
	};

	notifications.value.push(notification);

	setTimeout(() => {
		notification.visible = false;
		setTimeout(() => {
			const index = notifications.value.findIndex(n => n.id === id);
			if (index > -1) {
				notifications.value.splice(index, 1);
			}
		}, 300);
	}, 4000);
};

// Keyboard Shortcuts
const handleKeyboard = (e) => {
	if (e.ctrlKey || e.metaKey) {
		switch (e.key) {
			case "s":
				e.preventDefault();
				showNotification("Profile saved successfully!", "success");
				break;
			case "u":
				e.preventDefault();
				handleAvatarUpload();
				break;
			case "r":
				e.preventDefault();
				location.reload();
				break;
		}
	}

	if (e.key === "Escape" && isMobileMenuOpen.value) {
		closeMobileMenu();
	}
};

// Real-time Updates
const startRealTimeUpdates = () => {
	setInterval(() => {
		if (Math.random() > 0.98) {
			currentUser.nfcStats.totalTaps++;

			if (notifications.value.length < 2) {
				showNotification("New NFC tap detected!", "info");
			}
		}
	}, 15000);
};

// Lifecycle Hooks
onMounted(() => {
	document.addEventListener("keydown", handleKeyboard);
	startRealTimeUpdates();
	console.log("MCX Account Dashboard mounted");
});

onBeforeUnmount(() => {
	document.removeEventListener("keydown", handleKeyboard);
});
</script>

<style scoped>
@import "~/assets/css/account/account.css";

/* Additional Vue-specific styles */
.form-field {
  transition: transform 0.3s ease;
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Menu Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Notification Transitions */
.notification-enter-active {
  animation: slideInRight 0.3s ease;
}

.notification-leave-active {
  animation: slideOutRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}

.notification {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  font-weight: 500;
}

.notification-success {
  background: #22c55e;
  color: #ffffff;
}

.notification-error {
  background: #ef4444;
  color: #ffffff;
}

.notification-info {
  background: #d4af37;
  color: #000000;
}

.addon-item.enabled {
  border-left: 4px solid #22c55e;
}

.addon-item.disabled {
  border-left: 4px solid #6b7280;
  opacity: 0.7;
}

.addon-status {
  color: #d4af37;
  font-weight: bold;
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-customization {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .field-group {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .nfc-stats {
    flex-direction: column;
    text-align: center;
  }

  .mobile-menu {
    width: 100vw;
  }
}
</style>
