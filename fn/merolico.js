import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

var Sugar = require('sugar');
require('sugar/locales/es.js')
Sugar.Date.setLocale('es');

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' }= event.queryStringParameters;

    const response = await fetch(`https://merolico.app/search/page/${p}?q=${q}&minPrice=${pmin}&maxPrice=${pmax}`);
    const body = await response.text();
    const $ = cheerio.load( body );


    let data = $('.adds-wrapper .item-list').map( (i,el) => { 
        let $el = $(el), 
            $a = $el.find('h5.add-title a');

        return {
            price: parseInt( $el.find('h2.item-price').text().replace(/\D/g,'') || 0 ),    
            title: cleaner( $a.text() ),
            url: $a.attr('href'),
            // description: $el.find('.ads-details p').text(),
            // photo: $el.find('[data-fancybox-href]').attr('data-fancybox-href') ,
            // phones: $a.attr('href').match(/\d{8}/g) ||
            //         $el.find('.ads-details p').text().replace(/\W/g,'').match(/\d{8}/g) || 
            //         [],
            // date: Sugar.Date.create($el.find('li.date').text().trim() )
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
