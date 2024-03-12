const notifier = require("node-notifier");
const { scrapePrice, writeToLog } = require("./index");
const { Events } = require("./util");

let lastPrice = null;
// Function to periodically check the price and send notification if it changes
async function checkPriceAndNotify() {
  const currentPrice = await scrapePrice(),
    previousPrice = lastPrice;
  if (currentPrice !== null && previousPrice !== null) {
    console.log(
      `Current-price:${currentPrice}, Previous-price:${previousPrice}`
    );
    const sendNotification = currentPrice < previousPrice,
      priceUp = currentPrice > previousPrice;
    let eventType;
    if (sendNotification) {
      notifier.notify({
        title: "iPad Price Alert",
        message: `The price of the iPad has changed to $${currentPrice} from $${previousPrice}`,
      });
      eventType = Events.NOTIFICATION;
    } else if (priceUp) {
      eventType = Events.PRICE_CHANGE_UP;
    } else {
      eventType = Events.PRICE_CHECK;
    }

    if (eventType) {
      writeToLog(currentPrice, previousPrice, eventType);
      if (eventType === Events.NOTIFICATION) {
        writeToLog(currentPrice, previousPrice, Events.PRICE_DROP);
      }
    }
  }
  lastPrice = currentPrice;
}

const startPriceCheckingInterval = () => {
  checkPriceAndNotify();
  // Set up the interval to call checkPriceAndNotify periodically
  const CHECK_INTERVAL = 10 * 1000; // 10 minutes
  setInterval(checkPriceAndNotify, CHECK_INTERVAL);
};

module.exports = {
  checkPriceAndNotify,
  startPriceCheckingInterval,
};
