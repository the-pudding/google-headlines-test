const fs = require('fs');
const d3 = require('d3');
const request = require('request');
const cheerio = require('cheerio');
let headlineData = [];

const IN_PATH = './output/'
const OUT_PATH = './output/'
const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function compileHeadlines(page) {
	const file = fs.readFileSync(`${IN_PATH}search-${page}.html`, 'utf-8');
	const $ = cheerio.load(file)

	$('div.g')
		.each((i, el) => {
			const title = $(el).find('.r').text()
			const link = $(el).find('.r').find('a').attr('href').replace('/url?q=', '').split('&')[0];
			const credits = $(el).find('.slp span').text()
			const newsOrg = credits.split(' - ')[0]
			const timeStamp = credits.split(' - ')[1]
			const text = $(el).find('.st').text()
			const img = $(el).find('img.th').attr('src')
			const today = new Date();
			const date = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;

		if (title) headlineData.push({title, link, newsOrg, timeStamp, text, img, date})
	})
	console.log(headlineData)
	return headlineData
}

function init() {
	PAGES.map(compileHeadlines)

	const allHeadlines = [].concat(...headlineData).map(d => ({ ...d }));
	const csv = d3.csvFormat(allHeadlines);
	fs.writeFileSync(`${OUT_PATH}/headlines.csv`, csv)
}

init();
