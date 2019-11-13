<template>
	<b-modal centered hide-footer hide-header id="modal-photo" body-class="p-0">
		  <hooper>
    <slide v-for="(photo, index) in photos" :key="index">
		<img  :src="photo" class="img-fluid"/>
    </slide>
  </hooper>
	</b-modal>  	
</template>
<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
	props: [ 'photos' ],
	  components: {
	    Hooper,
	    Slide
	  },
	data() {
		return {
		}
	},
	methods: {
	
	}
}
</script>