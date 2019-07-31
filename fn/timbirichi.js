var rp = require('request-promise');
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');

const reValid = /^\d+([\.,]\d+)?\s+cuc\s+\-/;
const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1 } = event.queryStringParameters;

    let data = [];

    let options = {
        uri: 'https://www.timbirichi.com/buscar/pagina/'+ p +'?q=' + q + '&min=1',
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    await rp(options).then( ($) =>  {
       
        $('.anuncio-list').each(  (i,el) => {
            let $el = $(el), 
                $a = $el.find('.anuncio-titulo'),
                $price = $el.find('precio'),
                reId = /[a-zA-Z]+$/,
                pattNoImage = /default/g;

            if ( reId.test( $a.attr('href') ) ) {

                let product = Object.assign({},{

                    id:     'T' + $a.attr('href').match(reId)[0],

                    price:  parseFloat( $price.length ? $price.text().replace(/\$/,'') : 0 ),

                    photo:  !pattNoImage.test( $el.find('.media-object').attr('src') ),

                    original_title: $a.children().remove().end().text().trim(),

                    title:  cleaner( $a.children().remove().end().text() ),

                    phones: ($a.text().replace(/\s/g,'').match(rePhone) || []).join(', '),

                    url:    $el.attr('href')
                })

                data.push(product);

            }

        });

    })
    .catch( (err) => { console.log(err); });

    return {
        headers: { 'Content-Type':'application/json' },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
