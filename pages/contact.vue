<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 "> 
          <h1 class="title mt-5">
            <a :href="prevPath" title="Regresar a la búsqueda">&#8249;</a>
            Contacto
          </h1>
          <p class="lead">Escribeme si tienes alguna sugerecia, ecuentras algún error o solo para felicitarme que también me gusta. Te responde en cuanto me conecte. </p>
          <form name="contact0" method="POST" netlify-honeypot="bot-field" data-netlify="true" v-on:submit="validate" novalidate>
            <p class="d-none">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>            
            <div class="form-group">
              <label class="label">Correo Electronico</label>
              <input class="form-control" type="email" placeholder="Text input" name="email" v-model="email" :class="errors.email && 'is-invalid'">
            </div>

            <div class="form-group">
              <label class="label">Mensaje</label>
              <textarea class="form-control" placeholder="Textarea" name="message" rows="5" v-model="msg"></textarea>
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
    validate(e){

      this.errors = [];
      let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let minLengthMsg = 25;

      if (!this.email && !reEmail.test( String(this.email).toLowerCase() ) ) {
        this.errors.push({ email: 'Escriba una dirección de correo válida.'});
      }
      if (!this.msg && (this.msg.length < minLengthMsg) ) {
        this.errors.push({ msg: 'Escriba un mensaje de al menos ' + minLengthMsg + 'caracteres.'});
      }
      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();  
    }
  }
}
</script>