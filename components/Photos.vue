<template>
	<a href="#" class="text-warning ml-1" >
	  <camera-icon size="1.2x"></camera-icon>
	</a>
</template>

<script>
import { CameraIcon } from 'vue-feather-icons'
export default { 
	props: ['url'],
	components: { CameraIcon },
    mounted() {
		let url = `https://callemonte.com/.netlify/functions/photos?url=${this.url}`
		this.$axios.$get(url, { progress: false }).then( response => {
			this.$emit('update:photo', response)
		});
    },
}

</script>


