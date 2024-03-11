const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const { getRandomUserAgent, getHeaderForLogging, Events } = require("./util");

const AMAZON_URL =
  "https://www.amazon.com/Apple-2022-10-9-inch-iPad-Wi-Fi/dp/B0BJLXMVMV/";

// Function to scrape the price of the iPad from Amazon
async function scrapePrice() {
  try {
    const response = await axios.get(AMAZON_URL, {
      headers: {
        "User-Agent": getRandomUserAgent(),
        "accept-language": "en-US,en;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);
    let price = null;
    // left div
    const priceWhole = $(
      "#corePriceDisplay_desktop_feature_div span.a-price-whole"
    )
      .first()
      .text()
      .trim()
      .replace(",", "")
      .replace(".", "");
    const priceFraction = $(
      "#corePriceDisplay_desktop_feature_div span.a-price-fraction"
    )
      .first()
      .text()
      .trim();

    if (priceWhole && priceFraction) {
      price = parseFloat(`${priceWhole}.${priceFraction}`);
    } else {
      // If specific classes are not found, try another approach
      // right side
      const offscreenPrice = $("#corePrice_feature_div .a-offscreen")
        .first()
        .text()
        .trim();
      price = parseFloat(offscreenPrice.replace("$", "").replace(",", ""));
    }

    return price;
  } catch (error) {
    console.error("Error scraping price:", error);
    return null;
  }
}

function writeToLog(currentPrice, previousPrice, event) {
  const header = getHeaderForLogging();
  const logFilePath = path.join(__dirname, "file.log");
  const timestamp = new Date();

  try {
    // Check if the file exists and is empty
    const fileExists = fs.existsSync(logFilePath);
    const isFileEmpty = fileExists ? fs.statSync(logFilePath).size === 0 : true;
    const eventDetails =
      event === Events.PRICE_CHECK
        ? `Checking price`
        : `Price changed from ${previousPrice}-${currentPrice}`;
    const logEntryString = `${timestamp} - ${event} - ${eventDetails}`;

    // Append data to the log file
    fs.appendFileSync(
      logFilePath,
      isFileEmpty ? `${header}\n${logEntryString}` : `\n${logEntryString}`
    );
  } catch (error) {
    console.error("Error writing to log file:", error);
    throw error;
  }
}

// Export scrapePrice function
module.exports = {
  scrapePrice,
  writeToLog,
};
