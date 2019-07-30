<template>
  <div>

    <div id="main"> 
      <div class="container">
        <div class="columns is-mobile">
            <div class="column is-2 is-hidden-mobile">
                <div id="sidebar" class="is-pinned ">
                    <ul v-if="products.length>0 || favorites.length>0 || hides.length>0">
                        <li v-if="products.length>0">
                            <label class="radio">
                                <input type="radio" v-model="show" value="all"> 
                                <span :class="show ==='all' && 'has-text-weight-bold'">Todos</span> 
                                <span class="tag" >{{products.length}}</span>
                            </label>
                        </li>
                        <li v-if="favorites.length>0">
                            <label class="radio">
                                <input type="radio" v-model="show" value="favorites"> 
                                <span :class="show==='hidden' && 'has-text-weight-bold'">Favoritos</span>
                                <span class="tag" >{{favorites.length}}</span>
                            </label>
                        </li>
                        <li v-if="hides.length>0">
                            <label class="radio">
                                <input type="radio" v-model="show" value="hidden"> <span>Ocultos</span>
                                <span class="tag" >{{hides.length}}</span>
                            </label>
                        </li>
                     </ul>                    
                    <strong class="">Filtros</strong>
                    <ul class="">
                        <li class="">
                            <label class="checkbox">
                                <input type="checkbox" v-model="inTitle"> 
                                <span :class="inTitle && 'has-text-weight-bold'">Solo en el titulo</span>
                            </label>
                        </li>
                        <li class="">
                            <label class="checkbox">
                                <input type="checkbox" v-model="withPhone"> 
                                <span :class="withPhone && 'has-text-weight-bold'">Con Telefono</span>
                            </label>
                        </li>
                        <li class="">
                            <label class="checkbox">
                                <input type="checkbox" v-model="withPhoto"> 
                                <span :class="withPhoto && 'has-text-weight-bold'">Con Fotos</span>
                            </label>

                        </li>
                    </ul>               
                    <strong class="">Filtrar por Precio</strong>
                    <ul class="">
                        <li class="" v-for="range in pricesRanges">
                            <label class="radio">
                                <input type="radio" name="range" v-model="filterPrice" :value="range" > <span>{{range}}</span>
                            </label>
                        </li>
                    </ul>
                    <!-- <a href="#">Eliminar los Filtros</a> -->
                </div>
            </div>
            <div class="column">
                <table id="products" class="table is-hoverable is-fullwidth" v-if="filteredProducts > 0">
                  <tbody>
                  <tr v-for="(product,index) in filteredProducts"  class="product">
                    <td>
<!--                         <a href="#" 
                            @click="product.is_favorite = !product.is_favorite" 
                            title="Marcar el producto como favorito" 
                            :class="product.is_favorite ? 'has-text-warning' : 'has-text-grey-light' ">
                            <span >&#9733;</span>
                        </a> -->
                      {{ product.price }}
                    </td>
                    <td>
                      <a 
                        target="_blank" 
                        class="product-title" 
                        v-html="product.htmlTitle" 
                        :href="product.url"  
                        :title="product.original_title"></a>
                      <span class="has-text-weight-bold is-size-7" v-if="product.photo">Foto</span>
                      <span class="tag">{{product.site}}</span>
                    </td>
                    <td class="has-text-right">
                      <span class="is-phone">{{ product.phones }}</span>
                    </td>
                    <td>
                        <a href="#" @click="toggleHide(product.id,index)" title="Oculta este producto del listado">
                            <span :class="isHidden(product.id) ? 'has-text-success' : 'has-text-danger' ">&times;</span>
                        </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="notification has-text-centered is-size-5" v-else>
                  No hay resultados para mostrar.
                </div>
                <div class="is-centered" v-if="products.length > 0 && show === 'all'"> 
                  <a class="button is-success is-outlined" @click="next">Más Anuncios</a>
                </div>
            </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby';
import sotoCheck from '~/components/SotoCheck';
var store = require('store');

export default {
    components: {
        'soto-check': sotoCheck,
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
      pricesRanges : ['1-100','50-150','100-200','250-500','2000-5000' ],
      filterPrice: '1-1000000000',
      inTitle: false,
      withPhone: false,
      withPhoto: false,
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
          [priceMin, priceMax] = vm.filterPrice.split('-');

      if (vm.uniques) {
        products = uniqBy(products, (p) => {
          return p.price + p.title.replace(/[^a-zA-Z0-9]/,'') + p.phones;
        })
      }

      return products
        .filter( p => {
            let isHide = vm.hides.includes( p.id );
            return  (vm.inTitle ? vm.reQuey.test(p.title) : true) && 
                    ( p.price >= priceMin && p.price <= priceMax ) && 
                    ( vm.withPhoto ? p.photo : true ) && 
                    ( vm.withPhone ? p.phones : true ) && 
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
            // .$get('https://localhost:3300/'+ site +'?q=' + vm.q + '&p=' + vm.p)
            .then( response => { 
              let products = response.map( el => {

                return Object.assign( el, { 
                  site: site, 
                  htmlTitle: el.title.replace( vm.reQuey, "<b>$&</b>" ),
                  // phones: (el.phones !== null) ? el.phones.join(', ') : '',
                  is_favorite: false        
                }) 
              });

              vm.products = vm.products.concat( products );

            });

      }));


    },

    download: function() {
      let element = document.createElement('a'),
          text = '',
          filename = 'unclic.txt';

      text = this.filteredProducts
                .filter( (p) => { return p.phones})
                .map( p => p.price + ' ' + p.title  + ' ' + p.phones )
                .join("\r\n")

      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }      

  }
  // and more functionality to discover

}
</script>