import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /(\+?53)?\s?([1-9][\s-]?){1}(\d[\s-]?){7}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://www.bachecubano.com/search/ajaxRun,1/cookieAction,done/sOrder,dt_mod_date/iOrderType,desc/iExtra,1/pattern,'+q+'/sPriceMin,1/iPage,'+p);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('.simple-wrap').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('a.title');

        return {
            id:     "B" + $a.attr('href').match(/\d+$/)[0],
            price:  parseInt(($el.find('.price span').text() || 0).replace(/[^\d\.,]/g,'')),
            photo:  $el.find('a.img-link').hasClass('no-img'),
            title:  cleaner( $a.children().remove().end().text() ),
            phones: ($a.text().replace(/[^a-zA-Z1-9]/g,'').match(rePhone) || []).join(', '),
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
