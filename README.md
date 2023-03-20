# Toolkit Package

This package provides helpers to develop an app using Azuro Protocol.


## Installation

```
npm i --save @azuro-org/toolkit
```


## Helpers

### `aggregateOutcomesByMarkets.ts`

This helper function allows you to aggregate outcomes that are obtained from conditions by markets. This function takes 
an array of conditions and groups outcomes by their market key. It then sorts the outcomes within each market group 
and returns an array of market objects, each containing an array of outcomes.

Here is an example of how you can use it:

```graphql
query Game($id: String!) {
  game(id: $id) {
    liquidityPool {
      address
    }
    conditions {
      conditionId
      coreAddress
      outcomes {
        outcomeId
      }
    }
  }
}
```

```ts
type Conditions = {
  conditionId: string
  coreAddress: string
  outcomes: {
    outcomeId: string
  }
}

aggregateOutcomesByMarkets({
  lpAddress: game.liquidityPool.lpAddress,
  conditions: game.conditions,
  dictionaries, // **
})
```

The result will be of type

```ts
type Outcome = {
  selectionName: string
  conditionId: string
  outcomeId: string
  lpAddress: string
  coreAddress: string
}

type OutcomesByMarkets = {
  marketName: string
  outcomes: Outcome[][] // *
}[]
```

`*` returned `outcomes` are wrapped with additional array `Outcome[][]` 

`**`  `dictionaries` contain a set of texts for each outcome ID used in Azuro. These texts can be used to display outcomes 
in a user-friendly way and provide more context about what the outcome represents. Dictionaries are an important 
component of Azuro's infrastructure as they allow for standardized and consistent outcomes across all markets and events. 
[Read more about dictionaries](https://azuro-v2-docs.surge.sh/build-own-app/dive-deeper/dictionaries).

---

You can pass additional data in outcomes if required, the helper will add it to outcomes in the result:

```graphql {11}
query Game($id: String!) {
  game(id: $id) {
    ...
    conditions {
      ...
      outcomes {
        ...
        odds
      }
    }
  }
}
```

```ts
type MyOutcome = {
  outcomeId: string
  odds: string
}

aggregateOutcomesByMarkets<MyOutcome>(...)
```

The result will be of type

```ts {7}
type Outcome = {
  selectionName: string
  conditionId: string
  outcomeId: string
  lpAddress: string
  coreAddress: string
  odds: string
}

type OutcomesByMarkets = {
  marketName: string
  outcomes: Outcome[][]
}[]
```
