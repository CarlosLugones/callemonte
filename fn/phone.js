var rp = require('request-promise');
var cheerio = require('cheerio');   

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters;
    var phones = []
    const rePhone = /(\+?53)?\s?(\d[\s-]?){8}/g;

    await rp({ uri: url ,transform: (body) => { return cheerio.load(body); } })
        .then( ($) =>  {
       
        	if ( /revolico/.test(url) ) {
                phones = $('#contact .headingText2')
                            .filter( (i,el) => { return /tel.fono:/i.test( $(el).text() ) })
                            .next()
                            .text()
                            .replace(/[^0-9]/g,'')
                            .match(rePhone) || 
                            $('.showAdText').text().match(rePhone) || [];
        	}

            if ( /porlalivre/.test(url) ) {
                phones = $('.fa-phone')
                            .parent()
                            .text()
                            .replace(/[^0-9]/g,'')
                            .match(rePhone) || [];
            }

            if ( /1cuc/.test(url) ) {
                phones = $('.adHead').text().match(rePhone) || [];
            }            

          

            if ( /timbirichi/.test(url) ) {
                phones = $('a[href^="tel:"]').attr('href').match(rePhone) || [];
            }

        })
        .catch( err => console.error(err) );

    return {
        headers: { 'Content-Type':'application/json' },
        statusCode: 200,
        body: JSON.stringify( phones.replace(/[\s-]/g,'').join(', ') )
    };

}