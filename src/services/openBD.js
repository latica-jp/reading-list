import axios from 'axios';

export const fetchBDData = async isbn => {
  try {
    const json = await axios.get(`https://api.openbd.jp/v1/get?isbn=${isbn}`);
    const { summary } = json.data[0];
    return summary;
  } catch (error) {
    return null;
  }
};
