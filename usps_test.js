const usps = require('./usps');

(async()=>{
    let data = await usps.track("92748999936580573030920483");
    console.log(data);
  })();
