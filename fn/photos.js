import fetch from "node-fetch";
var cheerio = require('cheerio');   

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters
    var phones,photos = [];

    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load( body );

	if ( /revolico/.test(url) ) {
        photos = $('[data-cy="zoomAdImage"]').map( (i,el) => $(el).attr('href') ).get();
        phones = $('[data-cy="adPhone"]').text().replace(/\s/g,'').split(',');
	}

    if ( /porlalivre/.test(url) ) {
        photos = $('.img-thumbnail').map( (i,el) => 'https://porlalivre.com' + $(el).attr('href') ).get();
        phones = $('.contact-info').text().match(/\d{8}/g) || []
    }

    if ( /1cuc/.test(url) ) {
        photos = $('a[data-lightbox]').map( (i,el) => 'https:' + $(el).attr('href') ).get();
        phones = ($('[itemprop="description"]').text().match(/\d{8}/g) || []).filter((value, index, el) => el.indexOf(value) === index);
    }            

    if ( /timbirichi/.test(url) ) {
        photos = $('.anuncio-list-fotos .myfancybox').map( (i,el) => $(el).attr('href') ).get();
        phones = $('[href^="tel:"]').first().text().replace(/\s/g,'').split();
    }

    if ( /bachecubano/.test(url) ) {
        photos = $('.item-slider > li > a').map( (i,el) => $(el).attr('href') ).get();
        phones = $('[href^="tel:"]').first().text().replace(/\D/g,'');
    }        

    if ( /merolico/.test(url) ) {
        photos = $('a[data-fancybox-href]').map( (i,el) => $(el).attr('data-fancybox-href') ).get();
        phones = $('[href^="tel:"]').first().text().replace(/[\s\(\)]/g,'').split();
    }

    let data = {
        photos: photos.map( el => `https://callemonte.com/.netlify/functions/image?url=${el}`),
        phones: phones
    }
    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( data )
    };
}