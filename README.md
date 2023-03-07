# Toolkit Package

This package provides helpers to develop an app using Azuro Protocol.


## Installation

```
npm i --save @azuro-org/toolkit
```


## CLI

All dictionaries stored in [public repository](https://github.com/Azuro-protocol/public-config/tree/main/dictionaries).
For ease of use, the dictionaries have a version and file format.

It's easy to download dictionary files with CLI. In your package.json add script:

```json
"scripts": {
  "get-dicts": "dictionaries -o {OUTPUT_DIR} -v {VERSION} -t {FILES_TYPE}"
}
```

- `VERSION` is the version of downloaded dictionaries. [Find the version you need here](https://github.com/Azuro-protocol/public-config/tree/main/dictionaries).
- `OUTPUT_DIR` is the directory where to put downloaded files.
- `FILES_TYPE` is the extension of downloaded files. Accepts `ts`, `js`, `maps`, `arrays`. `maps` and `arrays` are 
json files with different output format.

```bash
dictionaries -o ./dist -v 2.0.0 -t ts # will download v2.0.0 typescript files to ./dist directory
```


## Helpers

```js
import { getMarketKey, getMarketName, getMarketDescription, assembleMarketName, assembleSelectionName } from '@azuro-org/dictionaries'
```

### Get market name and description

```js
import { getMarketKey } from '@azuro-org/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

const outcomeId = 1
const marketKey = getMarketKey(outcomeId, dictionaries)
```

`getMarketKey(outcomeId, dictionaries)` returns the string key `marketId-gamePeriodId-gameTypeId[-teamPlayerId]` 
built from the dictionaries related to passed `outcomeId`.

In the example above the result is `1-1-1`.

There are two dictionary files `marketNames.js` and `marketDescriptions.js`. `marketKey` is used to receive market name 
and description for specific outcome ID.

```
import dictionaries from './path-to-downloaded-dictionaries'

dictionaries.marketNames['1-1-1'] // "Full Time Result" 
dictionaries.marketDescriptions['1-1-1'] // "You predict the result..."
```

**!!! Note that there are no texts for each `outcomeId` !!!**

`marketNames[marketKey]` and `marketDescriptions[marketKey]` may return `undefined`. For `marketName` generation there 
is other helper `assembleMarketName`. It generates human readable market name based on outcome `marketId`, `gamePeriodId`, 
`gameTypeId`, `teamPlayerId`.

```
import { getMarketKey, assembleMarketName } from '@azuro-org/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

const outcomeId = 42
const marketKey = getMarketKey(outcomeId, dictionaries)

let marketName = dictionaries[marketKey] // undefined

if (!marketName) {
  marketName = assembleMarketName(outcomeId, dictionaries) // "Whole game - Winner of match Goal"
}
```

There are additional 2 sugar helpers:

```js
import { getMarketName } from '@azuro-org/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

getMarketName(1, dictionaries) // "Full Time Result"
getMarketName(42, dictionaries) // "Whole game - Winner of match Goal"
```

```js
import { getMarketDescription } from '@azuro-org/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

getMarketDescription(1, dictionaries) // "You predict the result..."
getMarketDescription(42, dictionaries) // undefined. Note that there is no `assemblyMarketDescription` helper.
```

### Get selection (outcome) name

```js
import { assembleSelectionName } from '@azuro-org/dictionaries'
import dictionaries from './dist'

const outcomeId = 1
const selectionName = assembleSelectionName(outcomeId, dictionaries) // "Yes"

const outcomeId = 4
const selectionName = assembleSelectionName(outcomeId, dictionaries) // "Team 2 (4.5)"
```
