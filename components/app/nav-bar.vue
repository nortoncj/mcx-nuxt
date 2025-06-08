<template>
	<div class="navigation-section">
		<nav class="top_nav">
			<NuxtLink
				class="nav-link"
				:to="{ name: 'index' }"
			>
				<div class="nav-title">MCX MMXXV</div>
			</NuxtLink>

			<ul class="nav-left">
				<a href=""><li class="nav-link">contact</li></a>
			</ul>

			<ul class="nav-center">
				<NuxtLink :to="{ name: 'index' }">
					<li class="nav-logo">MCX</li>
				</NuxtLink>
			</ul>

			<ul class="nav-right">
				<NuxtLink :to="{ name: 'admin' }">
					<li class="nav-link">home</li>
				</NuxtLink>
				<NuxtLink :to="{ name: 'products' }">
					<li class="nav-link">products</li>
				</NuxtLink>
				<NuxtLink :to="{ name: 'login' }">
					<li class="nav-link">vault</li>
				</NuxtLink>
			</ul>

			<div class="end-nav">
				<button
					id="menu-btn"
					ref="menuButton"
					class="mobile--menu-btn"
					aria-label="Toggle menu"
					@click="toggleMobileNav"
				>
					<img
						src="~/assets/icons/bars.svg"
						alt="menu"
						class="mobile-icon"
					>
				</button>

				<button
					id="cart-btn"
					ref="cartButton"
					class="mobile-cart-btn"
					aria-label="Toggle cart"
					@click="toggleCart"
				>
					<img
						src="~/assets/icons/bag-shopping.svg"
						alt="cart"
						class="nav-link cart-button"
					>
				</button>
			</div>
		</nav>

		<!-- Mobile Overlay -->
		<Transition name="fade">
			<div
				v-show="isMobileNavOpen"
				class="mobile-overlay"
				@click="closeMobileNav"
			/>
		</Transition>

		<!-- Mobile Navigation -->
		<nav
			ref="mobileNav"
			class="mobile_nav"
			:class="{ active: isMobileNavOpen }"
		>
			<div class="top-section">
				<img
					style="width:200px; height:200px"
					src="~/assets/images/brands/logo.svg"
					alt="MCX Logo"
					class="logo"
				>
			</div>

			<div class="bottom-section">
				<ul>
					<li>
						<NuxtLink
							:to="{ name: 'index' }"
							class="nav-link"
							@click="closeMobileNav"
						>
							home
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							:to="{ name: 'products' }"
							class="nav-link"
							@click="closeMobileNav"
						>
							products
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							:to="{ name: 'login' }"
							class="nav-link"
							@click="closeMobileNav"
						>
							login
						</NuxtLink>
					</li>
				</ul>
			</div>
		</nav>

		<!-- Mobile Cart -->
		<aside
			ref="cartNav"
			:class="{ active: isCartOpen }"
			class="mobile_cart"
		>
			<div class="cart-top">
				<h1 class="cart-title">
					Your Cart
				</h1>
				<button
					class="close-btn"
					aria-label="Close cart"
					@click="closeCart"
				>
					✕
				</button>
			</div>

			<div class="cart-items-card">
				<div class="item-card">
					<img
						class="card-item"
						src="~/assets/images/demo-card2.png"
						alt="MCX Card"
					>
					<div class="item-info">
						<div class="item-left">
							<div class="item-name">
								MCX Card
							</div>
							<div class="item-quantity">
								<button class="qty">
									+
								</button>
								<span>1</span>
								<button class="qty">
									-
								</button>
							</div>
						</div>
						<div class="item-right">
							<div class="item-price">
								$49
							</div>
						</div>
					</div>
				</div>

				<div class="cart-end">
					<div class="total">
						<p>Total</p>
						<p>$49</p>
					</div>
					<button
						class="checkout"
						@click="closeCart"
					>
						Checkout
					</button>
				</div>
			</div>
		</aside>

		<!-- Cart Overlay -->
		<Transition name="fade">
			<div
				v-show="isCartOpen"
				class="mobile-overlay"
				@click="closeCart"
			/>
		</Transition>
	</div>
</template>

<script setup>
// Use the mobile navigation composable
const {
	menuButton,
	mobileNav,
	cartButton,
	cartNav,
	isMobileNavOpen,
	isCartOpen,
	toggleMobileNav,
	closeMobileNav,
	toggleCart,
	closeCart,
} = useMobileNavigation();

// Close menus on route change
const route = useRoute();
watch(() => route.path, () => {
	closeMobileNav();
	closeCart();
});
</script>

<style scoped>
@import "~/assets/css/styles.css";

/* Mobile Navigation */
.mobile_nav {
  position: fixed;
  top: 0;
  left: -100%;
  width: 400px;
  height: 100vh;
  background: white;
  transition: left 0.3s ease;
  z-index: 1001;
  box-shadow: 2px 0 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.mobile_nav.active {
  left: 0;
}

.top-section {
  padding: 0rem;
  text-align: center;
  border-bottom: 1px solid #eee;
  width:400px;
}

.bottom-section {
  flex: 1;
  padding: 2rem 0;
  width:400px;
}

.bottom-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width:100%;
}

.bottom-section li {
  border-bottom: 1px solid #f0f0f0;
}

.bottom-section .nav-link {
  display: block;
  padding: 1.5rem 2rem;
  text-decoration: none;
  /* color: #333; */
  font-size: 1.1rem;
  transition: all 0.2s;
}

.bottom-section .nav-link:hover,
.bottom-section .nav-link.router-link-active {
  /* background: #f8f9fa; */
  color: #c4a100;
  padding-left: 2.5rem;
}

/* Mobile Cart */
.mobile_cart {
  position: fixed;
  top: 0;
  right: -100%;
  width: 320px;
  height: 100vh;
  background: #121212;
  transition: right 0.3s ease;
  z-index: 1001;
  box-shadow: -2px 0 20px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.mobile_cart.active {
  right: 0;
}

.cart-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin: 0 0 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-title {
  margin: 0;
  font-size: 1.5rem;
  /* color: #333; */
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
}

.cart-items-card {
  padding: 1rem;
}

.item-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.card-item {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-weight: 400;
  margin-bottom: 0.5rem;

}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty {
  background: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color:black;
}

.item-price {
  font-size: 1.2rem;
  color: #c4a100;
}

.cart-end {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.checkout {
  width: 100%;
  background: #c4a100;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.checkout:hover {
  background: #a08800;
}

/* Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-left,
  .nav-right {
    display: none;
  }

  .end-nav {
    display: flex;
  }

  .nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .mobile_nav {
    width: 100vw;
  }

  .mobile_cart {
    width: 100vw;
  }
}
</style>
