var rp = require('request-promise');
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
// const { parse } = require('url');

const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;

exports.handler =  async (event, context, callback) => {
    // const { query = {} } = parse(req.url, true);
    const { q, p = 1 } = event.queryStringParameters;

    let data = [];

        let options = {
        uri: 'https://www.revolico.com/search.html?min_price=1&q=' + q + '&p=' + p,
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    await rp(options).then( ($) =>  {
       
        $('td.light, td.dark').each(  (i,el) => {
            let $el = $(el), 
                $a = $el.find('a'),
                $price = $el.find('a span'),
                url = 'https://www.revolico.com' + $a.attr('href');

            let product = Object.assign({},{

                id: 'R' + (url.match(/\d+\.html$/) || []).toString(),

                price: parseFloat( $price.length ? $price.text() : 0 ),

                photo: $el.find('span.formExtraDescB') ? true : false,

                original_title: $a.children().remove().end().text().trim(),

                title: cleaner( $a.children().remove().end().text() ),

                phones:  ($a.text().replace(/[^a-zA-Z0-9]/g,'').match(/\d{8}/g) || []).join(', '),

                url: url,

                date: ''

            })

            if ( product.price>0) {
                data.push(product);
            }

        });

    })
    .catch( (err) => { console.log(err); });

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
