<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8"> 
		<a href="/" class="d-flex justify-content-center align-items-center mt-5">
            <span>
              <img src="/logo.png" width="40">
            </span>
            <h1 class="ml-2">CALLEMONTE</h1>
		</a>
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
