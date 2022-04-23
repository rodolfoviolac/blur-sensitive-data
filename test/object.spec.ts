import Obfuscator from "../dist/cjs";

const replacerText = `NOT_VISIBLE`

function generateText(defaultDirtyStringData: string | object){
    const obf = new Obfuscator({
        replacerText: replacerText,
    });
    return obf.blur(defaultDirtyStringData);
}


describe('Blur Value successfully from object', () => {
    it('Validate authorization token ', () => {
        const dirtyObject = {
            authorization: 'token',
        }
        const clearData = generateText(dirtyObject);
        expect(clearData).toEqual({authorization: replacerText});
    });

    it('Validate deep password token ', () => {
        const dirtyObject = {
            obj: {
                obj: {
                    password: 'token'
                }
            },
        }
        const clearData = generateText(dirtyObject);
        expect(clearData).toEqual({obj: { obj: { password: replacerText } } });
    });

    it('Validate cvv token', () => {
        const dirtyObject = {
            cvv: 'token',
        }
        const clearData = generateText(dirtyObject);
        expect(clearData).toEqual({cvv: replacerText});
    });

    it('Validate additional object key', () => {
        const obf = new Obfuscator({
            replacerText: replacerText,
            additionalObjectKeys: ['obfuscator']
        });
        expect(obf.blur({obfuscator: 'teste'})).toEqual({obfuscator: replacerText});
    });
});
