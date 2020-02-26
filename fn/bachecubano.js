import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /(\+?53)?\s?([1-9][\s-]?){1}(\d[\s-]?){7}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' }= event.queryStringParameters;

    const response = await fetch(`https://www.bachecubano.com/search?s=${q}&min_price=${pmin}&max_price=${pmax}&page=${p}`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('.product-item').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('.product-title a');

        return {
            id:     $a.attr('href'),
            price:  parseFloat($el.find('.price').text().replace(/[^\d\.,]/g,'')),
            photo:  $el.find('.lazyload').attr('data-src'),
            title:  cleaner( $a.text() ),
            phones: $a.text().replace(/\W/g,'').match(rePhone) || [],
            url:    $a.attr('href'),
            date: ''
        }

    }).get();

    return {
        headers: { 
            'Content-Type':'application/json', 
            'Access-Control-Allow-Origin': '*' 
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };
} // revolico
