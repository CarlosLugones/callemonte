<template>
	<a href="#" @click="download" :class="klass" v-html="title" title="Descargar Listado (TXT)"></a>
</template>

<script>

export default {
	props: ['products','title','klass'],
	data() {
		return { label: ''}
	},
	methods: {
	    download: function() {
			let element = document.createElement('a'),
			d = new Date(),
			formatted_date = `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()} ${d.getHours()}H${d.getMinutes()}m`,
			filename = `callemonte.com ${formatted_date}.txt`,
			text = this.products
			    .filter( (p) => { return p.phones})
			    .map( p => `${p.url}\n${p.price}\t${p.title}\n\t${p.phones}`)
			    .join("\n\n");

	      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	      element.setAttribute('download', filename);

	      element.style.display = 'none';
	      document.body.appendChild(element);

	      element.click();

	      document.body.removeChild(element);
	    }  		
	}
}
</script>