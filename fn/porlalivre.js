import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const moment = require('moment')

const rePhone = /(\+?53)?\s?([1-9][\s-]?){1}(\d[\s-]?){7}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '', province = 'www' } = event.queryStringParameters;
    province = province==='' ? 'cuba' : province

    const response = await fetch(`https://${province}.porlalivre.com/search/?q=${q}&page=${p}&price_min=${pmin}&price_max=${pmax}`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('div.classified-wrapper').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('a.classified-link'),
            reId = /([A-Z0-9]+)\/$/,
            $price = $el.find('#price2');

        return {
            price:  $el.find('#price2').text().replace(/\D/g,''),
            title:  cleaner( $el.find('.media-heading').children().remove().end().text() ),
            url: 'https://porlalivre.com' + $el.find('a.classified-link').attr('href'),
            // photo:  /no_image/g.test( $el.find('.media-object').attr('src') ) ? '' : 'https://porlalivre.com'+$el.find('img.media-object').attr('src'),
            // phones:  $el.find('.media-heading').text().replace(/\W/g,'').match(rePhone) || [],
            // date: moment( $el.find('ul.media-bottom li').first().text().trim() ),
        };

    }).get();

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
