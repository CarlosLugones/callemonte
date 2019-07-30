<template>
  <section class="is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-one-fifth has-text-centered">
            <img src="/unclic.png" width="110px">
            <h1 class="title is-center text-logo" >
              UNCLIC
            </h1>
            <h2 class="title has-text-grey">
              Buscador de clasificados en Cuba</i>
            </h2>
              <div class="field">
                <div class="control">
                  <input 
                    autofocus
                    class="input is-primary is-medium" 
                    type="text" 
                    placeholder="¿Que quieres comprar?" 
                    name="q"  
                    v-model="q" 
                    @keyup.enter="search" >
                </div>
              </div>                    

              <div class="field">
                <div class="control has-text-centered">
                  <button class="button is-medium has-text-grey" @click="search">Buscar Anuncios </button>
                </div>
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
