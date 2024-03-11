- How the application works
  - Initially the application loads the html for the target page. A DOM manipulation library called Cheerio is used to navigate the DOM tree to find the necessary element and grab the price from there, alternatively if the price is not found in this tag then it looks for another tag which will likely have the price. Once checkPriceAndNotify is ran once it sets the lastprice variable to the current price which will be used by the program after fifteen minutes to compare if the latest price has dropped compared to the previous one. The application also maintains a log of price changes and notification events. This includes timestamped entries of price checks and any notifications sent.

* How to configure and use the application

- Step 1: **Make sure you have Node installed in your system.**
  Windows:
  Visit the official Node.js website: Node.js Downloads.
  Download the Windows installer (.msi file).
  Double-click the downloaded file and follow the installation wizard instructions.
  macOS:
  Visit the official Node.js website: Node.js Downloads.
  Download the macOS installer (.pkg file).
  Double-click the downloaded file and follow the installation wizard instructions.
  Linux:
  You can install Node.js using your distribution's package manager, such as apt, yum, or dnf, depending on your Linux distribution. For example, on Ubuntu/Debian:
  sudo apt update
  sudo apt install nodejs npm
- Step 2: ** Install the required dev dependencies using **
  npm install
- Step 3: ** To run the program locally and get desktop notifications **
  node Pricechecker.js
  ** For Testing: npm test **

* A brief discussion of any challenges faced and how they were overcome
  At first without providing user-agent amazon was returning an html with fake price of the item. Providing user-agents identifies these requests as requests from a browser and improves functionality. Figuring out correct testing strategy was complicated as it needed to mimick the changing of the price in real-time.

* Any additional features implemented beyond the basic requirements and / or any extension to the project that is desired
  WIP

* Any details on testing performed as part of the project to ensure the project meets the requirements
  For proper testing of notification being sent during price drop events i wrote automated tests which can be ran by using npm test. This test asserts if notifications were sent to users when price dropped.
