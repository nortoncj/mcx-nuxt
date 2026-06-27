<template>
    <nav class="sidebar">
			<NuxtLink class="nav-link" to="/user" >
				<div class="logo ">
				MCX
			</div>
		</NuxtLink >
			<ul class="nav-menu" v-for="link in links">
				<li class="nav-item">
					<NuxtLink
					
						:to="link.path"
						class="nav-link"
						:class="{ active: route.path === link.path }"
					>
					<Icon class="nav-icon" :name="link.icon" size="16" />
						<!-- <span class="nav-icon" /> -->
						{{link.name}}
					</NuxtLink>
				</li>
				
			</ul>
			
			<button class="nav-item" style="text-decoration:none;" @click="$event => logout()" >
				<div class="logout">
					<Icon class="nav-icon" name="ri:logout-box-line" size="16" />
					logout
			</div>
		</button>
		</nav>
    </template>

	<script setup>
	import { useUserStore } from '~/stores/user'
	const userStore = useUserStore()
	const router = useRouter()
	const route = useRoute()

	const links = ref([
		{ name: 'Dashboard', path: '/admin', icon: 'ri:pass-pending-line' },
		{ name: 'Profile', path: '/user/profile', icon: 'ri:user-fill' },
		{ name: 'Cards', path: '/admin/cards', icon: 'ri:id-card-fill' },
		{ name: 'Subscription', path: '/admin/subscription', icon: 'ri:star-fill' },
		{ name: 'Products', path: '/admin/products', icon: 'ri:box-3-fill' },
		{ name: 'Users', path: '/admin/users', icon: 'ri:user-settings-fill' },
		{ name: 'Analytics', path: '/admin/analytics', icon: 'ri:bar-chart-2-fill' },
		{ name: 'Store', path: '/admin/store', icon: 'ri:shopping-bag-4-fill' },
		{ name: 'Settings', path: '/admin/settings', icon: 'ri:settings-3-fill' },
		{ name: 'Security', path: '/admin/security', icon: 'ri:shield-fill' }
	])
	const logout = async () =>{
		let res = confirm('Are you sure you want to logout?')
		try {
			if(res) {
				await userStore.logout()
				router.push('/login')
				return
			}
		}catch(error) {
			console.log(error)
		}
	}
	</script>

    <style scoped>
@import "~/assets/css/admin/admin.css";


    </style>