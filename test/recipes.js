import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import querystring from 'querystring';
import app from '../src/app';

chai.use(chaiHttp);

const getRecipes = (ingredients) => {
  const query = querystring.stringify({ i: ingredients.join(',') });
  const url = `/api/recipes?${query}`;

  return chai.request(app).get(url);
};

const expectError = (body) => {
  expect(body).to.have.property('errors').that.is.an('array');

  const {
    errors: [error],
  } = body;

  return error;
};

describe('Recipes API', () => {
  it('When at least 1 and a maximum of 3 ingredients are provided, a list of recipes should be returned', async () => {
    const ingredients = ['meet', 'garlic'];

    const { status, body } = await getRecipes(ingredients);

    expect(status).to.be.equal(200);

    expect(body).to.have.property('keywords').that.is.deep.equal(ingredients);

    expect(body).to.have.property('recipes').that.is.an('array');
  });

  it('When no ingredient is provided, it should return status 422 with validation errors', async () => {
    const ingredients = [];

    const { status, body } = await getRecipes(ingredients);

    expect(status).to.be.equal(422);

    const error = expectError(body);

    expect(error).to.have.property('value').that.is.an('array').and.is.empty;
  });

  it('When more than 3 ingredients are provided, it should return status 422 with validation errors', async () => {
    const ingredients = ['beef', 'onions', 'garlic', 'potatoes'];

    const { status, body } = await getRecipes(ingredients);

    expect(status).to.be.equal(422);

    const error = expectError(body);

    expect(error)
      .to.have.property('value')
      .that.is.an('array')
      .and.to.deep.equal(ingredients);
  });
});
