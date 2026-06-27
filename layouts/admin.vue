<template>
	<div class="body-container">
		<AdminNavBar />

		<main class="main-content">
		<AdminMobileMenu />
			<slot />
		</main>
	</div>
</template>

<script setup>
import isLoggedOut from '~/middleware/isLoggedOut';

definePageMeta({
	middleware: isLoggedOut
})
</script>

    <style scoped>
    @import "~/assets/css/admin/admin.css";
</style>
