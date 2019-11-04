<template>
  <section class="jumbotron jumbotron-fluid vertical-center m-0 bg-white">
      <div class="container ">
        <div class="row justify-content-center text-center">
          <div class="col-md-6">
            <img src="/logo.png" width="60">
            <h1 >
              CALLEMONTE
            </h1>
              <p class="`lead mb-3">Buscador de clasificados en Cuba</p>
              <div class="form-group">
                <input 
                  autofocus
                  class="form-control form-control-lg" 
                  type="text" 
                  placeholder="¿Que quieres comprar?" 
                  name="q"  
                  v-model="q" 
                  @keyup.enter="search" >
              </div>

              <div class="form-group">
                  <button class="btn btn-outline-success btn-md" @click="search">Buscar Anuncios </button>
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
export default {
  layout: 'home',
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
