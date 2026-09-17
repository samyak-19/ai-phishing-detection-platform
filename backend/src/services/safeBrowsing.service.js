const axios = require("axios");

const checkUrlWithSafeBrowsing = async (url) => {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

  if (!apiKey) {
    throw new Error("Google Safe Browsing API key is not configured");
  }

  const response = await axios.post(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
    {
      client: {
        clientId: "ai-phishing-detection-platform",
        clientVersion: "1.0.0",
      },
      threatInfo: {
        threatTypes: [
          "MALWARE",
          "SOCIAL_ENGINEERING",
          "UNWANTED_SOFTWARE",
          "POTENTIALLY_HARMFUL_APPLICATION",
        ],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [
          {
            url,
          },
        ],
      },
    }
  );

  return response.data;
};

module.exports = {
  checkUrlWithSafeBrowsing,
};