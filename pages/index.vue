<template>
  <section class="jumbotron jumbotron-fluid vertical-center m-0 bg-white">
      <div class="container ">
        <div class="row justify-content-center text-center">
          <div class="col-md-6">
            <h1 class="d-flex justify-content-center">
              <img src="/logo.png" width="50">
              <span class="ml-2">CALLEMONTE</span>
            </h1>
            <h3 class="mb-5 mt-2">Buscador de clasificados en Cuba</h3>

            <div class="input-group mb-3">
              <!-- <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"> -->
                <input 
                  autofocus
                  class="form-control form-control-lg" 
                  type="text" 
                  placeholder="¿Que quieres comprar?" 
                  name="q"  
                  v-model="q" 
                  @keyup.enter="search" >
              <div class="input-group-append">
                <button class="btn btn-success" type="button" @click="search">
                  <SearchIcon></SearchIcon>
                </button>
              </div>
            </div>
                 
              <div class="form-group">
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
      q: ''
    }
  },  
  methods: {
    search() {
      if ( this.q.length > 0 ) {
        this.$router.push("/search?q="+this.q);
      }
    }            
  }  
}
</script>
