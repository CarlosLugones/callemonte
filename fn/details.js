import fetch from "node-fetch";
var cheerio = require('cheerio');   
const moment = require('moment')
var Sugar = require('sugar');
require('sugar/locales/es.js');
Sugar.Date.setLocale('es');

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters
    var date,location,phones,photos;
    const provinces = /La Habana|Artemisa|Mayabeque|Matanza/

    try {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load( body );

        if ( /revolico/.test(url) ) {
            photos = $('[data-cy="zoomAdImage"]').map( (i,el) => $(el).attr('href') ).get();
            phones = $('[data-cy="adPhone"]').text().replace(/\s/g,'').match(/\d{8}/g);
            location = $('[data-cy="adLocation"]').text();
            date = moment( parseInt( $('time').attr('datetime') ) ).format('D MMM, hA')
        }

        if ( /porlalivre/.test(url) ) {
            photos = $('.img-thumbnail').map( (i,el) => 'https://porlalivre.com' + $(el).attr('href') ).get();
            phones = $('.contact-info').text().match(/\d{8}/g) || []
            location = $('i.fa-home').parent().text().trim()
            date = $('i.fa-arrow-circle-up').parent().text().trim()
        }

        if ( /1cuc/.test(url) ) {
            photos = $('a[data-lightbox] img').map( (i,el) => $(el).attr('src') ).get();
            phones = ($('[itemprop="description"]').text().match(/\d{8}/g) || []).filter((value, index, el) => el.indexOf(value) === index);
            location = $('.v-map-point').text(),
            date = $('.v-map-point').next().text()
        }            

        if ( /timbirichi/.test(url) ) {
            photos = $('.anuncio-list-fotos .myfancybox').map( (i,el) => $(el).attr('href') ).get();
            phones = $('[href^="tel:"]').first().text().replace(/\D/g,'').match(/\d{8}/g);
            location = $('i.icon-location-pin').first().parent().text().trim()
            date = Sugar.Date.create( $('fecha').text() )
        }

        if ( /bachecubano/.test(url) ) {
            photos = $('.item-slider > li > a').map( (i,el) => $(el).attr('href') ).get();
            phones = $('[href^="tel:"]').first().text().replace(/\D/g,'');
            if (phones === "") {
                phones = $('#content').text().replace(/\W/g,'').match(/\d{8}/g)
            }
            if (photos.length === 0) {
                photos = $('.img-fluid').map( (i,el) => $(el).attr('src') ).get();
            }
            location = ''
            date = ''
        }        

        if ( /merolico/.test(url) ) {
            photos = $('a[data-fancybox-href]').map( (i,el) => $(el).attr('data-fancybox-href') ).get();
            phones = $('[href^="tel:"]').first().text().replace(/[\s\(\)]/g,'').split();
            date = $('span[date-time]').attr('date-time')
            location = $('span.item-location').text().trim()
        }

    } catch(e) { console.log(e) }

    let data = {
        photo: photos.length > 0 ? photos[0] : '',
        phones: phones,
        location: location,
        date: date,
    }
    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( data )
    };
}