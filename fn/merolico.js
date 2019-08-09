var rp = require('request-promise');
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
var getPhone = require('./libs/phone');

const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    let data = [];

    let options = {
        uri: `https://merolico.app/search/page/${p}?q=${q}&minPrice=1`,
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    await rp(options).then( ($) =>  {

        $('.adds-wrapper .item-list').each( async (i,el) => { 
            let $el = $(el), 
                $a = $el.find('h5.add-title a'),
                url = $a.attr('href'),
                phones = ($a.text().replace(/[^a-zA-Z0-9]/g,'').match(/\d{8}/g) || []).join(', ');

            let ad = {
                id: url,
                price: $el.find('h2.item-price').text().replace(/\D/g,'') || 0 ,
                photo: !/default\.jpg$/.test( $el.find('div.add-image img').attr('src') ),
                original_title: $a.text(),
                title: cleaner( $a.text() ),
                // phones:  (phones === '') ? await getPhone(url) : phones,
                phones: phones,
                url: url,
            };

            data.push(ad);
        });
    })
    .catch( (err) => { console.log(err); });

    // console.log(data)

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
