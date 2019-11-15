import fetch from "node-fetch";
var cheerio = require('cheerio');   

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters
    var proxy,photos = [];

    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load( body );

	if ( /revolico/.test(url) ) {
        photos = $('[data-cy="zoomAdImage"]').map( (i,el) => $(el).attr('href') ).get();
        phone = $('data-cy="adPhone"').content;
	}

    if ( /porlalivre/.test(url) ) {
        photos = $('.img-thumbnail').map( (i,el) => 'https://porlalivre.com' + $(el).attr('href') ).get();
    }

    if ( /1cuc/.test(url) ) {
        photos = $('a[data-lightbox]').map( (i,el) => 'https:' + $(el).attr('href') ).get();
    }            

    if ( /timbirichi/.test(url) ) {
        photos = $('.anuncio-list-fotos .myfancybox').map( (i,el) => $(el).attr('href') ).get();
        phone = $('a[href^="tel:"]').attr('href').replace('\D','')
    }

    if ( /bachecubano/.test(url) ) {
        photos = $('.item-slider > li > a').map( (i,el) => $(el).attr('href') ).get();

    }        

    if ( /merolico/.test(url) ) {
        photos = $('a[data-fancybox-href]').map( (i,el) => $(el).attr('data-fancybox-href') ).get();
    }

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( photos.map( el => `https://callemonte.com/.netlify/functions/image?url=${el}`) )
    };
}