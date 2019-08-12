import fetch from "node-fetch"

exports.handler =  async (event, context, callback) => {
    const { q, p = 0 } = event.queryStringParameters;

    const response = await fetch('http://api.riquera.com/api/posting?priceRangeStart=1&term='+q+'&page='+p+'&take=25');
    const resJson = await response.json();

        console.log(resJson)
    let data = resJson.ads.map( (ad) =>{
        return {
            id: 'I' + ad.id,
            price: ad.price,
            title: ad.title,
            phones: ad.posterPhone.trim(),
            photos: ad.images.length > 0,
            url: `http://www.riquera.com/posting;id=${ad.id}`,
            date: ad.created
        };
    });

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
