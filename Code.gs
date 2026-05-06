// ============================================================
//  Gold Tracker – Google Apps Script Backend
//  Deploy as Web App: Execute as "Me", Access "Anyone"
// ============================================================

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('Gold Tracker')
    // This forces the app to fit the phone screen exactly
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Called from the frontend via google.script.run
 * Fetches live gold price from razak.com.my — no CORS issues server-side
 */
function getRazakGoldPrice() {
  try {
    var payload = JSON.stringify({
      elements: [{
        id: "gold_69f9c79eea234",
        type: "gold",
        weight: "1",
        addon: "-7.91"
      }],
      nonce: "2ffd30d9c2"
    });

    var options = {
      method: "post",
      contentType: "application/json",
      payload: payload,
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(
      "https://razak.com.my/wp-json/gpo/v1/price",
      options
    );

    var code = response.getResponseCode();
    if (code !== 200) {
      return { success: false, error: "HTTP " + code };
    }

    var json = JSON.parse(response.getContentText());
    var price = json.data.prices["gold_69f9c79eea234"];

    if (!price) {
      return { success: false, error: "Price key not found in response" };
    }

    return {
      success: true,
      price: parseFloat(price),
      timestamp: new Date().toISOString()
    };

  } catch (e) {
    return { success: false, error: e.toString() };
  }
}
