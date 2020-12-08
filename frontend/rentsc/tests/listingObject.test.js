const puppeteer = require('puppeteer');
const baseURL="http://localhost:3000/";


describe('load listingObjectContainer', () => {
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
    await page.waitForSelector('#listingObjectContainer', {visible: true})
    const root = await page.$("#listingObjectContainer");
      debugger;
      expect(root).not.toBeNull();
    console.log('Dimensions:', dimensions);

    await browser.close();
  });


});

describe('load listingObjectImage', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listing image rendered', async () => {
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
      await page.waitForSelector('#listingObjectImages', {visible: true})
      const root = await page.$("#listingObjectImages");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
  
  
  });

describe('load listingObjectData', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listing data rendered', async () => {
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
      await page.waitForSelector('#listingObjectData', {visible: true})
      const root = await page.$("#listingObjectData");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
});

describe('load listingObj description', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listing obj rendered', async () => {
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
      await page.waitForSelector('#listingObjDes', {visible: true})
      const root = await page.$("#listingObjDes");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
});

describe('load listingObj rooms', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if number of rooms rendered', async () => {
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
      await page.waitForSelector('#listingObjRooms', {visible: true})
      const root = await page.$("#listingObjRooms");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
});

describe('load listingObj tags', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listing tags rendered', async () => {
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
      await page.waitForSelector('#listingObjTags', {visible: true})
      const root = await page.$("#listingObjTags");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
});

describe('load listingObj price', () => {
    beforeAll(async () => {
      await page.goto(baseURL+'listings');
    });
  
    it('should check if listing price rendered', async () => {
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
      await page.waitForSelector('#listingObjPrice', {visible: true})
      const root = await page.$("#listingObjPrice");
        debugger;
        expect(root).not.toBeNull();
      console.log('Dimensions:', dimensions);
  
      await browser.close();
    });
});

