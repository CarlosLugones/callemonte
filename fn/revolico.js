import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
var moment = require('moment');

const rePhone = /(\+?53)?\s?(\d[\s-]?){8}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://www.revolico.com/search.html?min_price=1&q=' + q + '&p=' + p);
    const body = await response.text();
    const $ = cheerio.load( body );
    let data = $('td.light, td.dark').filter( (i,el) => /(\d+)\.html$/.test( $(el).find('a[title]').attr('href') ) )
        .map( (i,el) => { 

            let $el = $(el), 
                $a = $el.find('a[title]'),
                $price = $el.find('a span'),
                reId = /(\d+)\.html$/;

            return {
                id: 'R' + $a.attr('href').match(reId)[1],
                price: $el.find('a span').text().replace(/\D/g,'') || 0 ,
                photo: $el.find('span.formExtraDescB') ? true : false,  
                title: cleaner( $a.children().remove().end().text() ),
                phones: ($a.text().replace(/[^a-zA-Z0-9]/g,'').match(/\d{8}/g) || []).join(', '),
                url: 'https://www.revolico.com' + $a.attr('href'),
                date0: $a.attr('title'),
                date: moment( $a.attr('title'),"dddd, D de MMMM del YYYY", 'es' )
            };

        }).get();

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
