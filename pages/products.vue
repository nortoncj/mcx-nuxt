<script lang='ts' setup>
const { data: products, error, status } = await useFetch("/api/products", {
	lazy: true,
});
</script>

<template>
	<div class="body-container">
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
