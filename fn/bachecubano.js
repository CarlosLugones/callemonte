import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /(\+?53)?\s?(\d[\s-]?){8}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://www.bachecubano.com/search/pattern,' + q.replace(/\s/,'+') + '/iPage,' + p);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('.simple-wrap').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('a.title');

        return {
            id:     "B" + $a.attr('href').match(/\d+$/)[0],
            price:  ($el.find('.price span').text() || 0).replace(/\D/g,''),
            photo:  $el.find('a.img-link').hasClass('no-img'),
            title:  cleaner( $a.children().remove().end().text() ),
            phones: ($a.text().replace(/\s/g,'').match(rePhone) || []).join(', '),
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
