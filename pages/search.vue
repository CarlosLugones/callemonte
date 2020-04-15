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
              <!-- <img :src="'/fav/'+product.site+'.png'" width="16"> -->
            </a>
            <div class="actions">
              <a href @click.prevent="$store.commit('products/toggleHide',product)" 
                class="text-decoration-none text-secondary ml-2" 
                title="Ocultar este resultado">
                  <TrashIcon size="1.1x" ></TrashIcon>
              </a>                    
            </div>
            
          </div>
      
        </li>
      </ul>

      <Details 
        :ad="currentProduct" 
        v-if="currentProduct"
        @hide="$store.commit('products/toggleHide',product)">
      </Details>

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
      <div class="card-body p-4" >
          Buscando clasificados en Cuba...                
      </div>
    </div>
    <!-- <Footbar></Footbar> -->
  </div>

</template>

<script>
import Details from '~/components/Details';
import Footbar from '~/components/Footbar';
import {  CameraIcon, TrashIcon, EyeOffIcon, FacebookIcon, TwitterIcon, MailIcon } from 'vue-feather-icons'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  components: { Footbar,CameraIcon, TrashIcon, EyeOffIcon, FacebookIcon, TwitterIcon, MailIcon, Details  },
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
      currentProduct: null,
    }
  },
  created() {
    this.newSearch(this.$route.query)
    this.currentProduct = this.filteredProducts[0]
  },
  watchQuery (newQuery, oldQuery) {
    this.newSearch(newQuery)
    return false
  },
  computed: {
    // ...mapGetters({ filteredProducts: 'products/filtered' }),
    ...mapGetters({ productsCount: 'products/productsCount' }),
    ...mapGetters({ hidesCount: 'products/hidesCount' }),
    products () {
      return this.$store.state.products.items
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
      this.currentProduct = product,
      this.$bvModal.show('modal-show')
      // this.$refs['modal-show'].show()
    },  
  }

};
</script>
