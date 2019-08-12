<template>
  <div> 
    <Navbar 
      :products="filteredProducts" 
      :filters="filters"
      :page="p"
      v-on:search="search"/>

    <div class="container">
      <div v-if="filteredProducts.length > 0" class="content-result">
        <div class="">
          {{filteredProducts.length}} Resultados
        </div>
        <div class="table-responsive">
            <table id="products" class="table table-hover mt-3" >
              <tbody>
                <tr v-for="(product,index) in filteredProducts" >
                  <td><span class="is-price">{{ product.price }}</span></td>
                  <td class="title">
                    <a 
                      target="_blank" 
                      rel="nofollow" 
                      class=""
                      v-html="product.htmlTitle" 
                      :href="product.url"></a>
                    <span class="badge badge-light" v-if="product.photo">Foto</span>
                    <!-- <span class="tag">{{ product.url.match(/revolico|merolico|bachecubano|porlalivre|1cuc|timbirichi|riquera/)}}</span> -->
                    <span class="is-phone">{{ product.phones }}</span>
                  </td>
                  <td class="text-right">
                      <a 
                        href="#" 
                        @click="toggleHide(product.id,index)" 
                        class="d-none d-md-block close" 
                        title="Oculta el producto del listado">
                          <span :class="isHidden(product.id) ? 'has-text-success' : 'has-text-danger' ">&times;</span>
                      </a>
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
var store = require('store');

export default {
  components: { Navbar },
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
      sites: [  'bachecubano', 'revolico', 'porlalivre', 'timbirichi', '1cuc', 'merolico', 'riquera' ],
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
      this.search();
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
            let isHide = vm.hides.includes( p.id );

            return  (vm.filters.byTitle ? vm.reQuery.test(p.title) : true) && 
                    ( p.price >= priceMin && p.price <= priceMax ) && 
                    ( vm.filters.byPhoto ? p.photo : true ) && 
                    ( vm.filters.byPhone ? p.phones : true ) && 
                    ( vm.show==='hidden' ? isHide : ! isHide );
        });
    },
    reQuery: function(){
      let re = this.q
                  .split(' ')
                  .filter(el=>el.length>2)
                  .map(el=>'((^|\\s)'+el+')')
                  .join('|');

      return new RegExp(re,"ig");      
    }
  },
  methods: {
    next() {
      this.p ++;
      console.log(this.p)
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
    search: function() {
      let vm = this;
      this.q = this.$route.query.q;

      vm.sites.forEach( (site) => {

        let url = 'https://callemonte.com/.netlify/functions/'+ site +'?q=' + this.q + '&p=' + this.p

        this.$axios.$get(url).then( response => { 

          let products = response.map( el => Object.assign( el, { htmlTitle: el.title.replace( vm.reQuery, "<b>$&</b>" )} ));
          vm.products = vm.products.concat( products );

        });

      });


    },

    

  }
  // and more functionality to discover

}
</script>