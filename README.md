<div style="text-align:center">
<a href=""><img src="https://i.imgur.com/6hcZWUS.png" style="display:block; margin:auto; width:100%; max-width:100%" alt="Blur sensitive data logo"/></a>
<h1>Obfuscate what metters</h1>
<strong>Remove any sensitive information instantly from your data</strong>

</div>

A simple tool to remove all sensitive data from structures, so they can be used safely. Go from `my credit card number is 4024-0071-4571-8614` to `my credit card number is NOT_VISIBLE` and much more!

[![Maintainability](https://api.codeclimate.com/v1/badges/02470fd9db37baa27160/maintainability)](https://codeclimate.com/github/rodolfoviolac/blur-sensitive-data/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/02470fd9db37baa27160/test_coverage)](https://codeclimate.com/github/rodolfoviolac/blur-sensitive-data/test_coverage)
<a href="https://twitter.com/acdlite/status/974390255393505280">
<img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a>

## Installing

Using npm:
```bash
$ npm install blur-sensitive-data
```

Using yarn:
```bash
$ yarn add blur-sensitive-data
```

## How to use

```typescript
const ob = require('blur-sensitive-data');

const obf = new ob.Obfuscator().blur("Credit Card Number 4024-0071-4571-8614");

//output: Credit Card Number NOT_VISIBLE_SECURITY_REASON
```

| STRUCTURES | DESCRIPTION                                                                                                                                                                                                                                                                                                                             |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `object`   | Obfuscation happens on any value at which the key is considered sensitive. +2k keys are parsed by default and you can add more values to obfuscate, the default fields are based on [cabinjs sensitive list](https://github.com/cabinjs/sensitive-fields).                                                                              | 
| `string`   | The obfuscation happens in the patterns that are considered sensitive, the match is done by regex. By default we offer some patterns to obfuscate whether the sentence is formatted or not: `Brazilian CPF`, `Brazilian CNPJ`, `Brazilian RG`, `Phone Number`, `Object Id`, `UUID` and `Credit Card Number`, other values can be added. |

### Objects

The library supports objects whether they are simple or deep, keyword scanning is done on the entire object, there is also a layer to remove circular dependency if it is present.

```typescript
import Obfuscator from 'blur-sensitive-data';

const dirtyObjectData = {
    Api_key: 'test string api_key',
    test: 'test string teste',
    some: {
        password: 'test string password',
        test: {
            password: 'test string nested password',
            obfuscator: 'test string obfuscator'
        }
    }
}
const configObject = {
    additionalObjectKeys: ['obfuscator']
}

const obf = new Obfuscator(configObject);
const clearData = obf.blur(dirtyObjectData);

//Output:
//{
//    password: 'NOT_VISIBLE_SECURITY_REASON',
//    Api_key: 'NOT_VISIBLE_SECURITY_REASON',
//    test: 'test string teste',
//    some: {
//      password: 'NOT_VISIBLE_SECURITY_REASON',
//      test: {
//        password: 'NOT_VISIBLE_SECURITY_REASON',
//        obfuscator: 'NOT_VISIBLE_SECURITY_REASON'
//    }
//}
//}


```

### Possible parameters for customizing objects obfuscator

| PARAM                | TYPE       | MANDATORY | DESCRIPTION                                    |
|----------------------|------------|-----------|------------------------------------------------|
| replacerText         | `string`   | :x:       | Text to make sensitive parameter substitution. |
| additionalObjectKeys | `string[]` | :x:       | Additional keys to obfuscate.                  |

### String

The library supports type string, in this case the obfuscation is done by matching the searched pattern, whether it is presented only in the sentence or multiple times, and can be in several differents formats and/or intertwined with other texts.

```typescript
import Obfuscator from 'blur-sensitive-data';

const dirtyStringData = 'this is a string with Credit Card Number 4024-0071-4571-8614, CPF 222.222.222-22 with obfuscator';
const configObject = {
    replacerText: 'NOT_VISIBLE',
    stringPatterns: [Obfuscator.EStringLookUpFields.CPF, Obfuscator.EStringLookUpFields.CREDIT_CARD],
    additionalStringPatterns: [/obfuscator/]
}

const obf = new Obfuscator(configObject);
const clearData = obf.blur(dirtyStringData);

//output: this is a string with Credit Card Number NOT_VISIBLE, CPF NOT_VISIBLE with NOT_VISIBLE
```

### Possible parameters for customizing the strings obfuscator

| PARAM                    | TYPE                    | MANDATORY  | DESCRIPTION                                                                                                   |
|--------------------------|-------------------------|------------|---------------------------------------------------------------------------------------------------------------|
| replacerText             | `string`                | :x:        | Text to make sensitive parameter substitution.                                                                |
| stringPatterns           | `EStringLookUpFields[]` | :x:        | Sensitive default settings for substitution. If omitted, obfuscation will be done by default sensitive types. |
| additionalStringPatterns | `RegExp[]`              | :x:        | Alternative patterns for obfuscating.                                                                         |




