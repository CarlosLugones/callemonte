<template>
    <nav class="d-flex fixed-bottom navbar-light py-2 bg-gray ">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
              <form class="form-inline">
			    <button class="btn btn-primary" type="button" v-b-modal.filter-menu ><MenuIcon size="1.4x"></MenuIcon></button>
			  </form>

				<b-modal centered hide-footer hide-header id="filter-menu" size="sm" body-class="p-0" content-class="mt-0 border-0">

					<div class="text-center font-weight-bold">
					    <a href class="d-block py-2">Ocultos</a>
					    <a href class="d-block py-2">Favoritos</a>
					    <a href class="d-block py-2">Todos</a>
					</div>

				</b-modal>  

          </div>
        </div>
      </div>
    </nav>
</template>
<script>
import {  MenuIcon } from 'vue-feather-icons'
export default {
  components: { MenuIcon },
}	
</script>