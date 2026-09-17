const axios = require("axios");

const scanUrlWithVirusTotal = async (url) => {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;

  if (!apiKey) {
    throw new Error("VirusTotal API key is not configured");
  }

  const formData = new URLSearchParams();
  formData.append("url", url);

  const response = await axios.post(
    "https://www.virustotal.com/api/v3/urls",
    formData,
    {
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

const getVirusTotalAnalysis = async (analysisId) => {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;

  if (!apiKey) {
    throw new Error("VirusTotal API key is not configured");
  }

  const response = await axios.get(
    `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
    {
      headers: {
        "x-apikey": apiKey,
      },
    }
  );

  return response.data;
};

module.exports = {
  scanUrlWithVirusTotal,
  getVirusTotalAnalysis,
};