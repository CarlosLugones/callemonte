<template>
  <section class="jumbotron vertical-center m-0 bg-white">
      <div class="container justify-content-center text-center">
            <img src="/unclic.png" width="90px">
            <h1 >CALLEMONTE</h1>
              <h2 class="mb-3">Buscador de clasificados en Cuba</h2>
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
                  <button class="btn btn-outline-success btn-lg" @click="search">Buscar Anuncios </button>
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
