<template>
  <div> 
    <div v-if="productsCount > 0" class="content-result">

      <div class="d-flex tool my-3 align-items-center ">
        <span>{{ productsCount }} Resultados</span>
        <!-- <a href >{{ hidesCount }} <TrashIcon size="1.1x" ></TrashIcon></a> -->
        <a href="https://notificon.com" target="_blank" class="ml-auto"><b>Crea una alerta</b></a>                
      </div>

      <ul class="list-unstyled" id="products">
        <li 
          class="product border-0 card mb-1 "  
          :class="product.updated ? 'bg-secondary text-white' : ''"
          v-for="(product,index) in filteredProducts" >

          <div class="card-body d-flex align-items-center px-2 py-3">
<!--             <a href 
              @click.prevent="$store.commit('products/toggleFavorite',product)" 
              class="align-baseline mr-2" 
              :class="product.favorite ? 'text-warning' : ''">
              <StarIcon size="1.2x"></StarIcon>
            </a> -->
            <a class="flex-grow-1" href @click.prevent="openDetails(product)" :class="product.updated ? 'text-white' : ''">
              <span class="font-weight-bold">
                <span class="">$</span>{{ product.price }}
              </span>
              <span class="title" v-html="product.htmlTitle"></span>
              <img :src="'/fav/'+product.site+'.png'" width="15" class="ml-1 align-middle">
            </a>
            
            <div class="actions d-none d-sm-block ml-3">
              <a href @click.prevent="$store.commit('products/toggleHide',product)" 
                class="text-decoration-none " 
                :class="product.updated ? 'text-white' : 'text-secondary'"
                title="Ocultar este resultado">
                  <TrashIcon size="1.2x" ></TrashIcon>
              </a>                    
            </div>
          </div>
      
        </li>
      </ul>
        
      <div class="row mt-3">
        <div class="col-12 mb-4" > 
          <button class="btn btn-success btn-block  py-3 border-0" @click="next" :disabled="$store.state.products.searching">
            <b-spinner type="grow" small v-if="$store.state.products.searching"></b-spinner>   
            <b>Vamos por más</b>
          </button>
        </div>
      </div>

      <Details :selectedProduct="selectedProduct"></Details>
      <Social/>
           
    </div>
    <div v-else class="mt-3 text-center">

      <b-spinner type="grow" variant="success" v-if="$store.state.products.searching"></b-spinner>   
      <div class="card border-0" v-else>
        <div class="card-body p-4 text-center" >
          Vaya!!! No hay resultados.
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import Details from '~/components/Details';
import Footbar from '~/components/Footbar';
import Social from '~/components/Social';
import { TrashIcon, StarIcon }  from 'vue-feather-icons'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  components: { Footbar, TrashIcon, Social, Details, StarIcon },
  fetch() {
    this.$nuxt.context.store.dispatch('products/search', this.$nuxt.context.query );
  },  
  head() {
    return {
      htmlAttrs: { class: 'padding-top' }
    }
  },  
  data(){
    return {
      p: 1,
      selectedProduct: null,
    }
  },
  created(){
    this.searchProducts( this.$route.query );
  },
  watch: {
    '$route.query': '$fetch'
  },  
  computed: {
    ...mapGetters({ productsCount: 'products/productsCount' }),
    ...mapGetters({ hidesCount: 'products/hidesCount' }),
    filteredProducts(){
      let products = this.$store.state.products.items
      return products
        .filter( el => !el.hide )
        .sort( (a,b) => b.score - a.score || a.price - b.price )      
    },
  },
  methods: {
    ...mapActions({ searchProducts: 'products/search' }),  
    ...mapActions({ updateProduct: 'products/update' }),  
    next() {
      this.p ++;
      this.searchProducts( {...this.$route.query, p: this.p} )
    },
    openDetails( product ) {
      this.selectedProduct = product,
      this.$bvModal.show('modal-show')
    },  
    hide(){
      this.$bvModal.hide('modal-show')
      this.$store.commit('products/toggleHide',this.currentProduct)
    },
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