<template>
  <div>
      <nav class="bg-gray fixed-top py-3"> 
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-10">
              <div class="d-flex">
                <div class="form-group w-100 m-0" >
                  <input class="form-control mr-sm-2 border-0"
                    id="searchInput"
                    placeholder="¿Que quieres comprar?" 
                    v-model="q"
                    v-on:keypress.enter="onSearch" 
                    ></input>
                </div>
                <span>
                  <Download klass="btn btn-link px-2 border-0 text-dark" title="&darr;" :products="products" v-if="products.length > 0">
                    <download-icon></download-icon>
                  </Download>
                </span>
                <span>
                  <a class="btn btn-link px-2 text-dark border-0" href="#"  
                    @click="$bvModal.show('modal-filter')" 
                    title="Filtros" 
                    v-if="products.length > 0">
                    <filter-icon></filter-icon>
                  </a>
                </span>
                <span>
                  <a class="btn btn-link px-2 pl-2 pr-0" href="#" @click="$bvModal.show('modal-menu')" title="callemonte.com - Opciones">
                      <img src="/logo.png" width="25" height="25">
                  </a>
                </span>

              </div> 
              
            </div>
          </div>

        </div>
      </nav>

      <b-modal 
        centered  
        hide-header 
        hide-footer 
        id="modal-filter" 
        title="Opciones" 
        size="sm" 
        body-class="p-0" 
        footer-class="mt-0 border-0 bg-light" >
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
        id="modal-menu" 
        size="sm" 
        body-class="p-0" 
        footer-class="mt-0 border-0">

        <b-list-group class="list-group-flush">

          <b-list-group-item class="text-center"> 
            <nuxt-link to="/">Inicio</nuxt-link>
          </b-list-group-item>          

          <b-list-group-item class="text-center"> 
            <nuxt-link to="/about">Nosotros</nuxt-link>
          </b-list-group-item>

          <b-list-group-item class="text-center"> 
            <nuxt-link to="/contact">Contacto</nuxt-link>
          </b-list-group-item>            

          <b-list-group-item class="text-center"> 
            <a href="https://medium.com/callemonte" target="_blank">Blog</a>
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
      if (this.q.length > 0) {
        this.$emit('search',this.q);
      } else {
        this.$bvModal.msgBoxOk('Escriba que quiere comprar',{ size: 'sm', footerClass: 'p-2 border-0'})
      }
    }            
  }    
}
</script>