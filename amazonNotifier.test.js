// Import the function to test
const { checkPriceAndNotify } = require("./checkPriceAndNotify");
const notifier = require("node-notifier");
jest.mock("fs");
jest.mock("node-notifier", () => ({
  notify: () => {
    console.log("Notification Sent");
    return {
      message: "The price of the iPad has changed to $__ from $__",
      title: "iPad Price Alert",
    };
  },
}));

jest.mock("./index", () => {
  const originalModule = jest.requireActual("./index");
  return {
    ...originalModule,
    scrapePrice: () => Math.random() * 1000,
  };
});

describe("Price Checker App", () => {
  it("should check price drops and notify", async () => {
    const notifySpy = jest.spyOn(notifier, "notify");

    for (let i = 0; i < 100; i++) {
      await checkPriceAndNotify();

      if (notifySpy.mock.calls.length > 0) {
        expect(notifySpy).toHaveBeenCalledWith({
          message: expect.stringMatching(
            "The price of the iPad has changed to"
          ),
          title: "iPad Price Alert",
        });
        break; // Exit the loop if notification is sent
      }
    }
    expect(notifySpy).toHaveBeenCalled();
  });
});
