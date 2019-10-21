import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://www.timbirichi.com/buscar/pagina/'+ p +'?q=' + q + '&min=1');
    const body = await response.text();
    const $ = cheerio.load( body );

    let data =  $('a.anuncio-list').map( (i,el) => {
        let $el = $(el), 
            reId = /[a-zA-Z]+$/,
            reNoImage = /default/g;
        console.log($el.find('h5.anuncio-titulo').text().replace(/[^a-zA-Z1-9]/g,'') +  ' - ' + $el.find('h5.anuncio-titulo').text().replace(/[^a-zA-Z1-9]/g,'').match(rePhone));
        return {
            id:     'T' + $el.attr('href').match(reId)[0],
            price:  $el.find('precio').first().text().replace(/\D/g,''),
            photo:  !reNoImage.test( $el.find('.media-object').attr('src') ),
            title:  cleaner( $el.find('h5.anuncio-titulo').text() ),
            phones: ($el.find('h5.anuncio-titulo').text().replace(/\s/g,'').match(rePhone) || []).join(),
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
