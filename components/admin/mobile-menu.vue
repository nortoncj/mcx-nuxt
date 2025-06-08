<template>
	<header class="header">
				<h1  class="page-title">
					{{pageTitle()? pageTitle() : 'Overview'}}
					
				</h1>
				
				<button
					class="menu-toggle"
					:class="{ active: isMobileMenuOpen }"
					@click="toggleMobileMenu"
				>
					{{ isMobileMenuOpen ? '✕' : '☰' }}
				</button>
			</header>

			<!-- Mobile Menu Overlay -->
			<Transition name="fade">
				<div
					v-show="isMobileMenuOpen"
					class="mobile-menu-overlay"
					@click="closeMobileMenu"
				/>
			</Transition>

			<!-- Mobile Menu -->
			<Transition name="slide">
				<div
					v-show="isMobileMenuOpen"
					class="mobile-menu"
				>
					<div class="mobile-menu-header">
						<h3>MCX Admin Menu</h3>
						<button
							class="close-btn"
							@click="closeMobileMenu"
						>
							✕
						</button>
					</div>
					<nav class="mobile-menu-nav">
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:user-fill" size="16" />  Profile
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:pass-pending-line" size="16" /> Dashboard
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:user-settings-fill" size="16" /> Users
							
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:id-card-fill" size="16" /> Cards
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:box-3-fill" size="16" /> Products
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:star-fill" size="16" /> Subscription
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:shopping-bag-4-fill" size="16" /> Store
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:bar-chart-2-fill" size="16" /> Analytics
						</a>
						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:settings-3-fill" size="16" /> Settings
						</a>

						<a
							href="#"
							class="mobile-menu-item"
							@click="closeMobileMenu"
						>
						<Icon class="nav-icon" name="ri:shield-fill" size="16" /> Security
						</a>

						<button class="mobile-menu-item" style="text-decoration:none;" @click="$event => logout()" >
							<div class="mobile-menu-logout">
				
				<Icon class="nav-icon" name="ri:logout-box-line" size="16" />
				Logout</div>
		
	</button>
					</nav>
					<div class="mobile-menu-footer">
						
						<div class="user-info">
							<div class="user-avatar">
								👤
							</div>
							<div class="user-details">
								<div class="user-name">
									Admin User
								</div>
								<div class="user-role">
									Administrator
								</div>
							</div>
						</div>
					</div>
				</div>
			</Transition>
    </template>

    <style scoped>
    @import "~/assets/css/admin/admin.css";
/* Mobile Menu Styles */

.menu-toggle:hover {
background: rgba(196, 161, 0, 0.1);
transform: scale(1.05);
}

.menu-toggle.active {
background: #c4a100;
color: #000;
transform: rotate(90deg);
}

.mobile-menu-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
z-index: 999;
}

.mobile-menu {
position: fixed;
top: 0;
right: 0;
width: 300px;
height: 100vh;
background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
border-left: 3px solid #c4a100;
z-index: 1000;
display: flex;
flex-direction: column;
box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
}

.mobile-menu-header {
padding: 2rem;
border-bottom: 1px solid rgba(196, 161, 0, 0.2);
display: flex;
justify-content: space-between;
align-items: center;
}

.mobile-menu-header h3 {
color: #c4a100;
font-size: 1.3rem;
font-weight: 500;
margin: 0;
font-family:"Cinzel";
}

.close-btn {
background: none;
border: none;
color: #c4a100;
font-size: 1.5rem;
cursor: pointer;
padding: 0.5rem;
border-radius: 50%;
transition: all 0.3s ease;
}

.close-btn:hover {
background: rgba(196, 161, 0, 0.1);
transform: rotate(90deg);
}

.mobile-menu-nav {
flex: 1;
padding: 1rem 0;
overflow-y: auto;
}

.mobile-menu-item {
display: flex;
align-items: center;
padding: 1rem 2rem;
color: #ffffff;
text-decoration: none;
transition: all 0.3s ease;
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
font-size: 1.1rem;
}

.mobile-menu-item:hover {
background: rgba(196, 161, 0, 0.1);
color: #c4a100;
padding-left: 2.5rem;
}

.mobile-menu-footer {
padding: 2rem;
border-top: 1px solid rgba(196, 161, 0, 0.2);
}

.mobile-menu-logout {
	padding: 1rem 18.1rem;
	align-items:center;
	align-content:center;
	font-size: 1rem;
	font-weight: 600;
	color: black;
	display:flex;
	
}
.mobile-menu-logout:hover{
	
	color: #f5f5f5;
}

/* Mobile responsive */
@media (min-width: 769px) {
.menu-toggle {
  display: none;
}

.mobile-menu,
.mobile-menu-overlay {
  display: none !important;
}
}

@media (max-width: 768px) {
.mobile-menu {
  width: 100vw;
}

.header {
  padding: 1rem;
}

.page-title {
  font-size: 1.5rem;
}
}
    </style>

    <script setup>
const router = useRouter()
const route = useRoute()
 const pageTitle = () => {
	switch(route.fullPath) {
		case '/admin':
			return 'Admin'
			break;
		case '/admin/products':
			return 'Products'
			break;
		case '/admin/users':
			return 'Users'
			break;
		case '/admin/analytics':
			return 'Analytics'
			break;
		case '/user':
			return 'Account'
			break;
		case '/user/profile':
			return 'Profile'
			break;
		case '/user/cards':
		return 'Cards'
		break;
		case '/user/subscription':
		return 'Subscription'
		break;
		case '/user/store':
		return 'Store'
		break;
		case '/user/settings':
		return 'Settings'
		break;
		case '/user/security':
		return 'Security'
		break;
	}
 }

//  Logout
	const logout = async () =>{
		router.push('/')
	}

// Menu toggle state
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
	console.log("Mobile menu toggled:", isMobileMenuOpen.value);
};

const closeMobileMenu = () => {
	isMobileMenuOpen.value = false;
};
    </script>