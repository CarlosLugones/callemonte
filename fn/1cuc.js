import fetch from "node-fetch";
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://1cuc.com/cuba/search/?ct=0&lt=0&sort=&page=1&q=' + q + '&page=' + p );
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('.sr-page__list__item tr').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('h3 a');

            return {
                id: 'C' + $a.attr('href').match(/(\d+)\.html$/)[1] ,
                price: ($el.find('.v-price strong').text() || '').replace(/\D/g,''),
                photo: $el.find('a.thumb') ? true : false,
                title: cleaner( $a.children().remove().end().text() ),
                phones: ($a.text().replace(/\s/g,'').match(rePhone) || []).join(', '),
                url: $a.attr('href'),
                date: $el.find('.publicated-date').text().trim(),
            }

    }).get().filter( el => parseFloat(el.price)>0 );

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
