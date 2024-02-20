import { IBlurSettings, TTargetFieldType } from './typings/interfaces';
import securityObjectFieldCleaner from './utils/objectHandler';
import { customSensitiveFields } from './utils/sensitiveFields';
import { securityStringFieldCleaner } from './utils/stringHandler';
import { stringPatterns } from './utils/stringsPatterns';
import { EStringPatterns } from './typings/enums';

const sensitiveFields = require('sensitive-fields');

export class Obfuscator {
	static readonly EStringLookUpFields = EStringPatterns;

	readonly EStringLookUpFields = Obfuscator.EStringLookUpFields;

	blurSettings: IBlurSettings = {
		replacerText: 'NOT_VISIBLE_SECURITY_REASON',
		stringPatterns: [
			EStringPatterns.CPF,
			EStringPatterns.CNPJ,
			EStringPatterns.RG,
			EStringPatterns.PHONE,
			EStringPatterns.CREDIT_CARD,
			EStringPatterns.UUID,
			EStringPatterns.OBJECT_ID,
		],
	};

	constructor(blurSettings?: IBlurSettings) {
		Object.assign(this.blurSettings, blurSettings);
	}

	public blur(rawData: TTargetFieldType) {
		const rawDataType = typeof rawData;

		if (rawData === null || rawData === undefined)
			throw new Error('Blur data type null or undefined is not supported');

		switch (rawDataType) {
			case 'object':
				return this.handleObjectData(rawData as Record<string, unknown>);
			case 'string':
				return this.handleStringData(rawData as string);
			default:
				throw new Error(`Blur data type ${rawDataType} not supported`);
		}
	}

	private handleObjectData(rawData: Record<string, unknown>): Record<string, unknown> {
		const lookUpFields = [
			...customSensitiveFields,
			...sensitiveFields,
			...(this.blurSettings?.additionalObjectKeys || []),
		];
		return securityObjectFieldCleaner(rawData, lookUpFields, this.blurSettings.replacerText);
	}

	private handleStringData(rawData: string): string {
		const lookUpFieldsPatterns = this.handleStringPatterns();
		return securityStringFieldCleaner(
			rawData,
			lookUpFieldsPatterns,
			this.blurSettings.replacerText,
		);
	}

	private handleStringPatterns(): RegExp[] {
		const lookUpFields = [...(this.blurSettings.additionalStringPatterns || [])];
		for (const pattern of this.blurSettings.stringPatterns || []) {
			lookUpFields.push(stringPatterns[pattern]);
		}
		return lookUpFields;
	}
}

module.exports = {
	Obfuscator,
};
