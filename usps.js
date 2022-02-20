const puppeteer = require('puppeteer');

const track = async(tracking_num) => {
  const usps_tracking_site = 'https://tools.usps.com/go/TrackConfirmAction_input';
  const tracking_search_bar = "#tracking-input";
  const search_track_button = '#trackPackage > div.col-sm-2.track-btn-ctn > button';
  const class_day = '.day';
  const class_date = '.date';
  const class_month_year = '.month_year';
  const class_time = '.time';
  //const estimated_date = '#st_App_PkgStsTimeDayMonthNum';
  //const package_status = '#stApp_txtPackageStatus';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(usps_tracking_site);

  await page.waitForSelector(tracking_search_bar, {visible : true});

  await page.type(tracking_search_bar, tracking_num);

  await page.click(search_track_button);

  await page.waitForSelector(class_day);

  let delivery_info = await page.evaluate((class_day, class_date, class_month_year, class_time) => {
    let day = document.querySelector(class_day).innerText;
    let date = document.querySelector(class_date).innerText;
    let month_year = document.querySelector(class_month_year).innerText;
    month_year = month_year.split('\n');
    let time = document.querySelector(class_time).innerText;
    return {
      day,
      date,
      month : month_year[0],
      year : month_year[1],
      time
    };
  }, class_day, class_date, class_month_year, class_time);

  await browser.close();
  
  return delivery_info;
}

module.exports = { track };
