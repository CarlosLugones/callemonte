<template>
<div>
  <b-modal id="modal-1" title="BootstrapVue" v-model="modalShow" centered > 
    <p class="my-4">Hello from modal!</p>
  </b-modal>
</div>

</template>

<script>
export default {
  data(){
    return {
      modalShow: true,
    }
  },
}
</script> 