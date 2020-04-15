import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const moment = require('moment')

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' , province = '' } = event.queryStringParameters;
    var data = [];

    fetch(`https://wwwrevolico.com/search.html?q=${q}&min_price=${pmin}&max_price=${pmax}&p=${p}&province=${province}`)
        .then( response => response.text() )
        .then( body => {
            const $ = cheerio.load( body );
            let data = $('li[data-cy="adRow"]').map( (i,el) => {
                let $el = $(el), 
                    selPrice = 'span[data-cy="adPrice"]';

                return {
                    price: parseInt( $el.find( selPrice).length ? $el.find( selPrice).text() : 0 ),
                    title: cleaner( $el.find( 'span[data-cy="adTitle"]' ).text() ),
                    url: 'https://www.revolico.com' + $el.find('a[href$="html"]').attr('href'),
                    // description: $(el).find( 'span[data-cy="adDescription"]' ).text(),
                    // date: moment( parseInt( $el.find( 'time[datetime]' ).attr('datetime') ) ),
                    // phones: $el.find( selTitle ).text().match(rePhone) || [],
                    // photo: $el.find('span[data-cy="adPhoto"]').length > 0,
                }
            }).get();

            callback(null, {
                headers: { 
                    'Content-Type':'application/json' , 
                    'Access-Control-Allow-Origin': '*'
                },
                statusCode: 200,
                body: JSON.stringify(data)
            });            

        })
        .catch(e=>console.log(e))
 
} // revolico
