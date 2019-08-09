<template>
  <section class="jumbotron vertical-center m-0 bg-white">
      <div class="container ">
        <div class="row justify-content-center text-center">
          <div class="col-md-6">
            <img src="/unclic.png" width="90px">
            <h1 >CALLEMONTE</h1>
              <p class="`lead mb-3">Buscador de clasificados en Cuba</p>
              <div class="form-group">
                <input 
                  autofocus
                  class="form-control form-control-lg" 
                  type="text" 
                  placeholder="¿Que quieres comprar?" 
                  name="q"  
                  v-model="q" 
                  @keyup.enter="search()" >
              </div>

              <div class="form-group">
                  <button class="btn btn-outline-success btn-md" @click="search">Buscar Anuncios </button>
              </div>                    
              <div class="form-group">
                <nuxt-link to="/about" class="btn btn-link text-secondary">Nosotros</nuxt-link>
                <nuxt-link to="/contact" class="btn btn-link text-secondary">Contacto</nuxt-link>
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
      q: null
    }
  },  
  methods: {
    search() {
        this.$router.push("/search?q="+this.q);
    }            
  }  
}
</script>
