<template>
	<div class="dropdown is-right is-hoverable" :class="klass">
	  <div class="dropdown-trigger" >
	    <a href="#" class="" aria-haspopup="true" aria-controls="dropdown-filter" @click="activate = !activate">
	      <span>Filtros &#9662;</span>
	    </a>
	  </div>

	  <div class="dropdown-menu" id="dropdown-filter" role="menu">
	    <div class="dropdown-content">

            <label class="checkbox dropdown-item">
                <input type="checkbox" v-model="f.byTitle" @change="$emit('filter',f)" > 
                <span :class="f.byTitle && 'has-text-weight-bold'">Buscar en el título</span>
            </label>

            <label class="checkbox dropdown-item">
                <input type="checkbox" v-model="f.byPhone" @change="$emit('filter',f)"> 
                <span :class="f.byPhone && 'has-text-weight-bold'">Con Telefono</span>
            </label>

            <label class="checkbox dropdown-item">
                <input type="checkbox" v-model="f.byPhoto" @change="$emit('filter',f)"> 
                <span :class="f.byPhoto && 'has-text-weight-bold'">Con Fotos</span>
            </label>

			<hr class="dropdown-divider">
				
            <label class="radio dropdown-item" v-for="(range, label) in pricesRanges">
                <input type="radio" name="range" v-model="f.byPrice" :value="range" @change="$emit('filter',f)"> <span>{{label}}</span>
            </label>

	    </div>
	  </div>
	</div>
</template>

<script>

export default {
	props: ['defaults','klass'],
	data(){
		return {
		  pricesRanges : {
		      'Todos':'1-1000000000', 
		      '2-100 CUC': '2-100',
		      '50-150 CUC': '50-150',
		      '100-200 CUC': '100-200',
		      '250-500 CUC': '250-500',
		      '2000-5000 CUC': '2000-5000' ,
		  },
		  f: this.defaults,
		}
	},
}
</script>