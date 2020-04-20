<template>
	<b-modal centered 
		hide-header 
		id="modal-show" 
		ref="modal-show"
		:lazy="true" 
		content-class="border-0"
		body-class="position-static p-0" 
		footer-class="p-2"
		@shown="updateProduct(product)">

	  	<button type="button" class="btn back" aria-label="Close" @click.prevent="$bvModal.hide('modal-show')">
		    <x-icon size="1.5x" class="custom-class"></x-icon>
	  	</button>
	  	<div class="card border-0" >

		    <div class="card-img-top aspect-ratio-box" v-if="product.photo">
		      <a href="#" class="aspect-ratio-box-inside">
		        <img :src="product.photo === true ? placeholderImage : product.photo" :alt="product.title">
		      </a>
		    </div>

		    <div class="card-body p-3">

		        <div class="small text-secondary">
					<span class="">{{product.location}}</span>
					<span v-if="product.date">&bull;</span>
					<span class="">{{product.date}}</span>
		        </div>

		        <div class="">
					<a :href="product.url" target="_black" rel="noopener noreferrer">
						<b>{{product.title}}</b>
					</a>
					<img :src="'/fav/'+product.site+'.png'" width="16" class="ml-2">
		        </div>

		        <div class="text-secondary">
					$<b>{{product.price}}</b>
					<a :href="'tel:' + phone" v-if="product.phones.length"  v-for="phone in product.phones">
					{{ phone }}
					</a>
		        </div>

		    </div>
		</div>

		<template v-slot:modal-footer>
			<button class="btn btn-light text-uppercase ml-2" @click.prevent="hide">Eliminar</button>
			<a 
			  :href="'tel:' + product.phones[0]" 
			  v-if="product.phones && product.phones.length" 
			  class="btn btn-success">
			  <b>Llamar</b>
			</a>            
		</template> 

		 <b-overlay 
		    :show="$store.state.products.updating" 
		    no-wrap 
		    rounded 
		    spinner-type="grow" 
		    spinner-variant="success">
	  	</b-overlay>

	</b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { TrashIcon, XIcon }  from 'vue-feather-icons'

export default {
	props: [ 'selectedProduct' ],
	components: { TrashIcon, XIcon },
	data(){
		return {
			loading: false,
			placeholderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII='
		}
	},
	computed: {
	    product: function() {
	      return this.selectedProduct ?
	                this.$store.state.products.items.find( el => el.url === this.selectedProduct.url ) :
	                this.$store.state.products.items[0]
	    }, 
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