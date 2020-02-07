<template>
  <section class="vertical-center m-0 bg-white">
      <div class="container ">
        <div class="row justify-content-center text-center">
          <div class="col-md-6">
            <div class="d-flex justify-content-center align-items-center">
              <span>
                <img src="/logo.png" width="40">
              </span>
              <h1 class="ml-2">CALLEMONTE</h1>
            </div>
            <div class="lead mb-5 mt-2">Buscador de clasificados en Cuba</div>

            <div class="input-group mb-3">
              <!-- <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"> -->
                <input 
                  autofocus
                  class="form-control form-control-lg" 
                  type="text" 
                  placeholder="¿Que quieres comprar?" 
                  name="input"  
                  v-model="input" 
                  @keyup.enter="search" >
              <div class="input-group-append">
                <button class="btn btn-success" type="button" @click="search">
                  <SearchIcon></SearchIcon>
                </button>
              </div>
            </div>
                 
              <div class="form-group">
                <a href="https://notificon.com" class="btn btn-link text-dark" target="_blank" ><b>Alertas</b></a>
                <nuxt-link to="/about" class="btn btn-link text-secondary">Nosotros</nuxt-link>
                <nuxt-link to="/contact" class="btn btn-link text-secondary">Contacto</nuxt-link>
                <a href="https://medium.com/callemonte" target="_blank" class="btn btn-link text-secondary">Blog</a>
              </div>                    
            
          </div>
        </div>
            
      </div>
  </section>
</template>

<script>
import { SearchIcon } from 'vue-feather-icons'
export default {
  layout: 'home',
  components: { SearchIcon },
  data(){
    return {
      input: ''
    }
  },  
  methods: {
    search() {
      let reMaxPrice = /<\s*(\d+)/;
      let reMinPrice = />\s*(\d+)/;
      let input = this.input;

      let pmax = reMaxPrice.test(input) ? input.match(reMaxPrice)[1] : '';
      let pmin = reMinPrice.test(input) ? input.match(reMinPrice)[1] : '';    
      let q = input.replace(reMinPrice,'').replace(reMaxPrice,'').trim();   

      if ( this.input.length > 0 ) {
        this.$router.push({ path: '/search', query: { q: q, pmin: pmin, pmax: pmax } });
      }
    }            
  }  
}
</script>
