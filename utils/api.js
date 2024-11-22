import axios from "axios";

export const apiToken = "sxw4qSJHIsceAgseZGp8AMANNthw";

export const apiBaseUrl =
  "https://test.api.amadeus.com/v2/shopping/flight-offers";

const clientId = "uxaXMaqwPVQRKOb4fXUN5CWFSA70";
const clientSecret = "jDVoDWGvvW4q4w4m";
let newApiToken = "";

const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      `https://test.api.amadeus.com/v1/security/oauth2/token`,
      {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    newApiToken = response.data.access_token;
    console.log("newApiToken", newApiToken);
  } catch (error) {
    console.error(error);
  }
};
getNewAccessToken();
