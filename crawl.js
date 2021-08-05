const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

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

// // https://search.naver.com/search.naver?where=news&query=javascript&sort=1 // 최신순으로 검색 
// getHTML('javascript');

const getSecurity = async () => {
    try {
        let CRAWL_URL = `https://www.boannews.com/media/t_list.asp`
        const html = await axios.get(CRAWL_URL, {
            responseEncoding: 'binary'
        });
        const htmlData = iconv.decode(html.data, 'euc-kr').toString();
        const $ = cheerio.load(htmlData);
        console.log($)
        // const article = $('.news_txt');
        const article = $('.news_content').text();
        // for (let ar of article) {
        //     console.log(ar.text())
        // }
        console.log(article)
    } catch (err) {
        console.log(err);
    }
}

// getSecurity();

const getCoding = async () => {
    try {
        let CRAWL_URL = `https://www.codingworldnews.com/news/articleList.html?sc_section_code=S1N2&view_type=sm`
        const html = await axios.get(CRAWL_URL);
        const $ = cheerio.load(html.data);
        const article = $('.titles > a');
        const title = $(article).text();
        console.log(title)
    } catch (err) {
        console.log(err);
    }
}

// getCoding();

const getIT = async () => {
    try {
        let CRAWL_URL = `https://www.itworld.co.kr/t/34/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C`
        const html = await axios.get(CRAWL_URL);
        const $ = cheerio.load(html.data);
        const article = $('.news_list_title > a')[0];
        const title = $(article).text();
        console.log(title)
    } catch (err) {
        console.log(err);
    }
}

getIT();