import axios from "axios";

const baserUrl = "https://restcountries.com/v3.1/all";

const getAll = async () => {
  const response = await axios.get(baserUrl);
  return response.data;
};

export default { getAll };
