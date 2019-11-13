<template>
    <gallery :images="images" :index="idx" @close="close"></gallery>
</template>

<script>
// import VueGallery from 'vue-gallery';
export default { 
	props: ['images', 'index'],
    data() {
    	return {
    		idx: null,
    	}
    },
    watch: {
    	index: function(newValue,oldValue){ return this.idx = newValue }
    },
    methods: { 
    	close() {
    		this.idx = null;
    		this.$emit('close');
    	}
    }
}

</script>


<style>
  .blueimp-gallery > .close,
  .blueimp-gallery > .next,
  .blueimp-gallery > .prev { 
  	color: #fff !important;  
  	border: 0;
  	background: none;
  }
</style>