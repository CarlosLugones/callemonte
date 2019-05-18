<template>
  <div>
      
    <nav class="navbar is-fixed-top is-white" role="navigation" aria-label="main navigation">
        <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item text-logo" href="/">
            <img src="/logo.png" title="UNCLIC">
          </a>
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control">
                <input 
                    autofocus
                    class="input" 
                    type="text" 
                    placeholder="¿Que quieres comprar?" 
                    v-model="q"  
                    @keyup.enter="search">
                <!-- <button class="button has-text-dark">Buscar</button> -->
              </div>
            </div>
            
          </div>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <div class="navbar-item">
              <a 
                v-if="products.length" 
                class="button  is-light" 
                @click="download"
                title="Descargar Listado de Productos">
                Descargar &darr;
              </a>
            </div>
<!--             <a 
              href="/about"
              class="navbar-item" 
              title="Descargar Listado de Productos">
              &bull;&bull;&bull;
            </a> -->
            <!-- <Menu /> -->
          </div> 
        </div>
      </div>
    </nav>
    <div id="main"> 
      <div class="container">
        <div class="columns is-centered">
          <div class="column"> 
            <div class="level "> 
                  <ul class="level-left is-size-7 is-uppercase">
                    <li class="level-item ">
                    <label> 
                      <input type="checkbox" name="" v-model="uniques" > Ocultar repetidos
                    </label>                
                    </li>
                    <li class="level-item">
                      <label> 
                        <input type="checkbox" id="in-title" v-model="inTitle" > Buscar en el título
                      </label>                
                    </li>
                    <li class="level-item">
                      <label> 
                        <input type="checkbox" id="in-title" v-model="withPhone" > Con teléfono
                      </label>                
                    </li>
                    <li class="level-item">
                      <label> 
                        <input type="checkbox" name="" v-model="withPhoto" > Con fotos
                      </label>
                    </li>
                  </ul>
            </div>
            <table id="products" class="table is-hoverable is-fullwidth">
              <tbody>
              <tr v-for="product in filteredProducts"  class="product">
                <td><b class="price">{{ product.price }}</b></td>
                <td>
                  <a :href="product.url"  target="_blank" class="product-title" v-html="product.htmlTitle" :title="product.original_title"></a>
                  <span class="has-text-danger is-size-7" v-if="product.photo">Foto</span>
                  <span class="tag is-light">{{product.site}}</span>
                </td>
                <td class="has-text-right"><b>{{ product.phones }}</b></td>
              </tr>
              </tbody>
            </table>
            <div > 
              <a v-if="products.length" class="button is-medium is-fullwidth " @click="next">Más Anuncios &darr; </a>
            </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import uniqBy from 'lodash.uniqby';
import Menu from '~/components/Menu';

export default {
    components: {
    Menu,
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
      q: '',
      p: 1,
      products: [],
      inTitle: true,
      withPhone: false,
      withPhoto: false,
      priceGeaterOne: false,
      uniques: true
    }
  },
  created() {
    this.q = this.$route.query.q;
    this.search()
  },
    watch: {
      // whenever question changes, this function will run
      q: function (newQ, oldQ) {
        if (newQ != oldQ) {
          this.products = [];
        }
      }
  },
  computed: {
    filteredProducts: function() {
      var vm = this,
          products = vm.products;

      if (vm.uniques) {
        products = uniqBy(products, (p) => {
          return p.price+ p.title.replace(/[^a-zA-Z0-9]/,'')+p.phones;
        })
      }

      return products
        // .sort( (p1,p2) => p1.price > p2.price ) // ordenar por precio
        .filter( function( p ) {
          let condition1 = vm.inTitle ? vm.reQuey.test(p.title) : true
          let condition2 = vm.priceGeaterOne ? p.price > 1 : p.price > 0
          let condition3 = vm.withPhoto ? p.photo : true
          let condition4 = vm.withPhone ? p.phones : true
          return condition1 && condition2 && condition3 && condition4;
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

    search: async function() {
      this.$router.push({path: this.$route.path, query: { q: this.q }});

      const sites = [  'bachecubano', 'revolico', 'porlalivre', 'timbirichi', '1cuc' ];

      await Promise.all( sites.map( async (site) => {

        let res = await this.$axios.$get('https://unclic.now.sh/'+ site +'?q=' + this.q + '&p=' + this.p);

        for (let p of res ) {
          p.site = site;
          p.htmlTitle = p.title.replace( this.reQuey, "<b>$&</b>" );
        }
        this.products = this.products.concat( res );

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