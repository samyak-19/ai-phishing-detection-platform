const {
  scanUrlWithVirusTotal,
  getVirusTotalAnalysis,
} = require("../../services/virustotal.service");

const {
  checkUrlWithSafeBrowsing,
} = require("../../services/safeBrowsing.service");

const scanUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
      });
    }

    const scanResult = await scanUrlWithVirusTotal(url);

    const analysisId = scanResult.data.id;

    const analysisResult = await getVirusTotalAnalysis(analysisId);

    const safeBrowsingResult = await checkUrlWithSafeBrowsing(url);

    res.json({
      success: true,
      message: "URL scanned successfully",
      data: {
        url,
        analysisId,
        analysis: analysisResult.data,
        virusTotal: analysisResult.data,
        safeBrowsing: safeBrowsingResult,
      },
    });
  } catch (error) {
    console.error("URL scan error:", error.message);

    res.status(500).json({
      success: false,
      message: "URL scan failed",
    });
  }
};

module.exports = {
  scanUrl,
};