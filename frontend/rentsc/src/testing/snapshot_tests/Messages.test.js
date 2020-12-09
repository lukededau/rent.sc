const puppeteer = require('puppeteer');
const baseURL="http://localhost:3000/";
/*describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });
});*/

describe('loadMessages', () => {
  beforeAll(async () => {
    await page.goto(baseURL+'messages');
  });

  it('should check if Message container rendered', async () => {
    const browser = await puppeteer.launch();
    await page.goto('localhost:3000/messages');

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(async() => {
      var res = []
      var allElements = document.getElementsByTagName('*');
      for(var i = 0; i < allElements.length; i++) {
          // ensure the element has an Id that is not empty and does exist
          // and string other than empty, '', will return true
          allElements[i].id && res.push(allElements[i].id);
      }
      
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
        res: res
      };
    });
    await page.waitForSelector('#MessageRow', {visible: true})
    const root = await page.$("#MessageRow");
      debugger;
      expect(root).not.toBeNull();
    console.log('Dimensions:', dimensions);

    await browser.close();
  });


});

describe('loadMessageList', () => {
  beforeAll(async () => {
    await page.goto(baseURL+'messages');
  });

  it('should check if Message List rendered', async () => {
    const browser = await puppeteer.launch();
    await page.goto('localhost:3000/messages');

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(async() => {
      var res = []
      var allElements = document.getElementsByTagName('*');
      for(var i = 0; i < allElements.length; i++) {
          // ensure the element has an Id that is not empty and does exist
          // and string other than empty, '', will return true
          allElements[i].id && res.push(allElements[i].id);
      }
      
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
        res: res
      };
    });
    await page.waitForSelector('#MessageListCol', {visible: true})
    const root = await page.$("#MessageListCol");
    expect(root).not.toBeNull();
    console.log('Dimensions:', dimensions);

    await browser.close();
  });


});

describe('loadMessageObject', () => {
  beforeAll(async () => {
    await page.goto(baseURL+'messages');
  });

  it('should check if Message objects rendered', async () => {
    const browser = await puppeteer.launch();
    await page.goto('localhost:3000/messages');

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(async() => {
      var res = []
      var allElements = document.getElementsByTagName('*');
      for(var i = 0; i < allElements.length; i++) {
          // ensure the element has an Id that is not empty and does exist
          // and string other than empty, '', will return true
          allElements[i].id && res.push(allElements[i].id);
      }
      
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
        res: res
      };
    });
    await page.waitForSelector('#MessageObjectCol', {visible: true})
    const root = await page.$("#MessageObjectCol");
    expect(root).not.toBeNull();
    console.log('Dimensions:', dimensions);

    await browser.close();
  });


});
