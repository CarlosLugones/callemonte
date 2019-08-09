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
        uri: 'https://www.bachecubano.com/search/pattern,' + q.replace(/\s/,'+') + '/iPage,' + p,
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    await rp(options).then( ($) =>  {
       
        $('.simple-wrap').each(  async (i,el) => {
            let $el = $(el), 
                $a = $el.find('a.title'),
                reId = /\d+$/,
                $price = $el.find('.price span'),
                url = $a.attr('href'),
                phones =  ($a.text().replace(/\s/g,'').match(rePhone) || []).join(', ');

            if ( reId.test( $a.attr('href') ) ) {

                let product = Object.assign({},{

                    id:     "B" + $a.attr('href').match(reId)[0],
                    price:  parseFloat( $price.length ? $price.text() : 0 ),
                    photo:  $el.find('a.no-img') ? false : true,
                    original_title: $a.children().remove().end().text().trim(),
                    title:  cleaner( $a.children().remove().end().text() ),
                    phones: (phones === '') ? await getPhone(url) : phones,
                    url:    url

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
