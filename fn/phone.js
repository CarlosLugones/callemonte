var rp = require('request-promise');
var cheerio = require('cheerio');   

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters;
    var phones = []

    await rp({ uri: url ,transform: (body) => { return cheerio.load(body); } })
        .then( ($) =>  {
       
        	if ( /revolico/.test(url) ) {
                phones = $('#contact .headingText2')
                            .filter( (i,el) => { return /tel.fono:/i.test( $(el).text() ) })
                            .next()
                            .text()
                            .replace(/[^0-9]/g,'')
                            .match(/\d{8}/g) || 
                            $('.showAdText').text().match(/\d{8}/g) || [];
        	}

            if ( /porlalivre/.test(url) ) {
                phones = $('.fa-phone')
                            .parent()
                            .text()
                            .replace(/[^0-9]/g,'')
                            .match(/\d{8}/g) || [];
            }

            if ( /1cuc/.test(url) ) {
                phones = $('.adHead').text().match(/\d{8}/g) || [];
            }            

          

            if ( /timbirichi/.test(url) ) {
                phones = $('a[href^="tel:"]').attr('href').match(/\d{8,}/g) || [];
            }

        })
        .catch( err => console.error(err) );

    return {
        statusCode: 200,
        body: JSON.stringify( phones.join(', ') )
    };

}