<template>
  <a 
    class="navbar-item" 
    title="Menu"
    @click=" isActive = true  ">
    &bull;&bull;&bull;

    <div class="modal" :class="{ 'is-active': isActive }" >
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <!-- <aside class="menu">  -->
          <ul class="menu-list">
            <li><a>Más Recientes primero</a></li>
            <li><a>Más Antiguos primero</a></li>
            <li><a>Más Antiguos primero</a></li>
            <li><a>Blog</a></li>
          </ul>
        <!-- </aside> -->
      </div>
      <button class="modal-close is-large" aria-label="close" @click="close"></button>
    </div>
  </a>
</template>
<script>
  export default {
    data() {
      return { isActive: false }
    },
    methods: {
      close() {
        alert('close')
        this.isActive = false
        console.log(this.isActive)
      }
    }
  }
</script>

