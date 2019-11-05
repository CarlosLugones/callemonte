// const chromium = require('chrome-aws-lambda');
const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const { url } = event.queryStringParameters;
    const pageToPDF = url;

    if (!pageToPDF) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.goto(pageToPDF, { waitUntil: 'networkidle2' });
    const pdf = await page.pdf();

    await browser.close();
  
    return {
        statusCode: 200,
        body: JSON.stringify({ 
            message: `Complete screenshot of ${pageToPDF}`, 
            buffer: pdf 
        })
    }

}