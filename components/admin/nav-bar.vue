<template>
    <nav class="sidebar">
			<NuxtLink class="nav-link" to="/user" >
				<div class="logo ">
				MCX
			</div>
		</NuxtLink >
			<ul class="nav-menu">
				<li class="nav-item">
					<NuxtLink
					
						to="/admin"
						class="nav-link active"
					>
					<Icon class="nav-icon" name="ri:pass-pending-line" size="16" />
						<!-- <span class="nav-icon" /> -->
						Dashboard
					</NuxtLink>
				</li>
				<li class="nav-item">
					<NuxtLink
						to="/user/profile"
						class="nav-link "
					>
					<Icon class="nav-icon" name="ri:user-fill" size="16" />
						Profile
					</NuxtLink>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
					>
					<Icon class="nav-icon" name="ri:id-card-fill" size="16" />
						Cards
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link "
					>
					<Icon class="nav-icon" name="ri:star-fill" size="16" />
						Subscription
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
					>
					<Icon class="nav-icon" name="ri:box-3-fill" size="16" />
						Products
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
					>
					<Icon class="nav-icon" name="ri:user-settings-fill" size="16" />
						Users
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
					>
					<Icon class="nav-icon" name="ri:bar-chart-2-fill" size="16" />
						Analytics
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link "
					>
					<Icon class="nav-icon" name="ri:shopping-bag-4-fill" size="16" />
						Store
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
					>
					<Icon class="nav-icon" name="ri:settings-3-fill" size="16" />
						Settings
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link "
					>
					

					<Icon class="nav-icon" name="ri:shield-fill" size="16" />
						Security
					</a>
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
	const router = useRouter()
	const logout = async () =>{
		router.push('/')
	}
	</script>

    <style scoped>
@import "~/assets/css/admin/admin.css";


    </style>