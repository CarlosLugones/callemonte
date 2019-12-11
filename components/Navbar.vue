<template>
  <div>
      <nav class="bg-gray fixed-top py-3"> 
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-8">
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
                  <a class="btn btn-link px-2 text-dark border-0" href="#" v-b-modal.modal-filter
                    title="Filtros" 
                    v-if="products.length > 0">
                    <filter-icon></filter-icon>
                  </a>
                </span>
                <span>
                  <a class="btn btn-link px-2 pl-2 pr-0" href="#" v-b-modal.modal-menu  title="callemonte.com - Opciones">
                      <img src="/logo.png" width="25" height="25">
                  </a>
                </span>
              </div> 
            </div>
          </div>
        </div>
      </nav>

      <b-modal centered hide-header hide-footer id="modal-filter" ref="modal-filter" title="Opciones" size="sm" body-class="p-0" footer-class="mt-0 border-0 bg-light" >
        <ul class="list-group list-group-flush p-0">
          <li class="list-group-item">
            <label class="form-group d-flex">
              <span class="flex-grow-1">Con el texto en el Título</span> 
              <b-form-checkbox id="chk1" v-model="filters.byTitle" name="title" value="accepted" @change="$emit('filter',f)" switch/>        
            </label>
            <label class="d-flex mb-0">
              <span class="flex-grow-1">Solo con Fotos</span> 
              <b-form-checkbox id="chk2" v-model="filters.byPhoto" name="photos" value="accepted" switch />
            </label>
          </li>
          <li class="list-group-item">
            <label class="form-group d-flex" v-for="(range, label ,index) in pricesRanges">
              <span class="flex-grow-1">{{label}}</span> 
              <b-form-radio
                :id="'pricerange'+index"
                v-model="filters.byPrice"
                name="price-range"
                :value="range"
              />              
            </label>
          </li>
        </ul>

        <button class="btn btn-link btn-block p-3" @click="close('modal-filter')">Cerrar</button>

      </b-modal>   

      <b-modal centered hide-footer hide-header id="modal-menu" size="sm" body-class="p-0" footer-class="mt-0 border-0">

        <div class="list-group list-group-flush text-center">
            <nuxt-link to="/" class="list-group-item list-group-item-action">Inicio</nuxt-link>
            <nuxt-link to="/about" class="list-group-item list-group-item-action">Nosotros</nuxt-link>
            <nuxt-link to="/contact" class="list-group-item list-group-item-action">Contacto</nuxt-link>
            <a href="https://medium.com/callemonte" target="_blank" class="list-group-item list-group-item-action">Blog</a>
        </div>

      </b-modal>   

  </div>
</template>
<script>
import Vue from 'vue'
import Download from './Download';
import { MenuIcon, FilterIcon, DownloadIcon } from 'vue-feather-icons'
import { BListGroup, BFormCheckbox, BFormRadio } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

export default {
  components: { Download, MenuIcon, FilterIcon, DownloadIcon, BListGroup, BFormCheckbox, BFormRadio },
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
  // computed: {
  //   p: function(){
  //     return this.page
  //   }
  // },
  // watch: {
  //   p: function() {
  //     this.onSearch();
  //   }
  // },
  methods: {
    onSearch() {
      if (this.q.length > 0) {
        this.$emit('search',this.q);
      } else {
        this.$swal('Escriba que quiere comprar');
      }
    },
    close(ref) {
      this.$refs[ref].hide();
    }           
  }    
}
</script>