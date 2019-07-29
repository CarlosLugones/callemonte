<template>
  <div id="main"> 
    <div class="container">
      <div class="columns is-centered ">
        <div class="column is-6 is-size-5"> 
          <h1 class="title">Contacto</h1>
          <p class="subtitle">Escribeme si tienes alguna sugerecia, ecuentras algún error o solo para felicitarme que también me gusta. Te responde en cuanto me conecte. </p>
          <form name="contact" netlify>
            <div class="field">
              <label class="label">Correo Electronico</label>
              <div class="control">
                <input class="input" type="email" placeholder="Text input">
              </div>
            </div>

            <div class="field">
              <label class="label">Mensaje</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea"></textarea>
              </div>
            </div>

            <div class="control">
              <button class="button is-primary" type="submit">Enviar &rarr;</button>
            </div>
            
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'default',
  head () {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top',
      }      
    }
  },
}
</script>