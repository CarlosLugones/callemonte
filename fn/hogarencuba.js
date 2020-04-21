import fetch from "node-fetch"
var cleaner = require('./libs/cleaner');

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province = '' } = event.queryStringParameters;
    let re = /casa|apartamento/i
    let data = []

    if ( re.test(q) ) {

        let type = q.match(re)[0];
        const response = await fetch(`https://www.hogarencuba.com/api.json`);
        const json = await response.json();

        var reProvince = new RegExp(province,"g");
        var reQuery = new RegExp(q,"ig");
        data = json
            .filter( el =>{ 
                return (el.price >= pmin) && 
                        reProvince.test(el.url) &&
                        reQuery.test(el.title)
            })
            .map( el => {
                return {
                    title: el.title,
                    url: el.url,
                    price: el.price,
                    location: el.location,
                    photo: el.poster
                }
            })
    }


    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
