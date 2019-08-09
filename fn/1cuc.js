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
        uri: 'https://1cuc.com/cuba/search/?ct=0&lt=0&sort=&page=1&q=' + q + '&page=' + p ,
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    await rp(options).then( ($) =>  {
       
        $('.sr-page__list__item tr').each( async (i,el) => {
            let $el = $(el), 
                $a = $el.find('h3 a'),
                $price = $el.find('.v-price strong'),
                reId = /(\d+)\.html$/,
                phones = ($a.text().replace(/\s/g,'').match(rePhone) || []).join(', '),
                pattNoImage = /def-1/g;

            if ( reId.test( $a.attr('href') ) ) {

                let product = Object.assign({},{

                    id: 'C' + $a.attr('href').match(reId)[1] ,
                    price: parseFloat( $price.length ? $price.text().replace(/\s/,'') : 0 ),
                    photo: !pattNoImage.test( $el.find('img').attr('src') ),
                    original_title: $a.children().remove().end().text().trim(),
                    title: cleaner( $a.children().remove().end().text() ),
                    phones: (phones === '') ? await getPhone(url) : phones,
                    url: $a.attr('href')
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
