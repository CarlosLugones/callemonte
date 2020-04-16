<template>
	<div class="">
	    <button class="btn btn-link text-dark border-0 p-0" type="button" v-b-modal.menu-modal >
	    	<MoreVerticalIcon></MoreVerticalIcon >
	    </button>

		<b-modal centered hide-footer hide-header id="menu-modal" size="sm" body-class="p-0" content-class="mt-0 border-0">

			<div class="text-center font-weight-bold">
	            <nuxt-link to="/" class="d-block py-2">
	            	<span>Inicio</span>
	            </nuxt-link>
	            <nuxt-link to="/about" class="d-block py-2">Nosotros</nuxt-link>
	            <nuxt-link to="/contact" class="d-block py-2">Contacto</nuxt-link>
<!-- 			    <a href class="d-block py-2">Ocultos</a>
			    <a href class="d-block py-2">Favoritos</a>
			    <a href class="d-block py-2">Todos</a>
 -->			</div>

		</b-modal>  

	</div>	
</template>
<script>
import { MoreVerticalIcon  } from 'vue-feather-icons'	
export default {
	components: { MoreVerticalIcon  },
};
</script>
