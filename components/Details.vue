<template>
	<b-modal centered hide-header hide-footer 
		id="modal-show" 
		ref="modal-show" 
		content-class="border-0"
		body-class="p-0" 
		@show="updateProduct(product)"
		>
		<b-overlay :show="this.$store.state.products.updating" rounded="sm" spinner-type="grow" spinner-variant="success">
		<div class="card border-0" style="" v-if="ad">
			<div class="card-img-top aspect-ratio-box" v-if="product.photo">
				<a href="#" class="aspect-ratio-box-inside">
					<img :src="product.photo === true ? placeholderImage : product.photo" :alt="product.title" >
				</a>
			</div>
			<div class="card-body">
				<h4 class="card-title"><a :href="product.url">{{product.title}}</a></h4>
				<h5 class="card-title text-secondary">
					$<b>{{product.price}}</b>
					<a :href="'tel:' + phone" v-if="product.phones.length"  v-for="phone in product.phones">
					{{ phone }}
					</a>
				</h5>
				<p class="card-text">
				</p>
			</div>
	        <div class="card-footer border-0 d-flex justify-content-around ">
				<a :href="'tel:' + product.phones[0]" v-if="product.phones && product.phones.length" class="btn btn-link text-success">
					<b>Llamar</b>
				</a>	        	
			    <button class="btn" @click.prevent="hide">Eliminar</button>
			    <button class="btn" @click.prevent="$bvModal.hide('modal-show')">Cerrar</button>
	        </div>
		</div>
		</b-overlay>
	</b-modal>
</template>

<script>
import { BOverlay  } from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
	props: [ 'ad' ],
	components: {  BOverlay },
	data(){
		return {
			loading: false,
			placeholderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII='
		}
	},
	computed: {
		product: function() {
			return this.$store.state.products.items.find( el => el.url === this.ad.url )
		}
	},
	methods: {
	    ...mapActions({ updateProduct: 'products/update' }),  		
		hide(){
			this.$bvModal.hide('modal-show')
			this.$store.commit('products/toggleHide',this.product)
		}
	}

};

</script>
<style>
.aspect-ratio-box {
  height: 0;
  overflow: hidden;
  padding-top: 75%;
  background: white;
  position: relative;
}
.aspect-ratio-box-inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.aspect-ratio-box-inside img {
  width: 100%;
  height: 100%;
  object-fit: cover; /*magic*/
}

</style>