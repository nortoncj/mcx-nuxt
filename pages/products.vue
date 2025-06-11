<script lang='ts' setup>
definePageMeta({
	layout: "front",
});
const { data: products, error, status } = await useFetch("/api/products", {
	lazy: true,
});
const {$errorMessage, $successMessage} = useNuxtApp();
</script>

<template>
	<div class="body-container">
		{{ $successMessage('Server Success!') }}
		{{ $errorMessage('Server Error') }}
		<article
			v-if="status === 'pending'"
			aria-busy="true"
		/>
		<article
			v-else-if="error"
			class="error"
		>
			{{ error.statusMessage }}
		</article>
		<div
			v-else
			class=""
		>
			<article
				v-for="product in products"
				:key="product.id"
			>
				{{ product.name }}
			</article>
		</div>
	</div>
</template>
<style scoped>
.body-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
.error {
	color: red;
}
</style>