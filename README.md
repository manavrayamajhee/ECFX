- How the application works
  - The app begins by fetching the HTML of the target page and employs Cheerio for DOM traversal to locate the price element. In case the price isn't found in the primary tag, it searches in alternative tags typically containing the price. Upon the initial execution of `checkPriceAndNotify`, the current price is compared with the last known price, which is initially set to null. If the current price is valid (not null), it's logged and stored as the last known price for subsequent comparisons. Additionally, the app maintains a log recording timestamped entries for every price check and any notifications dispatched. This comprehensive log ensures traceability and monitoring of price fluctuations and notification events over time.

* How to configure and use the application

- Step 1: **Make sure you have Node installed in your system.**
  - Windows:
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
- Step 2: **Install the required dev dependencies using**
  - npm install
- Step 3: **To run the program locally and get desktop notifications**
  - node Pricechecker.js
    **For Testing: npm test**

* A brief discussion of any challenges faced and how they were overcome

  - At first without providing user-agent amazon was returning an html with fake price of the item. Providing user-agents identifies these requests as requests from a browser and improves functionality. Figuring out correct testing strategy was complicated as it needed to mimick the changing of the price in real-time.

* Any details on testing performed as part of the project to ensure the project meets the requirements
  - For proper testing of notification being sent during price drop events i wrote automated tests which can be ran by using npm test. This test asserts if notifications were sent to users when price dropped.
