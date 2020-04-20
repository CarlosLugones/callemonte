<template>
  <div class="text-center mt-3 mb-5">
    <div class="mb-3"><b>Si te gustó Callemonte compártelo y corre la bola.</b></div>
    <social-sharing url="https://callemonte.com/" title="Callemonte. Buscador de clasificados" description="Busca clasificados en los sitios de Cuba y ahorra tus datos" inline-template>  
      <div class="d-flex justify-content-center">
        <network network="twitter" class="mr-4" style="cursor: pointer;">
            <img width="32" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" title="Twitter" att="Twitter"/> 
        </network> 
        <network network="facebook" class="mr-4" style="cursor: pointer;">
          <img width="32" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" title="Facebook" att="Twitter"/> 
        </network>                        
        <network network="telegram" class="mr-4" style="cursor: pointer;">
          <img width="32" src="https://unpkg.com/simple-icons@latest/icons/telegram.svg" title="Telegram" att="Twitter"/> 
        </network>     
        <network network="whatsapp" style="cursor: pointer;">
          <img width="32" src="https://unpkg.com/simple-icons@latest/icons/whatsapp.svg" title="Whatsapp" att="Twitter"/> 
        </network>     
      </div>    
      </social-sharing>  
  </div>
</template>
<script>
import {  FacebookIcon, TwitterIcon, MailIcon }  from 'vue-feather-icons'

export default {
  components: { FacebookIcon, TwitterIcon, MailIcon },  
}
</script>