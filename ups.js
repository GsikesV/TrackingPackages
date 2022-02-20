const puppeteer = require('puppeteer');

const track = async(tracking_num)=>{

  const ups_tracking_site = 'https://www.ups.com/track?loc=en_US&requester=ST/';
  const tracking_search_bar = "#stApp_trackingNumber";
  const search_track_button = '#stApp_btnTrack';
  const estimated_date = '#st_App_PkgStsTimeDayMonthNum';
  const package_status = '#stApp_txtPackageStatus';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    'upgrade-insecure-requests': '1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,en;q=0.8'
  });


  await page.goto(ups_tracking_site);

  await page.waitForSelector(tracking_search_bar, {visible: true});
  await page.type(tracking_search_bar, tracking_num);
  await page.click(search_track_button);

  //await page.screenshot({ path: 'example.png' });
  //await page.waitForTimeout(30000);
  //await page.screenshot({ path: 'example2.png' });

  await page.waitForSelector(estimated_date);
  const data = await page.evaluate((tracking_num, estimated_date, package_status)=>{
    const ed = document.querySelector(estimated_date).innerText;
    const ps = document.querySelector(package_status).innerText;
    return {
      tn: tracking_num,
      ed,
      ps
    };
  }, tracking_num, estimated_date, package_status);
  await browser.close();
  return data;
}

module.exports = { track };

