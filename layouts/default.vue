<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 ">    
        <nuxt/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      q: null,
    }
  },
	created() {
    this.q = this.$route.query.q;
  },
  methods: {
    search(evt) {
        evt.preventDefault();
        this.$router.push("/search?q="+this.q);
    }          
  }    
}
</script>

