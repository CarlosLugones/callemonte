import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /(\+?53)?\s?(\d[\s-]?){8}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch(`https://porlalivre.com/search/?q=${q}&page=${p}&price_min=1`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('div.classified-wrapper').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('a.classified-link'),
            reId = /([A-Z0-9]+)\/$/,
            $price = $el.find('#price2');

        return {

            id:     'P' + $a.attr('href').match(reId)[1],
            price:  $el.find('#price2').text().replace(/\D/g,''),
            photo:  !/no_image/g.test( $el.find('.media-object').attr('src') ),
            title:  cleaner( $el.find('.media-heading').children().remove().end().text() ),
            phones:  ($el.find('.media-heading').text().replace(/\s/g,'').match(rePhone) || []).join(', '),
            url: 'https://porlalivre.com' + $el.find('a.classified-link').attr('href'),
            date: $el.find('ul.media-bottom li').first().text().trim(),
        };

    }).get();

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
