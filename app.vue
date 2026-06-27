<template>
	<VitePwaManifest />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { isMobile, isPreviewOverlay, updatedLinkId, addLinkOverlay, id } = storeToRefs(userStore);

const route = useRoute();
let show = ref(false);
let bgIsGray = ref(false);
onMounted(() => {
	userStore.colors = themes()
	updatedLinkId.value = 0
	addLinkOverlay.value = false;
	isPreviewOverlay.value = false;
	isMobile.value = false;
	if ('ontouchstart' in window) {
		isMobile.value = true;
	}
})

const themes = () => {
	return [
	{ id:'1',class: 'imperial-gold', name: 'Imperial Gold', primary: '#FFD700', bg: '#1a1a1a', text: '#ffffff', accent: '#8B4513' },
    {id:'2', class:'royal-purple', name:'Royal Purple', primary:'#d4af37', bg:'#2d2a4a', text:'#faf3dd', accent:'#a47e3b'},
    {id:'3', class:'elysium', name:'Elysium', primary:'#d4c5a6', bg:'#f5f5f5', text:'#2e2e2e', accent:'#b6a78f'},
    { id: '4', class: 'inferno', name: 'Inferno', primary: '#DC143C', bg: '#600101', text: '#f5e9e9', accent: '#a11d23' },
    {id:'5', class:'golden-hour', name:'Golden Hour', primary:'#FF8C00', bg:'#5A3E1B', text:'#FFF6D5', accent:'#F4A261'},
    {id:'6', class:'obsidian', name:'Obsidian', primary:'#f5f5f5', bg:'#131313', text:'#ffffff', accent:'#f4f4f4'},
    {id:'7', class:'purple-reign', name:'Purple Reign', primary:'#FFD700', bg:'#2e1a47', text:'#f5e6fa', accent:'#a029a0'},
    {id:'8', class:'atlantis', name:'Atlantis', primary:'#00b4d8', bg:'#2c2c54', text:'#f8f8ff', accent:'#ff6f61'},  
    {id:'9', class:'republic', name:'Republic', primary:'#D1232A', bg:'#F5F5F5', text:'#1A1A1A', accent:'#3366CC'}, 
    {id:'10', class:'twilight', name:'Twilight', primary:'#FF9561', bg:'#1C1C3C', text:'#E3D9F3', accent:'#6A4C93'},
    {id:'11', class:'eden', name:'Eden', primary:'#a6e22e', bg:'#272822', text:'#f8f8f2', accent:'#fd971f'},
    {id:'12', class:'pheonix-fire', name:'Pheonix Fire', primary:'#B8390E', bg:'#3E1E0F', text:'#F8E4C9', accent:'#D45C2C'},
	]
}
</script>
