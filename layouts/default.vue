<template>
  <div>
    <nav class="navbar is-fixed-top is-white" role="navigation" aria-label="main navigation">
        <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item text-logo" href="/">
            <img src="/logo.png" title="UNCLIC">
          </a>

          <div class="navbar-item">
            <div class="field is-grouped">
	            <div class="control">
	                <input 
	                    autofocus
	                    class="input is-rounded" 
	                    type="text" 
	                    placeholder="¿Que quieres comprar?" 
	                    v-model="q"  
	                    @keyup.enter="search">
	            </div>
            </div>
          </div>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        
        <div class="navbar-menu">
          <div class="navbar-start">
          </div>
          <div class="navbar-end">
						<nuxt-link to="/about" class="navbar-item">Nosotros</nuxt-link>          
						<nuxt-link to="/contact" class="navbar-item">Contacto</nuxt-link>          
          </div> 
        </div>
      </div>
    </nav>
    <nuxt />
  </div>
</template>
<script>

export default {

  data(){
    return {
      q: null,
    }
  },
	created() {
    this.q = this.$route.query.q;
  },
  methods: {
    search() {
        this.$router.push("/search?q="+this.q);
    }            
  }    
}
</script>