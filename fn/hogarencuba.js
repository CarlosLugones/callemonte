import fetch from "node-fetch"
var cleaner = require('./libs/cleaner');

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' } = event.queryStringParameters;
    let re = /casa|apartamento/ig
    let data = []

    if ( re.test(q) ) {

        let type = q.match(re);
        const response = await fetch(`https://www.hogarencuba.com/api.json`);
        const json = await response.json();
        data = json.filter( el => {
            return  (el.price >= pmin) && 
                    (el.price <= pmax) && 
                    (el.type === type)
        }).map( el => {
            return {
                title: el.title,
                price: el.price,
                photo: el.firstImageUrl,
                url: el.url,
                date: el.created_at
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
