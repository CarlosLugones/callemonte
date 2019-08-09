<template>
  <section class="jumbotron vertical-center m-0 bg-white">
      <div class="container d-flex justify-content-center text-center">
        <div class="">
          <div class="">
            <img src="/unclic.png" width="90px">
            <h1 class="display-3" >
              CALLEMONTE
            </h1>
              <h2 class="mb-3">Buscador de clasificados en Cuba</h2>
              <div class="field">
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
              </div>                    

              <div class="field">
                <div class="control has-text-centered">
                  <button class="btn btn-outline-success btn-lg" @click="search">Buscar Anuncios </button>
                </div>
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
