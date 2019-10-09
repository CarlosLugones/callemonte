<template>
  <div>
      <b-navbar fixed="top" variant="light">
        <div class="container"> 
          <b-navbar-brand href="/">
              <img src="/logo.png" title="callemonte.com" width="38" height="38" >
          </b-navbar-brand>

          <form class="navbar-form navbar-left d-inline w-100" role="search" v-on:submit.prevent="onSearch">
            <b-form-input 
              id="searchInput"
              class="mr-sm-2 border-0" 
              placeholder="¿Que quieres comprar?" 
              v-model="q" 
              ></b-form-input>
          </form>

          <b-navbar-nav>
            <li class="nav-item">
              <Download klass="nav-link" title="&darr;" :products="products" >
                <download-icon></download-icon>
              </Download>
            </li>
            <b-nav-item href="#"  
              @click="$bvModal.show('modal-filter')" 
              title="Opciones" 
              class="icon">
              <filter-icon></filter-icon>
            </b-nav-item>
            <b-nav-item href="#"  
              @click="$bvModal.show('modal-menu')" 
              title="Opciones" 
              class="icon">
              <menu-icon></menu-icon>
            </b-nav-item>
          </b-navbar-nav>

        </div>
      </b-navbar>

      <b-modal 
        centered  
        hide-header 
        hide-footer 
        return-focus="#searchInput"
        id="modal-filter" 
        title="Opciones" 
        size="sm" 
        body-class="p-0" 
        footer-class="mt-0 border-0 bg-light" 
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

        </b-list-group>
        <b-button variant="link" block class="p-3" @click="$bvModal.hide('modal-filter')">Cerrar</b-button>
      </b-modal>   

      <b-modal 
        centered  
        hide-footer 
        hide-header 
        return-focus="#searchInput"
        id="modal-menu" 
        size="sm" 
        body-class="p-0" 
        footer-class="mt-0 border-0" 
        content-class="rounded-0">

        <b-list-group class="list-group-flush">

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
import { MenuIcon, FilterIcon, DownloadIcon } from 'vue-feather-icons'

export default {
  components: { Download, MenuIcon, FilterIcon, DownloadIcon },
  props: ['filters','products', 'page'],
  data(){
    return {
      q: '',
      pricesRanges : {
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
    this.onSearch();
  },
  computed: {
    p: function(){
      return this.page
    }
  },
  watch: {
    p: function() {
      this.onSearch();
    }
  },
  methods: {
    onSearch() {
        this.$emit('search',this.q);
    }            
  }    
}
</script>