const fs = require('fs');
const d3 = require('d3');
const request = require('request');

const OUT_PATH = './output/'
const SEARCH_TERM = 'florida+man'
const SEARCH_URL = `https://www.google.com/search?q=${SEARCH_TERM}&tbm=nws`
const PAGES = [2, 3, 4, 5, 6, 7, 8, 9, 10]

async function getNewsHTML(page) {
	return new Promise((resolve, reject) => {
		request(SEARCH_URL, (err, response, body) => {
			fs.writeFileSync(`${OUT_PATH}/search-${page}.html`, body);
		})
	})
}

function init() {
	getNewsHTML(1)
	PAGES.map(getNewsHTML)
}

init();
