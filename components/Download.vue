<template>
	<a href="#" @click="download" :class="klass">{{title}}</a>
</template>

<script>

export default {
	props: ['products','title','klass'],
	data() {
		return {label: ''}
	},
	methods: {
	    download: function() {
	      let element = document.createElement('a'),
	          filename = 'unclic.txt',
		      text = this.products
	                .filter( (p) => { return p.phones})
	                .map( p => p.price + ' ' + p.title  + ' ' + p.phones )
	                .join("\r\n");

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