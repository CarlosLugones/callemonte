<template>
  <div> 
    <Navbar :products="filteredProducts" :filters="filters"/>
    <div class="container">
      <div v-if="filteredProducts.length > 0">
          <table id="products" class="table table-hover mt-3" >
            <tbody>
            <tr v-for="(product,index) in filteredProducts"  class="product">
              <td><span class="is-price">{{ product.price }}</span></td>
              <td>
                <a 
                  target="_blank" 
                  rel="nofollow" 
                  v-html="product.htmlTitle" 
                  :href="product.url" 
                  :title="product.original_title"></a>
                <span class="badge badge-light" v-if="product.photo">Foto</span>
                <!-- <span class="tag">{{product.site}}</span> -->
                <span class="is-phone">{{ product.phones }}</span>
              </td>
              <td class="d-none d-md-block text-right">
                  <a href="#" @click="toggleHide(product.id,index)" title="Oculta el producto del listado">
                      <span :class="isHidden(product.id) ? 'has-text-success' : 'has-text-danger' ">&times;</span>
                  </a>
              </td>
            </tr>
            </tbody>
          </table>
          
          <div class="is-centered mb-4" v-if="show === 'all'"> 
            <button class="btn btn-outline-secondary btn-block" @click="next">Vamos por más</button>
          </div>
          
      </div>
      <div class="notification has-text-centered is-size-5" v-if="filteredProducts.length && searching>0">
        Buscando...
      </div>

    </div>
  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby';
// import DropMenuFilter from '~/components/DropMenuFilter';
import Navbar from '~/components/Navbar';
var store = require('store');

export default {
  components: { Navbar },
  metaInfo: {
    htmlAttrs: {
      class: 'padding-top',
    }
  }  ,
  data(){
    return {
      p: 1,
      products: [],
      hides: [],
      searching: 0,
      filters: { 
          byTitle: false,
          byPhone: false,
          byPhoto: false,
          byPrice: '1-1000000000'
      },
      sites: [  'bachecubano', 'revolico', 'porlalivre', 'timbirichi', '1cuc', 'merolico', 'ricurancia' ],
      show: 'all',
    }
  },
  created() {
    this.hides = store.get('hides',[]);
    this.search()
  },
  watch: {
    // whenever question changes, this function will run
    q: function (newQ, oldQ) {
      if (newQ != oldQ) {
        this.products = [];
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
    q: function() {
      return this.$route.query.q;
    },
    filteredProducts: function() {
      var vm = this,
          products = vm.products,
          [priceMin, priceMax] = vm.filters.byPrice.split('-');

      products = uniqBy(products, (p) => {
        return p.price + p.title.replace(/[^a-zA-Z0-9]/,'') + p.phones;
      })

      return products
        .filter( p => {
            let isHide = vm.hides.includes( p.id );
            return  (vm.filters.byTitle ? vm.reQuey.test(p.title) : true) && 
                    ( p.price >= priceMin && p.price <= priceMax ) && 
                    ( vm.filters.byPhoto ? p.photo : true ) && 
                    ( vm.filters.byPhone ? p.phones : true ) && 
                    ( vm.show==='hidden' ? isHide : ! isHide );
        });
    },
    reQuey: function(){
        let words = this.q
                      .trim() 
                      .split('\s')
                      .filter(el=>el.length>2)
                      .map(el=>'\\s'+el)
                      .join('|');
        return new RegExp(words,"ig");      
    }
  },
  methods: {
    next: function() {
      this.p ++;
      this.search();
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
    filter(filters) {
        this.filters = filters;
    },
    search: async function() {
      let vm = this;
      this.$router.push({ 
        path: this.$route.path, 
        query: { q: this.q }
      });

      vm.searching = vm.sites.length;

      await Promise.all( vm.sites.map( async (site) => {


        this.$axios
            .$get('https://callemonte.com/.netlify/functions/'+ site +'?q=' + this.q + '&p=' + this.p)
            // .$get('/.netlify/functions/'+ site +'?q=' + vm.q + '&p=' + vm.p)
            .then( response => { 
              // let products = response.each( el => {
              response.forEach( async el => {

                let urlFnPhone = 'https://callemonte.com/.netlify/functions/phone' + '?url=' + el.url;
                // let urlFnPhone = '/.netlify/functions/phone' + '?url=' + el.url;

                let product = Object.assign( el, { 
                  site: site, 
                  htmlTitle: el.title.replace( vm.reQuey, "<b>$&</b>" ),
                  // phones: (el.phones === "" && site !== 'bachecubano') ? await vm.$axios.$get(urlFnPhone) : el.phones,
                  is_favorite: false        
                }) 

                vm.products.push( product );

              });

              --vm.searching

            });

      }));


    },

    

  }
  // and more functionality to discover

}
</script>