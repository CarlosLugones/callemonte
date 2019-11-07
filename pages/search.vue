<template>
  <div> 
    <Navbar 
      :products="filteredProducts" 
      :filters="filters"
      :page="p"
      v-on:search="search"/>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xs-10 col-12">      
          
      <div v-if="filteredProducts.length > 0" class="content-result">

        <div class="tool my-3">
          {{filteredProducts.length}} Resultados
        </div>

            <ul class="list-group list-group-flush shadow-sm">
              <li 
                class="list-group-item d-flex"  v-for="(product,index) in filteredProducts" >
                <div class="ads w-100" v-touch:swipe.left="toggleHide(product.id,index)" v-touch:swipe.right="toggleHide(product.id,index)">
                  <span class="text-secondary small">$</span><span class="font-weight-bold">{{ product.price }}</span>
                  <span>&rarr;</span>
                  <a 
                    target="_blank" 
                    rel="nofollow" 
                    class="title"
                    v-html="product.htmlTitle" 
                    :href="product.url"></a>
                  <span class="ml-1 bg-gray px-2 py-1 rounded" v-if="product.phones">{{ product.phones }}</span>
                  <a href="#" @click.prevent="loadPhoto(product)" class="text-muted ml-1" v-if="product.photo">
                    <camera-icon size="1x"></camera-icon>
                  </a>
                  <span class="product-site ml-1 text-secondary small">{{ product.site }}</span>
                  
                </div>        
                <div class="actions ml-2">
                    <a 
                      href="#" 
                      v-on:click.prevent="toggleHide(product.id,index)" 
                      class="text-gray text-decoration-none x" 
                      title="Ocultar este resultado">
                        <eye-off-icon size="1x"></eye-off-icon>
                    </a>                    
                </div>
            
              </li>
            </ul>

        <div class="row mt-3">
          <div class="col-12 is-centered mb-4" v-if="show === 'all'"> 
            <button class="btn btn-link btn-block bg-light text-dark py-3 border-0" @click="next">Vamos por más</button>
          </div>
          
        </div>
      </div>

    </div>
    </div>
    </div>
  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby';
import Navbar from '~/components/Navbar';
import { CameraIcon, EyeOffIcon  } from 'vue-feather-icons'
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

var store = require('store');

export default {
  components: { Navbar, CameraIcon, EyeOffIcon  },
  head() {
    return {
      htmlAttrs: {
          class: 'padding-top',
      }
    }
  },
  loading: false,
  data(){
    return {
      q: '',
      p: 1,
      products: [],
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
      completed: 0,
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

      this.completed = 0;
      vm.sites.forEach( site => {

        let url = 'https://callemonte.com/.netlify/functions/'+ site +'?q=' + this.q + '&p=' + this.p

        this.$axios.$get(url)
          .then( response => { 

            let products = response.map( el => Object.assign( el, { 
              htmlTitle: el.title.replace( vm.reQuery, "<b>$&</b>" ),
              site: site
            } ));
            this.completed ++;
            vm.products = vm.products.concat( products );

          })
          .catch( error => {
            this.completed ++;
          });

      });
    },
    loadPhoto: async function(product) {
      let photos = await this.$axios.$get(`https://callemonte.com/.netlify/functions/photos?url=${product.url}`);
    }
  }

}
</script>