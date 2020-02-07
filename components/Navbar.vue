<template>
  <div>
      <nav class="bg-gray fixed-top py-3"> 
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="d-flex">
                <div class="form-group w-100 m-0" >
                  <input class="form-control mr-sm-2 border-0 rounded-0 form-control-lg"
                    id="searchInput"
                    placeholder="¿Que quieres comprar?" 
                    v-model="input"
                    v-on:keypress.enter="onSearch" 
                    ></input>
                </div>
                <span>
                  <Download klass="btn btn-link btn-lg px-2 border-0 text-dark" title="&darr;" :products="products" v-if="products.length > 0">
                    <download-icon></download-icon>
                  </Download>
                </span>
                <span>
                  <a class="btn btn-link btn-lg px-2 text-dark border-0" href="#" v-b-modal.modal-filter
                    title="Filtros" 
                    v-if="products.length > 0">
                    <filter-icon></filter-icon>
                  </a>
                </span>
                <span>
                  <a class="btn btn-link btn-lg px-2 pl-2 pr-0" href="#" v-b-modal.modal-menu  title="callemonte.com - Opciones">
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
<!--           <li class="list-group-item">
            <label class="form-group d-flex" v-for="(range, label ,index) in pricesRanges">
              <span class="flex-grow-1">{{label}}</span> 
              <b-form-radio
                :id="'pricerange'+index"
                v-model="filters.byPrice"
                name="price-range"
                :value="range"
              />              
            </label>
          </li> -->
<!--           <li class="list-group-item">
            <div class="form-group row">
              <label for="staticEmail2" class="col-form-label col">Precio Mínimo</label>
              <div class="col"> 
              <input type="text" class="form-control" id="staticEmail2" >
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword2" class="col-form-label col">Precio Máximo</label>
              <div class="col"> 
                <input type="password" class="form-control" id="inputPassword2" >
              </div>
            </div>
          </li> -->
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
      input: '',
      q: '',
      pmin: 2,
      pmax: '',
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
    let { q, pmin, pmax } = this.$route.query;
    this.input = q ;
    this.input = (pmin ) ? this.input + ' >' + pmin : this.input; 
    this.input = (pmax ) ? this.input + ' <' + pmax : this.input;
    this.onSearch();
  },
  methods: {
    onSearch() {
      let reMaxPrice = /<\s*(\d+)/;
      let reMinPrice = />\s*(\d+)/;
      let input = this.input;

      this.pmax = reMaxPrice.test(input) ? input.match(reMaxPrice)[1] : '';
      this.pmin = reMinPrice.test(input) ? input.match(reMinPrice)[1] : '';    
      this.q = input.replace(reMinPrice,'').replace(reMaxPrice,'').trim();

      if ( parseInt(this.pmin) < parseInt(this.pmin)) {
        this.pmax = '';
      }

      if (this.q.length > 0) {
        this.$emit('search', this.q, this.pmin, this.pmax);
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