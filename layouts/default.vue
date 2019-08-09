<template>
  <div> 
      <nuxt/>
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

