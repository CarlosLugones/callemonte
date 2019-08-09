var rp = require('request-promise');

const rePhone = /0?(((5|7)[\.\-\s]?([\dO][\.\-\s]?){7})|((47|45|42|33|32|24)\d{6}))/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 0 } = event.queryStringParameters;
    var data = [];

    var options = {
        uri: `http://api.riquera.com/api/posting?priceRangeStart=1&term=${q}&page=${p}&take=25`,
        json: true 
    };

    await rp(options).then( (response) =>  {
       
        data = response.ads.map( (ad) =>{
            return {
                id: 'I' + ad.id,
                price: ad.price,
                title: ad.title,
                phones: ad.posterPhone.trim(),
                photos: ad.images.length > 0,
                url: `http://www.ricurancia.com/posting;id=${ad.id}`,
                date: ad.created
            };
        });

    })
    .catch( (err) => { console.log(err); });

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
