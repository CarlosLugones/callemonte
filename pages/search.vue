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
          class="product card border-0 mb-1"  
          v-for="(product,index) in filteredProducts" >
          <div class="card-body d-flex align-items-center p-3">
            <a class="flex-grow-1" href @click.prevent="openDetails(product)">
              <span class="font-weight-bold mr-2">
                <span class="text-secondary">$</span>{{ product.price }}
              </span>
              <span class="title text-primary " v-html="product.htmlTitle"></span>
            </a>
            <div class="actions d-none d-sm-block">
              <a href @click.prevent="$store.commit('products/toggleHide',product)" 
                class="text-decoration-none text-secondary ml-2" 
                title="Ocultar este resultado">
                  <TrashIcon size="1.1x" ></TrashIcon>
              </a>                    
            </div>
            
          </div>
      
        </li>
      </ul>
      <b-spinner 
        v-if="$store.state.products.searching"
        variant="success" 
        type="grow" 
        label="Spinning"></b-spinner>          
      <!-- <Details :ad="selected"></Details> -->
      <b-modal centered hide-header hide-footer 
        id="modal-show" 
        ref="modal-show" 
        content-class="border-0"
        v-if="selectedProduct"
        body-class="p-0" 
        @show="updateProduct(currentProduct)"
        >
        <b-overlay :show="$store.state.products.updating" rounded="sm" spinner-type="grow" spinner-variant="success">
        <button type="button" class="btn back" aria-label="Close" @click.prevent="$bvModal.hide('modal-show')">
          <x-icon size="1.5x" class="custom-class"></x-icon>
        </button>
        <div class="card border-0" style="" >
          <div class="card-img-top aspect-ratio-box" v-if="currentProduct.photo">
            <a href="#" class="aspect-ratio-box-inside">
              <img :src="currentProduct.photo === true ? placeholderImage : currentProduct.photo" :alt="currentProduct.title" >
            </a>
          </div>
          <div class="card-body p-3">
            <div class="">
              <div class="small text-secondary">
                <span class="">{{currentProduct.location}}</span>
                <span v-if="currentProduct.date">&bull;</span>
                <span class="">{{currentProduct.date}}</span>
              </div>
              <div class="">
                <a :href="currentProduct.url" target="_black" rel="noopener noreferrer">
                  <b>{{currentProduct.title}}</b>
                </a>
                <img :src="'/fav/'+currentProduct.site+'.png'" width="16" class="">
              </div>
              <div class="text-secondary">
                $<b>{{currentProduct.price}}</b>
                <a :href="'tel:' + phone" v-if="currentProduct.phones.length"  v-for="phone in currentProduct.phones">
                {{ phone }}
                </a>
              </div>
              
            </div>
          </div>
          <div class="card-footer border-0 d-flex justify-content-around p-1">
            <a :href="'tel:' + currentProduct.phones[0]" v-if="currentProduct.phones && currentProduct.phones.length" class="btn btn-link text-success">
              <b>Llamar</b>
            </a>            
              <button class="btn" @click.prevent="hide">Eliminar</button>
              </div>
        </div>
        </b-overlay>
      </b-modal>

      <div class="row mt-3">
        <div class="col-12 mb-4" > 
          <button class="btn btn-success btn-block  py-3 border-0" @click="next"><b>Vamos por más</b></button>
        </div>
      </div>

      <div class="text-center mt-3 mb-5">
        <div class="mb-3"><b>Si te gustó Callemonte compártelo y corre la bola.</b></div>
        <social-sharing url="https://callemonte.com/" title="Callemonte. Buscador de clasificados" description="Busca clasificados en los sitios de Cuba y ahorra tus datos" inline-template>  
          <div class="d-flex justify-content-center">
            <network network="twitter" class="mr-4" style="cursor: pointer;">
                <img width="32" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" title="Twitter" att="Twitter"/> 
            </network> 
            <network network="facebook" class="mr-4" style="cursor: pointer;">
              <img width="32" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" title="Facebook" att="Twitter"/> 
            </network>                        
            <network network="telegram" class="mr-4" style="cursor: pointer;">
              <img width="32" src="https://unpkg.com/simple-icons@latest/icons/telegram.svg" title="Telegram" att="Twitter"/> 
            </network>     
            <network network="whatsapp" style="cursor: pointer;">
              <img width="32" src="https://unpkg.com/simple-icons@latest/icons/whatsapp.svg" title="Whatsapp" att="Twitter"/> 
            </network>     
          </div>    
          </social-sharing>  
      </div>

           
    </div>
    <div v-else class="card border-0">
      <div class="card-body p-4 text-center">
        Vaya!!! No hay resultados.
      </div>
    </div>

  </div>

</template>

<script>
// import Details from '~/components/Details';
import Footbar from '~/components/Footbar';
import {  CameraIcon, TrashIcon, EyeOffIcon, FacebookIcon, TwitterIcon, MailIcon, XIcon }  from 'vue-feather-icons'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

// import Vue from 'vue'
// import VueProgressiveImage from 'vue-progressive-image'

// Vue.use(VueProgressiveImage)

export default {
  components: { Footbar,CameraIcon, TrashIcon, EyeOffIcon, FacebookIcon, TwitterIcon, MailIcon, XIcon },
  watchQuery: true, 
  head() {
    return {
      htmlAttrs: {
          class: 'padding-top',
      }
    }
  },
  data(){
    return {
      p: 1,
      selectedProduct: null,
      placeholderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII='      
    }
  },
  created() {
    this.newSearch(this.$route.query)
  },
  watchQuery (newQuery, oldQuery) {
    this.newSearch(newQuery)
    return false
  },
  computed: {
    // ...mapGetters({ filteredProducts: 'products/filtered' }),
    ...mapGetters({ productsCount: 'products/productsCount' }),
    ...mapGetters({ hidesCount: 'products/hidesCount' }),
    currentProduct: function() {
      return this.$store.state.products.items.find( el => el.url === this.selectedProduct.url )
    },   
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
    newSearch( params ) {
      this.$store.commit('products/clear')
      this.searchProducts( params )
    },
    next() {
      this.p ++;
      this.searchProducts( {...this.$route.query, p: this.p} )
    },
    openDetails( product ) {
      this.selectedProduct = product,
      this.$bvModal.show('modal-show')
      // this.$refs['modal-show'].show()
    },  
    hide(){
      this.$bvModal.hide('modal-show')
      this.$store.commit('products/toggleHide',this.currentProduct)
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