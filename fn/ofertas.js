import fetch from "node-fetch";
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const moment = require('moment')
var Browser = require("zombie");

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province } = event.queryStringParameters;
    let data = []
    // const response = await fetch(`http://ofertas.cu/buscar?q=${q}`, {method: 'POST'} );
    // const body = await response.text();
    browser = new Browser()
    browser.visit(`http://ofertas.cu/`, function() {
        browser.fill( 'input[name=q]', q );
        browser.document.forms[0].submit();
        browser.wait().then( function() {
            // let ads = browser.html('.search-page')
            let ads = browser.queryAll('.search-page a')
            // const $ = cheerio.load( body );
            // console.log(ads)

            ads.forEach( el => {
                console.log(el)
            })

            // let data = $('.listing.list-mode a').map( (i,el) => {
            //     const url = 'http://ofertas.cu/' + $(el).attr('href')
            //     const response = await fetch( url );
            //     return {
            //         // price: parseInt( $el.find( selPrice).length ? $el.find( selPrice).text() : 0 ),
            //         // title: cleaner( $el.find( 'span[data-cy="adTitle"]' ).text() ),
            //         // url: 'https://www.revolico.com' + $el.find('a[href$="html"]').attr('href'),
            //         // // description: $(el).find( 'span[data-cy="adDescription"]' ).text(),
            //         // // date: moment( parseInt( $el.find( 'time[datetime]' ).attr('datetime') ) ),
            //         // // phones: $el.find( selTitle ).text().match(rePhone) || [],
            //         // // photo: $el.find('span[data-cy="adPhoto"]').length > 0,
            //     }
            // }).get();   

        })
    })

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
