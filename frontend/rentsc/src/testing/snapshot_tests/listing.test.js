const puppeteer = require('puppeteer');
const baseURL="http://localhost:3000/";


describe('loadlisting', () => {
  beforeAll(async () => {
    await page.goto(baseURL+'listings');
  });

  it('should check if listing container rendered', async () => {
    const browser = await puppeteer.launch();
    await page.goto('localhost:3000/listings');

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
    await page.waitForSelector('#listingContainer', {visible: true})
    const root = await page.$("#listingContainer");
      debugger;
      expect(root).not.toBeNull();
    console.log('Dimensions:', dimensions);

    await browser.close();
  });


});

describe('loadlisting', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listingList container rendered', async () => {
      const browser = await puppeteer.launch();
      await page.goto('localhost:3000/listings');
  
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
      await page.waitForSelector('#listingList', {visible: true})
      const root = await page.$("#listingList");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
  
  
  });

  describe('loadlisting', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listingMap container rendered', async () => {
      const browser = await puppeteer.launch();
      await page.goto('localhost:3000/listings');
  
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
      await page.waitForSelector('#listingMap', {visible: true})
      const root = await page.$("#listingMap");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
  
  
  });