const { query } = require('express-validator');

const ingredientsSanitizerFn = (value) => (!value ? [] : value.split(','));

const ingredientsSanitizer = query('i').customSanitizer(ingredientsSanitizerFn);

export const ingredientsValidator = () => {
  const min = 1;
  const max = 3;
  const message = `Você deve fornercer ao menos ${min} e no máximo ${max} ingredientes`;

  return [
    ingredientsSanitizer,
    query('i', message).isArray({
      min: 1,
      max: 3,
    }),
  ];
};
