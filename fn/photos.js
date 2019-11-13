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
	}

    if ( /porlalivre/.test(url) ) {
        photos = $('.img-thumbnail').map( (i,el) => 'https://porlalivre.com' + $(el).attr('href') ).get();
    }

    if ( /1cuc/.test(url) ) {
        photos = $('.adHead').text().match(rePhone) || [];
    }            

    if ( /timbirichi/.test(url) ) {
        photos = $('a[href^="tel:"]').attr('href').match(rePhone) || [];
    }

    if ( /bachecubano/.test(url) ) {
        photos = $('#pictures a[rel="image_group"]').map( (i,el) => $(el).attr('href') ).get();

    }        

    if ( /merolico/.test(url) ) {
        photos = $('a[href^="tel:"]').attr('href').match(rePhone) || [];
    }

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( photos.map( el => `https://callemonte.com/.netlify/functions/image?url=${el}`) )
    };
}