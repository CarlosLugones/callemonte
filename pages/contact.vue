<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 "> 
          <h1 class="title mt-5">
            <a :href="prevPath" title="Regresar a la búsqueda">&#8249;</a>
            Contacto
          </h1>
          <p class="lead">Escribeme si tienes alguna sugerecia, ecuentras algún error o solo para felicitarme que también me gusta. Te responde en cuanto me conecte. </p>
          <form name="contact0" method="POST" netlify-honeypot="bot-field" data-netlify="true">
            <p class="d-none">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>            
            <div class="form-group">
              <label class="label">Correo Electronico</label>
              <input class="form-control" type="email" placeholder="Text input" name="email">
            </div>

            <div class="form-group">
              <label class="label">Mensaje</label>
              <textarea class="form-control" placeholder="Textarea" name="message" rows="5"></textarea>
            </div>

            <div class="control">
              <button class="btn btn-success" type="submit">Enviar &rarr;</button>
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
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(from)
      vm.prevPath = from.fullPath
    })
  },
}
</script>