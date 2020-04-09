import axios from 'axios';
import querystring from 'querystring';
import { GIPHY_API_URL, GIPHY_API_KEY } from '../config';
import { ExternalDependencyError } from '../errors';

const getRandomIndex = (count) => Math.floor(Math.random() * count);

const search = async (term) => {
  const query = querystring.stringify({
    api_key: GIPHY_API_KEY,
    q: term,
    rating: 'G',
  });
  const url = `${GIPHY_API_URL}/search?${query}`;

  try {
    const {
      data: { data, pagination },
    } = await axios.get(url);

    if (pagination.count === 0) {
      return '';
    }

    const index = getRandomIndex(pagination.count);
    const gif = data[index];

    return gif.embed_url;
  } catch (err) {
    console.error(err.response);
    const message = 'Nosso criador de GIFs está indisposto no momento';
    const dependency = 'GIPHY';
    throw new ExternalDependencyError(message, dependency);
  }
};

export default { search };
