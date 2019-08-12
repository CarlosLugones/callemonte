<template>
  <div>
      <b-navbar fixed="top" variant="light">
        <div class="container"> 
          <b-navbar-brand href="/">
              <img src="/logo.png" title="callemonte.com" width="38" height="38" >
          </b-navbar-brand>
          <form class="navbar-form navbar-left d-inline w-100" role="search" v-on:submit.prevent="search">
            <b-form-input 
              id="searchInput"
              class="mr-sm-2" 
              placeholder="¿Que quieres comprar?" 
              v-model="q" 
              ></b-form-input>
          </form>
          <b-navbar-nav>
<!--             <span class="nav-link">
              <b-button variant="outline-secondary" class="my-2 my-sm-0" type="button">&darr;</b-button>
            </span> -->
            <Download klass="nav-link pl-3 pr-3 icon" title="&darr;" :products="products" v-if="products.length"/>
            <b-nav-item href="#"  
              
              @click="$bvModal.show('modal-1')" 
              title="Menu de Filtros y Páginas" 
              class="icon">≡</b-nav-item>
          </b-navbar-nav>

        </div>
      </b-navbar>

      <b-modal 
        centered  
        hide-footer 
        return-focus="#searchInput"
        id="modal-1" 
        title="Opciones" 
        size="sm" 
        body-class="p-0" 
        footer-class="mt-0 border-0" 
        content-class="rounded-0">
        <b-list-group class="list-group-flush">


          <b-list-group-item >
            
            <label class="form-group d-flex">
              <span class="flex-grow-1">Con el texto en el Título</span> 
              <b-form-checkbox id="chk1" v-model="filters.byTitle" name="title" value="accepted" @change="$emit('filter',f)" switch/>        
            </label>

            <label class="d-flex mb-0">
              <span class="flex-grow-1">Solo con Fotos</span> 
              <b-form-checkbox id="chk2" v-model="filters.byPhoto" name="photos" value="accepted" switch />
            </label>

          </b-list-group-item>

          <b-list-group-item >
            <label class="form-group d-flex" v-for="(range, label ,index) in pricesRanges">
              <span class="flex-grow-1">{{label}}</span> 
              <b-form-radio
                :id="'pricerange'+index"
                v-model="filters.byPrice"
                name="price-range"
                :value="range"
              />              
            </label>
          </b-list-group-item>

          <b-list-group-item class="text-center"> 
            <nuxt-link to="/about">Nosotros</nuxt-link>
          </b-list-group-item>

          <b-list-group-item class="text-center"> 
            <nuxt-link to="/contact">Contacto</nuxt-link>
          </b-list-group-item>

        </b-list-group>
       
      </b-modal>      
  </div>
</template>
<script>
import Download from './Download';

export default {
  components: { 'Download': Download },
  props: ['filters','products', 'page'],
  data(){
    return {
      q: '',
      pricesRanges : {
          'Mayor de 1 CUC': '2',
          '2-100 CUC': '2-100',
          '50-150 CUC': '50-150',
          '100-200 CUC': '100-200',
          '250-500 CUC': '250-500',
          '2000-5000 CUC': '2000-5000' ,
          'Todos':'1', 
      },
      f: this.filters, 
    }
  },
  mounted() {
    this.q = this.$route.query.q;
  },
  computed: {
    p: function(){
      return this.page
    }
  },
  watch: {
    p: function() {
      this.search();
    }
  },
  methods: {
    search() {
        this.$emit('search');
        this.$router.push({ path: 'search', query: { q: this.q, p: this.p } })
    }            
  }    
}
</script>