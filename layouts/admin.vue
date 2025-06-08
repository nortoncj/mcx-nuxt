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

</script>

    <style scoped>
    @import "~/assets/css/admin/admin.css";
</style>
