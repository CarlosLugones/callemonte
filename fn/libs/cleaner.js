module.exports = (str) => {
	const reBlackList = /oferton|ganga|vendo|vendo o cambio|se vende(n)?|llame ya|llama ya|llama(r)? (al)?|llame ahora|telf|ver fotos/ig;
	const reAllow = /[^a-zA-Z0-9\s\+\-\\áéíóúÁÉÍÓÚÑñ]/ig;
	const reRepetition = /(.)\1{2,}/ig;
	// const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;
	const rePhone = /(\+?53)?\s?(\d\s?){8}/g;
	let response = str
		.replace(rePhone,'')
		.replace(reBlackList,'')
		.replace(reAllow,' ')
		.replace(reRepetition,'$1')
		// .replace(/[^a-z0-9]+$/i,'')
		.replace(/^\W/i,'')
		.trim();

	return response.charAt(0).toUpperCase() + response.slice(1)			
}