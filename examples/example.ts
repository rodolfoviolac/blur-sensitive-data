import Obfuscator from "../dist/index";

const dirtyStringData = 'this is a string with Credit Card Number 4024-0071-4571-8614, CPF 222.222.222-22 with obfuscator';
const dirtyObjectData = {
    password: 'this is a key',
    Api_key: 'test string api_key',
    teste: 'test string teste',
    alguma: {
        password: 'test string password',
        teste: {
            password: 'test string nested password',
            obfuscator: 'test string obfuscator'
        }
    }
}

const obf = new Obfuscator({
    replacerText: 'NOT_VISIBLE',
    stringPatterns: [Obfuscator.EStringLookUpFields.CPF, Obfuscator.EStringLookUpFields.CREDIT_CARD],
    additionalStringPatterns: [/obfuscator/],
    additionalObjectKeys: ['obfuscator']
});
const clearDataObject = obf.blur(dirtyObjectData);
const clearDataString = obf.blur(dirtyStringData);

console.log(clearDataObject);
console.log(clearDataString);

