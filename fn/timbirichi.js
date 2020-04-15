import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

var Sugar = require('sugar');
require('sugar/locales/es.js');
Sugar.Date.setLocale('es');


const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '', province = '' } = event.queryStringParameters;

    const response = await fetch(`https://www.timbirichi.com/buscar/pagina/${p}?q=${q}&min=${pmin}&max=${pmax}`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data =  $('a.anuncio-list').map( (i,el) => {
        let $el = $(el), 
            reId = /[a-zA-Z]+$/,
            reNoImage = /default/g;

        return {
            price:  $el.find('precio').first().text().replace(/\D/g,''),
            title:  cleaner( $el.find('h5.anuncio-titulo').text() ),
            url: $el.attr('href'),
            // photo:  $el.find('.thumbnail').attr('data-src-mobile'),
            // description:  $el.find('.info-anuncio small').text(),
            // phones: $el.find('h5.anuncio-titulo').text().replace(/\W/g,'').match(rePhone) || [],
            // date: Sugar.Date.create( $el.find('li .icon-clock').parent().text().trim() )
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
