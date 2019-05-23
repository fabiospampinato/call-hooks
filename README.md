# Call Hooks

Function for adding before/after/call/args/result hooks to another function.

It supports both regular and async functions, even if they may throw.

## Install

```sh
npm install --save call-hooks
```

## Usage

This function has the following interface:

```ts
function callHooks ( fn: Function, hooks: Hooks ): Function;
```

These are the supported hooks:

```ts
{
  args: ( args: any[] ) => any[],
  before: ( args: any[] ) => void,
  call: ( args: any[] ) => Result,
  result: ( args: any[], result: any ) => any,
  after: ( args: any[], result: any | Error ) => void
}
```

## Hooks

Hooks are called in the following order:

##### Args

The `args` hook is the first one called, its returned value will be the actual arguments object used:

```ts
import hooks from 'call-hooks';
import fn from './my_fn';

const fnWithHooks = hooks ( fn, {
  args ( args ) {
    if ( args.length === 1 ) return args; // Not overriding the arguments
    return [...args, true]; // Overriding the arguments
  }
});
```

##### Before

The `before` hook is called before the wrapped function will be executed:

```ts
import hooks from 'call-hooks';
import fn from './my_fn';

const fnWithHooks = hooks ( fn, {
  before ( args ) {
    console.log ( 'Called with arguments:', args );
  }
});
```

##### Call

The `call` hook is called instead of the wrapped function:

```ts
import hooks from 'call-hooks';
import fn from './my_fn';

const fnWithHooks = hooks ( fn, {
  call ( args ) {
    if ( args.length === 0 ) return null; // Overriding the function
    return fn.apply ( this, args ); // Not overriding the function
  }
});
```

##### Result

The `result` hook is called after the wrapped function has been executed, its returned value will be the actual return value:

```ts
import hooks from 'call-hooks';
import fn from './my_fn';

const fnWithHooks = hooks ( fn, {
  result ( args, result ) {
    if ( isNaN ( result ) ) return 0; // Overriding the returned value
    return result; // Not overriding the returned value
  }
});
```

##### After

The `after` hook is the last one called:

```ts
import hooks from 'call-hooks';
import fn from './my_fn';

const fnWithHooks = hooks ( fn, {
  after ( args, result ) {
    console.log ( 'Returned result:', result );
  }
});
```

## License

MIT © Fabio Spampinato
