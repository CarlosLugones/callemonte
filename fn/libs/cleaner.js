module.exports = (str) => {
	const reBlackList = /oferton|ganga|vendo|se vende(n)?|llame ya|llama ya|llama(r)? (al)?|llame ahora/ig;
	const reAllow = /[^a-zA-Z0-9\s\+\-\\áéíóúÁÉÍÓÚÑñ]/ig;
	const reRepetition = /(.)\1{2,}/ig;
	// const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;
	const rePhone = /(\+?53)?\s?(\d[\s-]?){8}/g;

	return str
			.replace(rePhone,'')
			.replace(reBlackList,'')
			.replace(reAllow,' ')
			.replace(reRepetition,'$1')
			.trim();
}