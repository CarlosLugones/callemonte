<template>
  <div> 
    <Navbar 
      :products="filteredProducts" 
      :filters="filters"
      :page="p"
      v-on:search="search"/>

    <div class="container">
      <div v-if="filteredProducts.length > 0" class="content-result row">
        <div class="tool m-3">
          {{filteredProducts.length}} Resultados
        </div>
        <div class="table-responsive">
            <table id="products" class="table table-hover" >
              <tbody>
                <tr v-for="(product,index) in filteredProducts" >
                  <td><span class="font-weight-bold">{{ product.price }}</span></td>
                  <td class="title">
                    <a 
                      target="_blank" 
                      rel="nofollow" 
                      class=""
                      v-html="product.htmlTitle" 
                      :href="product.url"></a>

                    <span class="text-muted ml-1" v-if="product.photo">
                      <camera-icon size="1x"></camera-icon>
                    </span>

                    <span class="font-weight-bold ml-1">{{ product.phones }}</span>

                    <span class="product-site ml-1">{{ product.site }}</span>
                  </td>
                  <td class="text-right">
                    <span class="d-none d-md-block ">
                      <a 
                        href="#" 
                        v-on:click.prevent="toggleHide(product.id,index)" 
                        class="text-secondary text-decoration-none x" 
                        title="Ocultar este resultado">
                          <span class="">&times;</span>
                      </a>
                      
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div class="is-centered mb-4" v-if="show === 'all'"> 
          <button class="btn btn-outline-success btn-block" @click="next">Vamos por más</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby';
import Navbar from '~/components/Navbar';
import { CameraIcon } from 'vue-feather-icons'

var store = require('store');

export default {
  components: { Navbar, CameraIcon },
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

      console.log( p.price + '->' + ( parseFloat(p.price) >= priceMin && p.price <= priceMax ))
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

      vm.sites.forEach( site => {

        let url = 'https://callemonte.com/.netlify/functions/'+ site +'?q=' + this.q + '&p=' + this.p

        this.$axios.$get(url).then( response => { 

          let products = response.map( el => Object.assign( el, { 
            htmlTitle: el.title.replace( vm.reQuery, "<b>$&</b>" ),
            site: site
          } ));

          vm.products = vm.products.concat( products );

        });

      });


    },

    

  }
  // and more functionality to discover

}
</script>