<template>
  <div>
    <Navbar />  
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">    
          <nuxt/>
          <footer class="text-center">
            <nuxt-link to="/" class="">Inicio</nuxt-link>
            <span class="text-secondary mx-2">&bull;</span>
            <nuxt-link to="/about" class="">Nosotros</nuxt-link>
            <span class="text-secondary mx-2">&bull;</span>
            <nuxt-link to="/contact" class="">Contacto</nuxt-link>
            <span class="text-secondary mx-2">&bull;</span>
            <a href="https://medium.com/callemonte" target="_blank" class="">Blog</a>            
          </footer>          
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import Navbar from '~/components/Navbar';
export default {
  components: { Navbar },
}
</script>

