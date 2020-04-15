<template>
  <div>
      <nav class="bg-gray fixed-top py-3"> 
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="d-flex align-items-center">
                <div class="form-group w-100 m-0" >
                  <input class="form-control mr-sm-2 border-0"
                    id="searchInput"
                    placeholder="¿Que quieres comprar?" 
                    v-model="q"
                    v-on:keypress.enter="search" 
                    ></input>
                </div>
                <Filters/>
                <Menu/>
           
<!--                 <span>
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
                </span> -->
<!--                 <span>
                  <a class="ml-2" href="#" v-b-modal.modal-menu  title="callemonte.com - Opciones">
                      <img src="/favicon-32x32.png">
                  </a>
                </span> -->
              </div> 
            </div>
          </div>
        </div>
      </nav>

<!--       <b-modal centered hide-header hide-footer id="modal-filter" ref="modal-filter" title="Opciones" size="sm" body-class="p-0" footer-class="mt-0 border-0 bg-light" >
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

        </ul>

        <button class="btn btn-link btn-block p-3" @click="close('modal-filter')">Cerrar</button>

      </b-modal>    -->

      <b-modal centered hide-footer hide-header id="modal-menu" size="sm" body-class="p-0" content-class="border-0">

        <div class="text-center font-weight-bold">
            <nuxt-link to="/" class="d-block py-2">Inicio</nuxt-link>
            <nuxt-link to="/about" class="d-block py-2">Nosotros</nuxt-link>
            <nuxt-link to="/contact" class="d-block py-2">Contacto</nuxt-link>
            <a href="https://medium.com/callemonte" target="_blank" class="d-block py-2">Blog</a>
        </div>

      </b-modal>   

  </div>
</template>
<script>
import Filters from './Filters';
import Menu from './Menu';

import Vue from 'vue'
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

export default {
  components: { Filters, Menu, ModalPlugin },
  // props: ['filters','products', 'page'],
  data(){
    return {
      q: '',
    }
  },
  mounted() {
    this.q = this.$route.query.q ;
  },
  methods: {
    search() {
      if ( this.q.length > 0 ) {
        this.$router.push({ 
          path: '/search', 
          query: { ...this.$route.query, q: this.q } 
        })
      } else {
        this.$bvModal.msgBoxOk('Escriba que quiere comprar',{
          size: 'sm',
          contentClass: 'text-center',
          footerClass: 'border-0 justify-content-center'
        })
      }
    },
    close(ref) {
      this.$refs[ref].hide();
    }           
  }    
}
</script>