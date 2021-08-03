const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async (option) => {
    try {
        let CRAWL_URL = `https://search.naver.com/search.naver?query=${option}&where=news&ie=utf8&sm=nws_hty`
        const html = await axios.get(CRAWL_URL);
        const $ = cheerio.load(html.data);
        const article = $('.bx');
        const title = $(article).find('.news_tit').text();
        console.log(title)
    } catch (err) {
        console.log(err);
    }
}

getHTML('javascript');