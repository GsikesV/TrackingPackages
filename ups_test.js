const ups = require("./ups");

let tracking_num = "800831904525470900";

(async()=>{
  let data = await ups.track(tracking_num);
  console.log(`UPS Tracking Num: ${data.tn}\nEstimated: ${data.ed}\nStatus: ${data.ps}`);
})();
