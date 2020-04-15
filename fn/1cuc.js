import fetch from "node-fetch";
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const moment = require('moment')

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province = 'cuba' } = event.queryStringParameters;

    const response = await fetch(`https://1cuc.com/${province}/search/?ct=0&lt=0&sort=&q=${q}&page=${p}` );
    const body = await response.text();
    const $ = cheerio.load( body );

    pmax = (pmax == '') ? 999999999999999 : pmax;

    let data = $('.sr-page__list__item  ').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('h3 a');
            // console.log($el.find('.descrip').text())
            return {
                price: parseInt( ($el.find('.v-price strong').text() || '').replace(/\D/g,'') ),
                title: cleaner( $a.children().remove().end().text() ),
                url: $a.attr('href'),
                // date: moment( $el.find('.publicated-date').text().trim(), 'D MMMM' ),
                // photo: $el.find('img').hasClass('im_blank') ? '' : 'https:' + $el.find('a.thumb img').attr('src'),
            }

    }).get()//.filter( el => parseFloat(el.price) > pmin && parseFloat(el.price) < pmax );

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
