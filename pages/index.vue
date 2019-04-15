<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth has-text-centered">
            <h1 class="title is-center has-text-primary">
              UNCLIC
            </h1>
            <h2 class="subtitle">
              Buscador de clasificados en <i>revolico, porlalivre, bachecubano, 1cuc, timbirichi</i>
            </h2>
              <div class="field">
                <div class="control">
                  <input 
                    autofocus
                    class="input is-primary is-large " 
                    type="text" 
                    placeholder="¿Que quieres comprar?" 
                    name="q"  
                    v-model="q" 
                    @keyup.enter="search" >
                </div>
              </div>                    

              <div class="field">
                <div class="control has-text-centered">
                  <button class="button is-large has-text-grey" @click="search">Buscar Anuncios </button>
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
