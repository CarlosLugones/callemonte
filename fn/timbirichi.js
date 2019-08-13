import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /(\+?53)?\s?([1-9][\s-]?){1}(\d[\s-]?){7}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://www.timbirichi.com/buscar/pagina/'+ p +'?q=' + q + '&min=1');
    const body = await response.text();
    const $ = cheerio.load( body );

    let data =  $('a.anuncio-list').map( (i,el) => {
        let $el = $(el), 
            reId = /[a-zA-Z]+$/,
            reNoImage = /default/g;

        return {
            id:     'T' + $el.attr('href').match(reId)[0],
            price:  $el.find('precio').first().text().replace(/\D/g,''),
            photo:  !reNoImage.test( $el.find('.media-object').attr('src') ),
            title:  cleaner( $el.find('h5.anuncio-titulo').text() ),
            phones: ($el.text().replace(/\s/g,'').match(rePhone) || []).join().replace(/[\D,]/g),
            url: $el.attr('href'),
            date: $el.find('li .icon-clock').parent().text().trim()
        };

    }).get();

    return {
        headers: { 
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*' 
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} 
