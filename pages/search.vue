<template>
  <div>
    <!-- <Navbar/> -->
    <div class="content">
        <div class="">
            <div v-if="filteredProducts.length > 0">

                <div class="level is-mobile" id="toolbar">
                    <div class="level-left">
                        <span>{{filteredProducts.length}} Productos</span>
                    </div>
                    <div class="level-right"> 
                        <Download :products="filteredProducts" title="Descargar" klass="level-item"/>
                        <DropMenuFilter @filter="filter" :defaults="filters" klass="level-item"/>
                    </div>
                </div>

                <table id="products" class="table is-hoverable is-fullwidth" >
                  <tbody>
                  <tr v-for="(product,index) in filteredProducts"  class="product">
                    <td>{{ product.price }}</td>
                    <td>
                      <a 
                        target="_blank" 
                        rel="nofollow" 
                        v-html="product.htmlTitle" 
                        :href="product.url" 
                        :title="product.original_title"></a>
                      <span class="has-text-weight-bold is-size-7" v-if="product.photo">Foto</span>
                      <!-- <span class="tag">{{product.site}}</span> -->
                      <span class="is-phone">{{ product.phones }}</span>
                    </td>
                    <td class="has-text-right">
                    </td>
                    <td class="has-text-right is-hidden-mobile">
                        <a href="#" @click="toggleHide(product.id,index)" title="Oculta el producto del listado">
                            <span :class="isHidden(product.id) ? 'has-text-success' : 'has-text-danger' ">&times;</span>
                        </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
                
                <div class="is-centered" v-if="show === 'all'"> 
                  <a class="button is-success is-outlined is-hidden-mobile" @click="next">Vamos por más</a>
                  <a class="button is-success is-hidden-tablet is-fullwidth is-radiusless" @click="next">Vamos por más</a>
                </div>
                
            </div>
            <div class="notification has-text-centered is-size-5" v-else>
              No hay resultados para mostrar.
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby';
import DropMenuFilter from '~/components/DropMenuFilter';
import Download from '~/components/Download';
import Navbar from '~/components/Navbar';
var store = require('store');

export default {
    components: {
        'DropMenuFilter': DropMenuFilter,
        'Download': Download,
        'Navbar': Navbar,
    },
  head () {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top',
      }      
    }
  },
  data(){
    return {
      // q: '',
      p: 1,
      products: [],
      hides: [],
      favorites: [],
      filters: { 
          byTitle: false,
          byPhone: false,
          byPhoto: false,
          byPrice: '1-1000000000'
      },
      show: 'all',
      showInfo: false,
      uniques: true
    }
  },
  created() {
    this.hides = store.get('hides',[]);
    this.showInfo = (this.hides.length > 0);
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
    }
  },
  computed: {
    q: function() {
      return this.$route.query.q;
    },
    filteredProducts: function() {
      var vm = this,
          products = vm.products,
          [priceMin, priceMax] = vm.filters.byPrice.split('-');

      if (vm.uniques) {
        products = uniqBy(products, (p) => {
          return p.price + p.title.replace(/[^a-zA-Z0-9]/,'') + p.phones;
        })
      }

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
        let words = this.q.trim().replace(/\s+/,'|').trim();
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

      this.$router.push({ 
        path: this.$route.path, 
        query: { q: this.q }
      });

      // const sites = [  'revolico', 'timbirichi', '1cuc' ];
      const sites = [  'bachecubano', 'revolico', 'porlalivre', 'timbirichi', '1cuc' ];

      await Promise.all( sites.map( async (site) => {

        let vm = this;

        this.$axios
            .$get('https://unclic.pro/.netlify/functions/'+ site +'?q=' + this.q + '&p=' + this.p)
            // .$get('/.netlify/functions/'+ site +'?q=' + vm.q + '&p=' + vm.p)
            .then( response => { 
              // let products = response.each( el => {
              response.forEach( async el => {

                let urlFnPhone = 'https://unclic.pro/.netlify/functions/phone' + '?url=' + el.url;
                // let urlFnPhone = '/.netlify/functions/phone' + '?url=' + el.url;

                let product = Object.assign( el, { 
                  site: site, 
                  htmlTitle: el.title.replace( vm.reQuey, "<b>$&</b>" ),
                  phones: (el.phones === "" && site !== 'bachecubano') ? await vm.$axios.$get(urlFnPhone) : el.phones,
                  is_favorite: false        
                }) 

                vm.products.push( product );

              });

            });

      }));


    },

    

  }
  // and more functionality to discover

}
</script>