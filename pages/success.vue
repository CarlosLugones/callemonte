<template>
  <section class="jumbotron vertical-center m-0 bg-white">
      <div class="container ">
        <div class="row justify-content-center text-center">
          <div class="col-md-4">
            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Gracias por el contacto.</h4>
              En cuanto me conecte te respondo ahora puedes <a href="/" class="alert-link">seguir buscando</a>. 
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
