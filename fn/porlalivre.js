var rp = require('request-promise');
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
var getPhone = require('./libs/phone');

const reValid = /^\d+([\.,]\d+)?\s+cuc\s+\-/;
const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    let data = [];

    let options = {
        uri: 'https://porlalivre.com/search/?price_min=1&q=' + q + '&page=' + p ,
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    await rp(options).then( ($) =>  {
       
        $('div.classified-wrapper').each(  async (i,el) => {
            let $el = $(el), 
                $a = $el.find('a.classified-link'),
                reId = /([A-Z0-9]+)\/$/,
                url = 'https://porlalivre.com' + $el.find('a.classified-link').attr('href'),
                phones = ($el.find('.media-heading').text().replace(/\s/g,'').match(rePhone) || []).join(', '),
                $price = $el.find('#price2');

            if ( reId.test( $a.attr('href') ) ) {

                let product = Object.assign({},{

                    id:     'P' + $a.attr('href').match(reId)[1],
                    price:  parseFloat( $price.length ? $price.text().replace(/\$/,'') : 0 ),
                    photo:  !/no_image/g.test( $el.find('.media-object').attr('src') ),
                    original_title: $el.find('.media-heading').children().remove().end().text().trim(),
                    title:      cleaner( $el.find('.media-heading').children().remove().end().text() ),
                    phones:  (phones === '') ? await getPhone(url) : phones,
                    url: url
                })

                data.push(product);

            }

        });

    })
    .catch( (err) => { console.log(err); });

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
