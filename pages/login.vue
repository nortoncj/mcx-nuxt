<template>
	<main>
		<div
			ref="starfield"
			class="starfield"
		/>
		<div class="architectural-bg" />

		<div
			class="auth-container"
			:class="{ paddingClass }"
		>
			<div
				class="auth-card "
				:class="{ flipping: isTransitioning }"
			>
				<div class="corner-top-right" />
				<div class="corner-bottom-left" />

				<div class="logo-section">
					<div class="mcx-logo">
						MCX
					</div>
					<div class="roman-numerals">
						MMXXV
					</div>
					<h1
						class="welcome-title"
						v-html="currentTitle"
					/>
					<p class="welcome-subtitle">
						{{ currentSubtitle }}
					</p>
					<div class="divider" />
				</div>

				<div class="form-container">
					<Transition
						name="fade"
						mode="out-in"
					>
						<div
							v-if="!isTransitioning"
							key="form"
						>
							<!-- Messages -->
							<div
								v-if="errorMessage"
								class="message error-message"
							>
								{{ errorMessage }}
							</div>
							<div
								v-if="successMessage"
								class="message success-message"
							>
								{{ successMessage }}
							</div>

							<!-- Login Form -->
							<form
								v-if="isLoginMode"
								class="auth-form"
								@submit.prevent="handleLogin"
							>
								<div class="form-group">
									<input
										v-model="loginForm.email"
										type="email"
										class="form-input"
										placeholder=" "
										required
										autocomplete="email"
										@focus="handleInputFocus"
										@blur="handleInputBlur"
									>
									<label class="form-label">Email</label>
								</div>

								<div class="form-group">
									<input
										v-model="loginForm.password"
										type="password"
										class="form-input"
										placeholder=" "
										required
										autocomplete="current-password"
										@focus="handleInputFocus"
										@blur="handleInputBlur"
									>
									<label class="form-label">Password</label>
								</div>

								<button
									type="submit"
									class="auth-button"
									:disabled="isLoading"
								>
									<span
										v-if="isLoading"
										class="spinner"
									/>
									{{ isLoading ? 'ACCESSING...' : 'UNLOCK YOUR LEGACY' }}
								</button>
							</form>

							<!-- Registration Form -->
							<form
								v-else
								class="auth-form"
								@submit.prevent="handleRegister"
							>
								<div class="form-row">
									<div class="form-group">
										<input
											v-model="registerForm.firstName"
											type="text"
											class="form-input"
											placeholder=" "
											required
											autocomplete="given-name"
											@focus="handleInputFocus"
											@blur="handleInputBlur"
										>
										<label class="form-label">First Name</label>
									</div>

									<div class="form-group">
										<input
											v-model="registerForm.lastName"
											type="text"
											class="form-input"
											placeholder=" "
											required
											autocomplete="family-name"
											@focus="handleInputFocus"
											@blur="handleInputBlur"
										>
										<label class="form-label">Last Name</label>
									</div>
								</div>

								<div class="form-row">
									<div class="form-group">
										<input
											v-model="registerForm.email"
											type="email"
											class="form-input"
											placeholder=" "
											required
											autocomplete="email"
											@focus="handleInputFocus"
											@blur="handleInputBlur"
										>
										<label class="form-label">Email</label>
									</div>

									<div class="form-group">
										<input
											v-model="registerForm.title"
											type="text"
											class="form-input"
											placeholder=" "
											required
											@focus="handleInputFocus"
											@blur="handleInputBlur"
										>
										<label class="form-label">Professional Title</label>
									</div>
								</div>

								<div class="form-group">
									<input
										v-model="registerForm.password"
										type="password"
										class="form-input"
										placeholder=" "
										required
										autocomplete="new-password"
										@focus="handleInputFocus"
										@blur="handleInputBlur"
									>
									<label class="form-label">Create Password</label>
								</div>

								<div class="form-group">
									<input
										v-model="registerForm.confirmPassword"
										type="password"
										class="form-input"
										placeholder=" "
										required
										autocomplete="new-password"
										@focus="handleInputFocus"
										@blur="handleInputBlur"
									>
									<label class="form-label">Confirm Password</label>
								</div>

								<div class="terms-checkbox">
									<input
										id="terms"
										v-model="registerForm.acceptTerms"
										type="checkbox"
										required
									>
									<label for="terms">
										I accept the <a
											href="#"
											@click.prevent="showTerms"
										>Terms of Service</a>
										and <a
											href="#"
											@click.prevent="showPrivacy"
										>Privacy Policy</a>
									</label>
								</div>

								<button
									type="submit"
									class="auth-button"
									:disabled="isLoading"
								>
									<span
										v-if="isLoading"
										class="spinner"
									/>
									{{ isLoading ? 'ESTABLISHING LEGACY...' : 'CLAIM YOUR LEGACY' }}
								</button>
							</form>

							<!-- Footer Links -->
							<div
								v-if="isLoginMode"
								class="forgot-password"
							>
								<a @click="handleForgotPassword">Forgot Password?</a>
							</div>

							<div class="switch-link">
								<span v-if="isLoginMode">New to MCX? </span>
								<span v-else>Already have an Empire? </span>
								<a @click="toggleMode">{{ switchLinkText }}</a>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
definePageMeta({
	layout: "front",
});

// Reactive state
const starfield = ref(null);
const isLoginMode = ref(true);
const isTransitioning = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Form data
const loginForm = ref({
	email: "",
	password: "",
});

const registerForm = ref({
	firstName: "",
	lastName: "",
	email: "",
	title: "",
	password: "",
	confirmPassword: "",
	acceptTerms: false,
});

// Computed properties
const paddingClass = computed(() => {
	return isLoginMode.value
		? ""
		: "paddingClass";
});
const currentTitle = computed(() => {
	return isLoginMode.value
		? "WELCOME TO<br>YOUR EMPIRE"
		: "JOIN THE<br>ELITE";
});

const currentSubtitle = computed(() => {
	return isLoginMode.value
		? "Access Your Legacy"
		: "Establish Your Legacy";
});

const switchLinkText = computed(() => {
	return isLoginMode.value
		? "Claim Your Legacy"
		: "Access Your Empire";
});

// Methods
const createStarfield = () => {
	if (!starfield.value) return;

	const numberOfStars = 100; // More stars for better visibility
	starfield.value.innerHTML = "";

	for (let i = 0; i < numberOfStars; i++) {
		const star = document.createElement("div");
		star.className = "star";

		// Random position
		star.style.left = Math.random() * 100 + "%";
		star.style.top = Math.random() * 100 + "%";

		// Larger, more visible stars (2-6px)
		const size = Math.random() * 4 + 2;
		star.style.width = size + "px";
		star.style.height = size + "px";

		// Random animation delay
		star.style.animationDelay = Math.random() * 3 + "s";

		// Random animation duration for variety
		star.style.animationDuration = (Math.random() * 2 + 2) + "s";

		// Ensure the star has the golden color and glow
		star.style.background = "#C4A100";
		star.style.boxShadow = "0 0 6px #C4A100, 0 0 12px rgba(196, 161, 0, 0.5)";
		star.style.borderRadius = "50%";
		star.style.zIndex = "5"; // Ensure stars are above background
		star.style.position = "absolute";

		starfield.value.appendChild(star);
	}

	// Debug: Log to confirm stars are being created
	console.log(`Created ${numberOfStars} stars in starfield`);
};

const toggleMode = async () => {
	if (isTransitioning.value) return;

	isTransitioning.value = true;
	clearMessages();

	// Wait for transition
	setTimeout(() => {
		isLoginMode.value = !isLoginMode.value;
		resetForms();

		// Complete transition
		setTimeout(() => {
			isTransitioning.value = false;
		}, 300);
	}, 300);
};

const resetForms = () => {
	loginForm.value = { email: "", password: "" };
	registerForm.value = {
		firstName: "",
		lastName: "",
		email: "",
		title: "",
		password: "",
		confirmPassword: "",
		acceptTerms: false,
	};
};

const clearMessages = () => {
	errorMessage.value = "";
	successMessage.value = "";
};

const showError = (message) => {
	errorMessage.value = message;
	successMessage.value = "";
};

const showSuccess = (message) => {
	successMessage.value = message;
	errorMessage.value = "";
};

const validateLogin = () => {
	const { email, password } = loginForm.value;

	if (!email || !password) {
		showError("Please provide your credentials");
		return false;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		showError("Please provide a valid email");
		return false;
	}

	if (password.length < 6) {
		showError("Password must be at least 6 characters");
		return false;
	}

	return true;
};

const validateRegistration = () => {
	const { firstName, lastName, email, title, password, confirmPassword, acceptTerms } = registerForm.value;

	if (!firstName || !lastName || !email || !title || !password || !confirmPassword) {
		showError("Please complete all registration fields");
		return false;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		showError("Please provide a valid email");
		return false;
	}

	if (password.length < 6) {
		showError("Password must be at least 6 characters");
		return false;
	}

	if (password !== confirmPassword) {
		showError("Passwords do not match");
		return false;
	}

	if (!acceptTerms) {
		showError("Please accept the Terms of Service");
		return false;
	}

	return true;
};

const simulateAPI = (data, isLogin = true) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isLogin) {
				// Demo login credentials
				if (data.email === "test@mcx.com" && data.password === "password") {
					resolve({ success: true, user: { name: "Test User", email: data.email } });
				}
				else {
					reject(new Error("Invalid credentials"));
				}
			}
			else {
				// Simulate registration success
				resolve({
					success: true,
					user: {
						name: `${data.firstName} ${data.lastName}`,
						email: data.email,
						title: data.title,
					},
				});
			}
		}, 2000);
	});
};

const handleLogin = async () => {
	if (!validateLogin()) return;

	isLoading.value = true;
	clearMessages();

	try {
		const result = await simulateAPI(loginForm.value, true);
		showSuccess(`Welcome back, ${result.user.name}!`);

		setTimeout(() => {
			console.log("Redirecting to dashboard...");
			// Use Nuxt router: await navigateTo('/dashboard')
		}, 2000);
	}
	catch (error) {
		showError(error.message);
	}
	finally {
		isLoading.value = false;
	}
};

const handleRegister = async () => {
	if (!validateRegistration()) return;

	isLoading.value = true;
	clearMessages();
	const registerInput = ref({
		
	})
	try {
		const result = await simulateAPI(registerForm.value, false);
		showSuccess(`Welcome to MCX, ${result.user.name}! Your legacy begins now.`);

		setTimeout(() => {
			console.log("Redirecting to onboarding...");
			// Use Nuxt router: await navigateTo('/onboarding')
		}, 2000);
	}
	catch (error) {
		showError(error.message);
	}
	finally {
		isLoading.value = false;
	}
};

const handleInputFocus = (e) => {
	const formGroup = e.target.closest(".form-group");
	if (formGroup) {
		formGroup.style.transform = "translateY(-2px)";
	}
	e.target.style.boxShadow = "0 0 15px rgba(196, 161, 0, 0.3)";
};

const handleInputBlur = (e) => {
	const formGroup = e.target.closest(".form-group");
	if (formGroup) {
		formGroup.style.transform = "translateY(0)";
	}
	if (e.target.value.trim() === "") {
		e.target.style.boxShadow = "none";
	}
};

const handleForgotPassword = () => {
	showSuccess("Password recovery instructions sent to your email");
	console.log("Forgot password clicked");
};

const showTerms = () => {
	alert("Terms of Service - Coming Soon");
	console.log("Terms clicked");
};

const showPrivacy = () => {
	alert("Privacy Policy - Coming Soon");
	console.log("Privacy policy clicked");
};

// 🌟 LIFECYCLE - Create starfield and add debugging
onMounted(() => {
	// Debug: Check if starfield element exists
	console.log("Component mounted, starfield element:", starfield.value);

	// Create the starfield when component mounts
	createStarfield();

	// Debug: Check if stars were added
	nextTick(() => {
		console.log("Stars in DOM:", starfield.value?.children.length);
	});
});
</script>

<style scoped>
@import "~/assets/css/login.css";
.paddingClass {
  padding-top: 100px;
}
/* Ensure starfield stars are visible */
.starfield .star {
  background: #C4A100 !important;
  box-shadow: 0 0 6px #C4A100, 0 0 12px rgba(196, 161, 0, 0.5) !important;
  border-radius: 50% !important;
  animation: twinkle 3s infinite ease-in-out !important;
}

/* Debug: Make starfield visible temporarily */
/* .starfield {
  border: 1px solid red !important;
  background: rgba(255, 0, 0, 0.1) !important;
} */
</style>
