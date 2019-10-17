import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
var moment = require('moment');

const rePhone = /(\+?53)?\s?([1-9][\s-]?){1}(\d[\s-]?){7}/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://www.revolico.com/search.html?min_price=1&q=' + q + '&p=' + p);
    const body = await response.text();
    const $ = cheerio.load( body );

    let json = JSON.parse( $('script[type="application/json"]').get()[0].children[0].data );

    // retorna el listado 
    let data = Object.keys( json.props.apolloState ).filter( (k) => { return /^AdType/.test(k)  } ).map( k => {
        let ad = json.props.apolloState[k]
        console.log(ad)
        return {
            id: ad.id,
            title: cleaner(ad.title),
            phones: (ad.title.replace(/[^a-zA-Z0-9]/g,'').match(rePhone) || []).join(),
            price: ad.price,
            url: 'https://www.revolico.com'  + ad.permalink,
            photo: parseInt(ad.imagesCount) > 0,
        }
    } )
    // let data = $('li[data-cy="adRow"]').map( (i,el) => { 
    //     let $el = $(el), 
    //         $a = $el.find('[data-cy="adTitle"]'),
    //         $price = $el.find('a span'),
    //         reId = /(\d+)\.html$/;

    //     return {
    //         // id: 'R' + $el.find('a)'.attr('href').match(reId)[1],
    //         price: $el.find('[data-cy="adPrice"]').text().replace(/\D/g,'') || 0 ,
    //         photo: $el.find('[data-cy="adPhoto"]') ? true : false,  
    //         title: cleaner( $el.find('[data-cy="adTitle"]').text() ),
    //         phones: ( $el.find('[data-cy="adTitle"]').text().replace(/[^a-zA-Z0-9]/g,'').match(/\d{8}/g) || []).join(', '),
    //         url: 'https://www.revolico.com' + $el.find('a').attr('href'),
    //         date: ''
    //     };

    // }).get();

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
