import fetch from "node-fetch"
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    const response = await fetch('https://merolico.app/search/page/'+p+'?q='+q+'&minPrice=1');
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('.adds-wrapper .item-list').map( (i,el) => { 
        let $el = $(el), 
            $a = $el.find('h5.add-title a');

        return {
            id: $a.attr('href'),
            price: $el.find('h2.item-price').text().replace(/\D/g,'') || 0 ,    
            photo: $el.find('[data-fancybox-href]').attr('data-fancybox-href') ,
            title: cleaner( $a.text() ),
            phones: $a.attr('href').match(/\d{8}/g) || [],
            url: $a.attr('href'),
            date: $el.find('li.date').text().trim()
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
