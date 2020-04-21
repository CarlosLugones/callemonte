<template>
    <div >
      <button class="btn btn-link text-white border-0" type="button"  @click.prevent="modalShow = true">
        <FilterIcon></FilterIcon>
      </button>

      <b-modal 
      	hide-header 
      	id="filters-modal" 
      	size="sm" 
      	content-class="border-0"
      	v-model="modalShow"
      	@show="open">

        <div class="">
        	<div class="row">
				<div class="form-group col">
					<label for="exampleInputEmail1">Precio Mínimo</label>
					<input type="text" class="form-control" v-model="filters.pmin">
				</div>        	
				<div class="form-group col">
					<label for="exampleInputEmail1">Precio Máximo</label>
					<input type="text" class="form-control" v-model="filters.pmax">
				</div>        	
        	</div>
			<div class="form-group">
				<label for="exampleInputEmail1">Provincia</label>
	            <select class="form-control" v-model="filters.province">
	            	<option v-for="[key,name] in Object.entries(provinces)" :value="key">{{name}}</option>
	            </select>
			</div>        	
        </div>
        <template v-slot:modal-footer class="p-1">
			<button class="btn btn-light mr-2"  @click.prevent="modalShow=false">Cancelar</button>
			<button class="btn btn-success" @click.prevent="apply">
				<b>Aplicar</b>
			</button>
        </template>
      </b-modal>  

    </div>     	
</template>
<script>
import { FilterIcon } from 'vue-feather-icons'	
export default {
	components: { FilterIcon },
	data() {
		return {
			modalShow: false,
			filters: { pmin: '', pmax:'', province:''},
			provinces: {
				'': 'Todas',
				'pinar-del-rio': 'Pinar del Rio',
				'la-habana': 'La Habana',
				'artemisa': 'Artemisa',
				'mayabeque': 'Mayabeque',
				'isla-de-la-juventud':'Isla de la Juventud',
				'matanzas': 'Matanzas',
				'cienfuegos': 'Cienfuegos',
				'villa-clara':'Villa Clara',
				'santi-spiritus':'Santi Spiritus',
				'ciego-de-avila': 'Ciego de Ávila',
				'camaguey':'Camagüey',
				'las-tunas':'Las Tunas',
				'holguin': 'Holguín',
				'granma':'Granma',
				'santiago-de-cuba':'Santiago de Cuba',
				'guatanamo':'Guatánamo',
			}
		}
	},
	methods: {
		open(){
			this.filters = { ...this.filters, ...this.$route.query }
		},
		apply() {
			if (this.filters.pmin<=	0) {
				this.filters.pmin=1
			}
	        this.$router.push({ 
	          path: '/search', 
	          query: this.filters
	        })
	        this.modalShow = false;
		}
	}

};
</script>