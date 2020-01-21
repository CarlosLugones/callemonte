var request = require('request-promise');
var cheerio = require('cheerio');   

module.exports = async (url) => {
    const rePhone = /(\+?53)?\s?(\d[\s-]?){8}/g;
    var phones = [];

    let options = {
        uri: url,
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    return request(options).then( ($) =>  {

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

        if ( /bachecubano/.test(url) ) {
            phones = $('a[href^="tel:"]').attr('href').match(rePhone) || [];
        }        

        if ( /merolico/.test(url) ) {
            phones = $('a[href^="tel:"]').attr('href').match(rePhone) || [];
        }

        return phones.join();
    })
    .catch( (err) => { console.log(err); });
    // console.log(phones)

}