<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 "> 
        <div class="text-center mt-5">
          <a href="/" class="">
          <img src="/logo.png" width="60">
          <h1>CALLEMONTE</h1>        
          </a>
        </div>          
          <h2 class="title mt-5">
            <a :href="prevPath" title="Regresar a la búsqueda">&#8249;</a>
            Contacto
          </h2>
          <p class="lead">Escribeme si tienes alguna sugerecia, ecuentras algún error o solo para felicitarme que también me gusta. Te responde en cuanto me conecte. </p>
          <form name="contact0" method="POST" action="/success" netlify-honeypot="bot-field" data-netlify="true" >
            <p class="d-none">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>            
            <div class="form-group">
              <label class="label">Correo Electronico</label>
              <input class="form-control" type="email" 
                name="email" 
                v-model="email" required>              
            </div>

            <div class="form-group">
              <label class="label">Mensaje</label>
              <textarea 
                class="form-control" 
                name="message" 
                rows="5" 
                v-model="msg"
                required 
                ></textarea>
            </div>

            <div class="control">
              <button class="btn btn-success" >Enviar &rarr;</button>
            </div>
            
          </form>

        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      prevPath: '',
      email: null,
      msg: null,
      errors: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevPath = from.fullPath
    })
  },
  methods: {
  }
}
</script>