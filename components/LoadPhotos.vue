<template>
<span style="position: relative;">

    <a href @click.prevent="loadPhotos(product)" class="text-warning mr-1" v-if="product.photo">
      <camera-icon size="1.1x"></camera-icon>
    </a>

</span>

</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';	
import { CameraIcon  } from 'vue-feather-icons'
export default {
	props: ['product'],
	components: { CameraIcon },
	data() {
		return {
			loading: false
		};
	},
	methods: {
	    loadPhotos: async function() {
	    	let product = this.product
	    	this.loading = true
			if ( typeof product.photo === 'boolean') {
				let data = await this.$axios.$get(`https://callemonte.com/.netlify/functions/photos?url=${product.url}`)
				product.photo = data.photos
				if ( data.phones.length > 0 ) {
				  product.phones = data.phones
				}
			} 
			// this.loading = false;
			this.$emit( 'loaded-photos', product );
	    }, 	
	}
}
</script>
