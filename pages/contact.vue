<template>
  <div id="main"> 
    <div class="container">
      <div class="columns is-centered ">
        <div class="column is-6 is-size-5"> 
          <h1 class="title">
            <a href="#" @click="back"><</a>
            Contacto
          </h1>
          <p class="subtitle">Escribeme si tienes alguna sugerecia, ecuentras algún error o solo para felicitarme que también me gusta. Te responde en cuanto me conecte. </p>
          <form name="contact0" method="POST" netlify-honeypot="bot-field" data-netlify="true">
            <p class="is-hidden">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>            
            <div class="field">
              <label class="label">Correo Electronico</label>
              <div class="control">
                <input class="input" type="email" placeholder="Text input" name="email">
              </div>
            </div>

            <div class="field">
              <label class="label">Mensaje</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea" name="message"></textarea>
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
  data() {
    return {
      back: this.$router.path
    }
  },
  head () {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top',
      }      
    }
  },
  methods: {
    back() {
      return this.$router.go(-1);
    }
  }
}
</script>