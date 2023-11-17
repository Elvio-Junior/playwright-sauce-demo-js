import { validate } from 'jsonschema';

function validateJson(jsonResponse, jsonSchema) {
    return validate(jsonResponse, jsonSchema).valid;
}

export default validateJson;
