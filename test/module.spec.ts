import Obfuscator from "../dist";
import {TTargetFieldType} from "../src/typings/interfaces";

describe('Testing Obfuscator module and structures', () => {

    it('Obfuscator defined', () => {
        expect(Obfuscator).toBeDefined();
    });

    it('Obfuscator blur defined', () => {
        const obf = new Obfuscator();
        expect(obf.blur('')).toBeDefined();
    });

    it('Obfuscator blur empty result empty', () => {
        const obf = new Obfuscator();
        expect(obf.blur('')).toEqual('');
    });

    it('Obfuscator blur empty result empty with config', () => {
        const obf = new Obfuscator({
            replacerText: 'NOT_VISIBLE',
            stringPatterns: [Obfuscator.EStringLookUpFields.CPF, Obfuscator.EStringLookUpFields.CREDIT_CARD],
            additionalStringPatterns: [/obfuscator/],
            additionalObjectKeys: ['obfuscator']
        });
        expect(obf.blur('')).toEqual('');
    });

    it('Obfuscator EStringLookUpFields to be defined', () => {
        expect(Obfuscator.EStringLookUpFields).toBeDefined();
    });

    it('Obfuscator change replacer text', () => {
        const obf = new Obfuscator({
            replacerText: 'NOT_VISIBLE',
        });
        expect(obf.blur('222.222.222-54')).toEqual('NOT_VISIBLE');
    });

    it('Obfuscator blur new pattern string', () => {
        const obf = new Obfuscator({
            replacerText: 'NOT_VISIBLE',
            additionalStringPatterns: [/obfuscator/],
        });
        expect(obf.blur('obfuscator')).toEqual('NOT_VISIBLE');
    });

    it('Obfuscator without replacer text', () => {
        const obf = new Obfuscator();
        expect(obf.blur('222.222.222-54')).not.toEqual('222.222.222-54');
    });

    it('Obfuscator with different type of input', () => {
        const obf = new Obfuscator();
        expect(obf.blur);
        expect(obf.blur.bind(true as unknown as TTargetFieldType)).toThrow(/Data type not supported/);
    });

});
