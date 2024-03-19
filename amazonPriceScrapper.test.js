const axios = require("axios");
const { scrapePrice } = require("./index");
jest.mock("axios");

describe("scrapePrice", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should scrape the price correctly", async () => {
    const mockHtml = `
      <div id="corePriceDisplay_desktop_feature_div">
        <span class="a-price-whole">10</span>
        <span class="a-price-fraction">99</span>
      </div>
    `;
    const mockResponse = {
      data: mockHtml,
    };
    axios.get.mockResolvedValue(mockResponse);

    const price = await scrapePrice();
    expect(price).toEqual(10.99);
  });

  it("should handle alternative price scraping when specific classes are not found", async () => {
    const mockHtml = `
      <div id="corePrice_feature_div">
        <span class="a-offscreen">$9.99</span>
      </div>
    `;
    const mockResponse = {
      data: mockHtml,
    };
    axios.get.mockResolvedValue(mockResponse);

    const price = await scrapePrice();
    expect(price).toEqual(9.99);
  });

  it("should return null and log error when scraping fails", async () => {
    const errorMessage = "Failed to fetch data";
    axios.get.mockRejectedValue(new Error(errorMessage));

    console.error = jest.fn();

    const price = await scrapePrice();
    expect(price).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      "Error scraping price:",
      new Error(errorMessage)
    );
  });
});
