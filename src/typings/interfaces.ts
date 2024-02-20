import { EStringPatterns } from './enums';

export interface IBlurSettings {
	additionalObjectKeys?: string[];
	additionalStringPatterns?: RegExp[];
	stringPatterns?: EStringPatterns[];
	replacerText?: string;
}

export type TTargetFieldType = string | Record<string, unknown>;
