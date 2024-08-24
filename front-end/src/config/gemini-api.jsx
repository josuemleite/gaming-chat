import axios from "axios";

const getApiData = async (client_query) => {
  try {
    const response = await axios.post(
      "https://gaming-chat-framgefcauc5h9g4.eastus-01.azurewebsites.net/api",
      {
        query: client_query,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error(error);
  }
};

export default getApiData;
