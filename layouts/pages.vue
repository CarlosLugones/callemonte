<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">    
        <nuxt/>
		<Social/>
      </div>
    </div>
  </div>
</template>
<script>
import Social from '~/components/Social';
export default {
	components: { Social }
}
</script>
