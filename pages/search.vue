<template>
  <div> 
    <Navbar 
      :products="filteredProducts" 
      :filters="filters"
      :page="p"
      v-on:search="search"/>

    <div class="container">
      <div class="row justify-content-center">
         <div class="col-sm-8 col">      
          
            <div v-if="filteredProducts.length > 0" class="content-result">

              <div class="d-flex tool my-3">
                <span>{{filteredProducts.length}} Resultados</span>
                <a href="https://alertas.callemonte.com" target="_blank" class="ml-auto"><b>Crea una alerta</b></a>                
              </div>

                  <ul class="list-group" id="products">
                    <li 
                      class="product list-group-item d-flex align-items-center border-0 bg-white mb-1"  
                      v-for="(product,index) in filteredProducts" >

                      <div class="w-100 mr-2" >
<!--                        <span class="separator">&lt;!&ndash;&rarr;&ndash;&gt; - </span>-->
                        <a 
                          target="_blank" 
                          rel="nofollow" 
                          class="title mr-1"
                          v-html="product.htmlTitle" 
                          :href="product.url"></a>
                        <a :href="'tel:' + phone" class="bg-gray px-2 ml-1 rounded d-inline-block" v-if="product.phones" v-for="phone in product.phones">
                          {{ phone }}
                        </a>
                        <a href @click.prevent="loadPhotos(product,index)" class="text-warning ml-1" v-if="product.photo">
                          <camera-icon size="1.1x"></camera-icon>
                        </a>
                        <span class="product-site ml-1 text-secondary small">{{ product.site }}</span>
                        
                      </div>        
                      <div class="font-weight-bold price mr-3">
                        <span class="text-secondary">$</span>{{ product.price }}

                      </div>
                      <div class="actions ml-2">
                          <a 
                            href="#" 
                            v-on:click.prevent="toggleHide(product.id, index)" 
                            class="text-gray text-decoration-none x" 
                            title="Ocultar este resultado">
                              <eye-off-icon size="1x"></eye-off-icon>
                          </a>                    
                      </div>
                  
                    </li>
                  </ul>

              <div class="row mt-3">
                <div class="col-12 mb-4" v-if="show === 'all'"> 
                  <button class="btn btn-success btn-block  py-3 border-0" @click="next">Vamos por más</button>
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
            <div v-else class="card border-0 shadow-sm">
              <div class="card-body p-4" >
                  Buscando clasificados en Cuba...                
<!--                 <p v-else>
                  Extraño!!! Nadie está vediendo lo que quieres... prueba otro palabra.
                </p> -->
              </div>
            </div>
         </div>
      </div>
    </div>
    <no-ssr>
      <vue-gallery :images="photos" :index="indexPhoto" @close="indexPhoto = null"></vue-gallery>
    </no-ssr>
  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby';
import Navbar from '~/components/Navbar';
import { CameraIcon, EyeOffIcon, FacebookIcon, TwitterIcon, MailIcon  } from 'vue-feather-icons'

var store = require('store');

export default {
  components: { Navbar, CameraIcon, EyeOffIcon, FacebookIcon, TwitterIcon, MailIcon },
  head() {
    return {
      htmlAttrs: {
          class: 'padding-top',
      }
    }
  },
  data(){
    return {
      q: '',
      p: 1,
      products: [],
      currentPhotos:[],
      photos: [],
      loadingPhoto: [],
      indexPhoto: null,
      hides: [],
      modalOpen: null,
      filters: { 
          byTitle: false,
          byPhone: false,
          byPhoto: false,
          byPrice: '1'
      },
      sites: [  
        'bachecubano', 
        'revolico', 
        'porlalivre', 
        'timbirichi', 
        '1cuc', 
        'merolico', 
      ],
      completed: -1,
      show: 'all',
    }
  },
  created() {
    this.hides = store.get('hides',[]);
    this.q = this.$route.query.q;
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      this.modalOpen = modalId
    })
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.modalOpen = null
    })    
  },
  watch: {
    // whenever question changes, this function will run
    q: function (newQ, oldQ) {
      if (newQ != oldQ) {
        this.products = [];
        this.p = 1;
      }
      // this.search();
    },
    hides: function( newValue, oldValue ) {
        store.set( 'hides', newValue );
        if (newValue.length == 0) {
            this.show = 'all';
        }
    },
  },
  computed: {
    filteredProducts: function() {
      var vm = this,
          products = vm.products,
          [priceMin, priceMax = 99999] = vm.filters.byPrice.split('-');

      products = uniqBy(products, (p) => {
        return p.price + p.title.replace(/[^a-zA-Z0-9]/,'') + p.phones;
      })

      return products.filter( p => {
            let isHide = vm.hides.includes( p.id ),
                price = parseFloat(p.price);

      // console.log( p.price + '->' + ( parseFloat(p.price) >= priceMin && p.price <= priceMax ))
            return  (vm.filters.byTitle ? vm.reQuery.test(p.title) : true) && 
                    ( price >= priceMin && price <= priceMax ) && 
                    ( vm.filters.byPhoto ? p.photo : true ) && 
                    ( vm.filters.byPhone ? p.phones : true ) && 
                    ( vm.show==='hidden' ? isHide : ! isHide );
        });
    },
    reQuery: function(){
      let re = this.q
                  .split(' ')
                  .filter( el => el.length > 2 )
                  .map( el => '((^|\\s)'+el+')' )
                  .join('|');

      return new RegExp(re,"ig");      
    },
    searching: function(){
      return this.completed > 0;
    }
  },
  methods: {
    next() {
      this.p ++;
    },
    toggleHide(id,index) {
        if ( ! this.hides.includes(id) ) {
            this.hides.push(id);
        } else {
            this.hides.splice(index, 1);
        }
    },
    isHidden(id) { 
        return this.hides.includes(id);
    },
    search: function(q) {
      let vm = this;

      vm.q = q;
      vm.$router.push({ path: '/search', query: { q: this.q, p: this.p } })

      this.completed = vm.sites.length;
      vm.sites.forEach( site => {

        let url = `https://callemonte.com/.netlify/functions/${site}?q=${this.q}&p=${this.p}`

        this.$axios.$get(url)
          .then( response => { 

            let products = response.map( (el,index) => Object.assign( el, { 
              htmlTitle: el.title.replace( vm.reQuery, "<b>$&</b>" ),
              site: site,
              index: index
            } ));
            vm.products = vm.products.concat( products );
            this.completed --;

          })
          .catch( error => {
            this.completed --;
          });

      });
    },
    loadPhotos: async function(product,index) {
      if ( typeof product.photo === 'boolean') {
        this.$swal('Buscando las fotos...');
        let data = await this.$axios.$get(`https://callemonte.com/.netlify/functions/photos?url=${product.url}`)
        product.photo = data.photos
        if ( data.phones.length > 0 ) {
          product.phones = data.phones
        }
        this.products.splice(product.index, 1, product)
        this.$swal().close()
      } 
      this.photos = product.photo
      this.indexPhoto = 0
    },      
  }
};
</script>
