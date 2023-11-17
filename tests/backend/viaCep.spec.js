const { test, expect } = require('@playwright/test');
const { ceps } = require('../../helpers/backend/ceps');
const { default: validateJson } = require('../../util/jsonValidator');
const { viaCepSchema } = require('../../helpers/backend/viaCepSchema');
const { viaCepSchemaError } = require('../../helpers/backend/viaCepSchemaError');

test.describe('Suite Test Backend', () => {

    test('Should return a valid zip code', async ({ request }) => {
        const newRequest = await request.get(`https://viacep.com.br/ws/${ceps.cepValido}/json/`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest).toBeOK(); // Status code 200..299
        await expect(validateJson(await newRequest.json(), viaCepSchema)).toBe(true);
    });

    test('Should return a invalid zip code', async ({ request }) => {
        const newRequest = await request.get(`https://viacep.com.br/ws/${ceps.cepInvalido}/json/`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest).toBeOK(); // Status code 200..299
        await expect(validateJson(await newRequest.json(), viaCepSchemaError)).toBe(true);
    });
});