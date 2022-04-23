import Obfuscator from "../dist/cjs/index";
import {EStringPatterns} from "../src/typings/enums";


const replacerText = `NOT_VISIBLE`
function generateText(defaultDirtyStringData: string, pattern: EStringPatterns){
    const obf = new Obfuscator({
        replacerText: replacerText,
        stringPatterns: [pattern]
    });
    return obf.blur(defaultDirtyStringData);
}

describe('String module validator', () => {
    it('Validate all type of strings', () => {
        const obf = new Obfuscator({
            replacerText: replacerText,
            additionalStringPatterns: [/obfuscator/],
            additionalObjectKeys: ['obfuscator']
        });
        const dirtyString = '222.222.222-22 18.990.682/0001-92 37.542.696-6 69620-970 (17) 99703-2334 5570 8276 3756 9596'
        expect(obf.blur(dirtyString)).not.toContainEqual('222.222.222-22');
        expect(obf.blur(dirtyString)).not.toContainEqual('18.990.682/0001-92');
        expect(obf.blur(dirtyString)).not.toContainEqual('37.542.696-6');
        expect(obf.blur(dirtyString)).not.toContainEqual('69620-970');
        expect(obf.blur(dirtyString)).not.toContainEqual('(17) 99703-2334');
        expect(obf.blur(dirtyString)).not.toContainEqual('5570 8276 3756 9596');
    });
});

describe('Blur CPF successfully from string', () => {

    it('Validate CPF with pattern: xxx.xxx.xxx-xx ', () => {
        const cpf = '222.222.222-22';
        const defaultDirtyStringData = `this is a string with CPF ${cpf} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CPF);
        expect(clearData).toEqual(`this is a string with CPF ${replacerText} com obfuscator`);
    });

    it('Validate CPF with pattern: xxxxxxxxxxx', () => {
        const cpf = '00000000000'
        const defaultDirtyStringData = `this is a string with CPF ${cpf} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CPF);
        expect(clearData).toEqual(`this is a string with CPF ${replacerText} com obfuscator`);
    });

    it('Validate CPF with pattern: xxxxxxxxxxxxxx', () => {
        const cpf = '00000000000000'
        const defaultDirtyStringData = `this is a string with CPF ${cpf} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CPF);
        expect(clearData).toEqual(`this is a string with CPF ${replacerText} com obfuscator`);
    });

    it('Validate CPF with pattern: xxxxxxxxx-xx', () => {
        const cpf = '000000000-00'
        const defaultDirtyStringData = `this is a string with CPF ${cpf} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CPF);
        expect(clearData).toEqual(`this is a string with CPF ${replacerText} com obfuscator`);
    });

    it('Validate multiples CPF with pattern: xxxxxxxxx-xx', () => {
        const cpf = '000000000-00'
        const defaultDirtyStringData = `this is a string with CPF ${cpf} com obfuscator ${cpf}`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CPF);
        expect(clearData).toEqual(`this is a string with CPF ${replacerText} com obfuscator ${replacerText}`);
    });

});

describe('Blur CNPJ successfully from string', () => {

    it('Validate CNPJ with pattern: xx.xxx.xxx/xxxx-xx ', () => {
        const cnpj = '18.990.682/0001-92';
        const defaultDirtyStringData = `this is a string with CNPJ ${cnpj} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CNPJ);
        expect(clearData).toEqual(`this is a string with CNPJ ${replacerText} com obfuscator`);
    });

    it('Validate CNPJ with pattern: xxxxxxxxxxxxxx ', () => {
        const cnpj = '18990682000192';
        const defaultDirtyStringData = `this is a string with CNPJ ${cnpj} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CNPJ);
        expect(clearData).toEqual(`this is a string with CNPJ ${replacerText} com obfuscator`);
    });

    it('Validate multiple CNPJ with pattern: xx.xxx.xxx/xxxx-xx ', () => {
        const cnpj = '18.990.682/0001-92';
        const defaultDirtyStringData = `this is a string with CNPJ ${cnpj} com obfuscator ${cnpj}`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CNPJ);
        expect(clearData).toEqual(`this is a string with CNPJ ${replacerText} com obfuscator ${replacerText}`);
    });
});

describe('Blur RG successfully from string', () => {

    it('Validate RG with pattern: xx.xxx.xxx-x ', () => {
        const rg = '37.542.696-6';
        const defaultDirtyStringData = `this is a string with RG ${rg} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.RG);
        expect(clearData).toEqual(`this is a string with RG ${replacerText} com obfuscator`);
    });

    it('Validate RG with pattern: xxxxxxxxx ', () => {
        const rg = '375426966';
        const defaultDirtyStringData = `this is a string with RG ${rg} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.RG);
        expect(clearData).toEqual(`this is a string with RG ${replacerText} com obfuscator`);
    });

    it('Validate multiple RG with pattern: xx.xxx.xxx-x ', () => {
        const rg = '37.542.696-X';
        const defaultDirtyStringData = `this is a string with RG ${rg} com obfuscator ${rg}`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.RG);
        expect(clearData).toEqual(`this is a string with RG ${replacerText} com obfuscator ${replacerText}`);
    });
});

describe('Blur CEP successfully from string', () => {

    it('Validate CEP with pattern: xxxxx-xxx', () => {
        const cep = '69620-970';
        const defaultDirtyStringData = `this is a string with CEP ${cep} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CEP);
        expect(clearData).toEqual(`this is a string with CEP ${replacerText} com obfuscator`);
    });

    it('Validate CEP with pattern: xxxxxxxx', () => {
        const cep = '69620970';
        const defaultDirtyStringData = `this is a string with CEP ${cep} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CEP);
        expect(clearData).toEqual(`this is a string with CEP ${replacerText} com obfuscator`);
    });

    it('Validate multiple CEP with pattern: xxxxx-xxx', () => {
        const cep = '69620-970';
        const defaultDirtyStringData = `this is a string with CEP ${cep} com obfuscator ${cep}`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CEP);
        expect(clearData).toEqual(`this is a string with CEP ${replacerText} com obfuscator ${replacerText}`);
    });
});

describe('Blur PHONE successfully from string', () => {
    it('Validate phone number pattern: (xx) xxxxx-xxxx', () => {
        const phone = '(17) 99703-2334';
        const defaultDirtyStringData = `this is a string with PHONE ${phone} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.PHONE);
        expect(clearData).toEqual(`this is a string with PHONE ${replacerText} com obfuscator`);
    });

    it('Validate phone number pattern: xxxxxxx-xxxx', () => {
        const phone = '99703-4225';
        const defaultDirtyStringData = `this is a string with PHONE ${phone} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.PHONE);
        expect(clearData).toEqual(`this is a string with PHONE ${replacerText} com obfuscator`);
    });

    it('Validate phone number pattern: xx xxxxxxxxxxx', () => {
        const phone = '17 997034225';
        const defaultDirtyStringData = `this is a string with PHONE ${phone} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.PHONE);
        expect(clearData).toEqual(`this is a string with PHONE ${replacerText} com obfuscator`);
    });

    it('Validate multi phone number pattern: xx xxxxxxxxxxx', () => {
        const phone = '17 997034225';
        const defaultDirtyStringData = `this is a string with PHONE ${phone} com obfuscator ${phone}`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.PHONE);
        expect(clearData).toEqual(`this is a string with PHONE ${replacerText} com obfuscator ${replacerText}`);
    });
});

describe('Blur CREDIT_CARD successfully from string', () => {
    it('Validate CREDIT_CARD Master pattern: 5570 8276 3756 9596', () => {
        const creditCard = '5570 8276 3756 9596';
        const defaultDirtyStringData = `this is a string with CREDIT_CARD ${creditCard} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CREDIT_CARD);
        expect(clearData).toEqual(`this is a string with CREDIT_CARD ${replacerText} com obfuscator`);
    });

    it('Validate CREDIT_CARD Master pattern: 5570827637569596', () => {
        const creditCard = '5570827637569596';
        const defaultDirtyStringData = `this is a string with CREDIT_CARD ${creditCard} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CREDIT_CARD);
        expect(clearData).toEqual(`this is a string with CREDIT_CARD ${replacerText} com obfuscator`);
    });

    it('Validate CREDIT_CARD Visa pattern: 4485 7303 5094 8764', () => {
        const creditCard = '4485 7303 5094 8764';
        const defaultDirtyStringData = `this is a string with CREDIT_CARD ${creditCard} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CREDIT_CARD);
        expect(clearData).toEqual(`this is a string with CREDIT_CARD ${replacerText} com obfuscator`);
    });

    it('Validate CREDIT_CARD Amex pattern: 3743 996361 20309', () => {
        const creditCard = '3743 996361 20309';
        const defaultDirtyStringData = `this is a string with CREDIT_CARD ${creditCard} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CREDIT_CARD);
        expect(clearData).toEqual(`this is a string with CREDIT_CARD ${replacerText} com obfuscator`);
    });

    it('Validate CREDIT_CARD HiperCard pattern: 6062 8221 3508 0165', () => {
        const creditCard = '6062826450533781';
        const defaultDirtyStringData = `this is a string with CREDIT_CARD ${creditCard} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CREDIT_CARD);
        expect(clearData).toEqual(`this is a string with CREDIT_CARD ${replacerText} com obfuscator`);
    });

    it('Validate CREDIT_CARD Elo pattern: 6362970000457013', () => {
        const creditCard = '6362970000457013';
        const defaultDirtyStringData = `this is a string with CREDIT_CARD ${creditCard} com obfuscator`;
        const clearData = generateText(defaultDirtyStringData, EStringPatterns.CREDIT_CARD);
        expect(clearData).toEqual(`this is a string with CREDIT_CARD ${replacerText} com obfuscator`);
    });
});
