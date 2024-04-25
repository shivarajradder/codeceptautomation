const { I } = inject();
const event = require('codeceptjs').event;
let MST_KeysArr = [];
module.exports = function () {

  event.dispatcher.on(event.test.after, async function (test) {
   await I.findElements();
  });
}