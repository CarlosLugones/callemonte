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
        uri: 'https://www.timbirichi.com/buscar/pagina/'+ p +'?q=' + q + '&min=1',
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    rp(options).then( ($) =>  {
       
        data = $('a.anuncio-list').map( async (i,el) => {
            let $el = $(el), 
                $a = $el,
                $price = $el.find('precio'),
                reId = /[a-zA-Z]+$/,
                phones = ($a.text().replace(/\s/g,'').match(rePhone) || []).join(', '),
                url =    $el.attr('href'),
                pattNoImage = /default/g;

            console.log( $el.text() );

            // if ( reId.test( $el.attr('href') ) ) {

                let product = {

                    id:     'T' + $a.attr('href').match(reId)[0],
                    price:  parseFloat( $price.length ? $price.text().replace(/\$/,'') : 0 ),
                    photo:  !pattNoImage.test( $el.find('.media-object').attr('src') ),
                    original_title: $el.find('h5.anuncio-titulo').text(),
                    title:  cleaner( $el.find('h5.anuncio-titulo').text() ),
                    phones: (phones === '') ? await getPhone(url) : phones,
                    url: url
                };
                return product;
                // data.push(product);

            // }

        }).get();

        return {
            headers: { 
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            statusCode: 200,
            body: JSON.stringify(data)
        };
    })
    .catch( (err) => { console.log(err); });

    console.log(data)
    

} // revolico
