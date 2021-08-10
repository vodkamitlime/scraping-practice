const axios = require('axios');
const cheerio = require('cheerio');

const cloudURL = 'https://www.itworld.co.kr/t/34/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C'
const personalComputingURL = 'https://www.itworld.co.kr/t/62074/%ED%8D%BC%EC%8A%A4%EB%84%90%20%EC%BB%B4%ED%93%A8%ED%8C%85'
const bigDataURL = 'https://www.itworld.co.kr/t/54649/%EB%B9%85%20%EB%8D%B0%EC%9D%B4%ED%84%B0'

const getIT = async (url) => {

    let articles = [];
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    
    for (let i=0; i<1; i++){
        const titleTag = $('#m_topic_news_list_title')[i];
        const url = $(titleTag).find('a').attr('href');
        const title = $(titleTag).find('a').text();
        const content = $($('#m_topic_news_list_summary')[i]).text().trim();
        let keyword = $($('#m_topic_news_list_source')[i]).text();
        let date = $('#m_topic_news_list_time')[i].children[1].data;
        
        if (date.includes('시')) {
            date = date.replace('시 ', ':').replace('분', '');
            let curTime = new Date(Date.now());
            curTime.setHours(curTime.getHours() + 9); // 한국 표준시간으로 변환
            curTime.setTime(date+':00')
            console.log(curTime)
        } else {
            continue;
        }

        if (keyword.includes('퍼스널 컴퓨팅')) {
            keyword = '퍼스널 컴퓨팅'
        } else if (keyword.includes('클라우드')) {
            keyword = '클라우드'
        } else if (keyword.includes('빅 데이터')) {
            keyword = '빅 데이터'
        } else {
            continue;
        }

    }

}
// https://www.itworld.co.kr/
getIT(personalComputingURL);

const getCoding = async (url) => {
    
    const articleList = $('.type2')
    
    for (let i=0; i<articleList.children().length; i++){
        const article = articleList.children()[i]
        const url = $(article).find('a').attr('href')
        const title = $(article).find('.titles').text();
        const content = $(article).find('.lead').text().trim();
        const spanData = $(article).find('.byline');
        const keyword = $(spanData).find('em')[0].children[0].data;
        let date = $(spanData).find('em')[2].children[0].data;
        date = new Date(date)

        if (Date.now() - date > 86400000) { // 1일 이상 차이날 경우, skip
            continue;
        }
        
        if (!articleKeywords[keyword]){ // 지정된 키워드가 아닐 경우, skip 
            continue;
        }
        
        date.setHours(date.getHours() + 9); // 한국 시간으로 변환

        let DATA = {
            "article_title": title,
            "article_content": content,
            "article_date": date,
            "article_url": 'https://www.codingworldnews.com' + url, 
            "article_keyword": articleKeywords[keyword],
            "article_publisher": "Coding World News"
        }
        articles.push(DATA); 
    }

    return articles;

}


