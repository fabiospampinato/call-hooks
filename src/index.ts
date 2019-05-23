
/* IMPORT */

import {Args, Result, Hooks} from './types';

/* CALL HOOKS */

function callHooks ( fn: Function, hooks: Hooks ): Function {

  /* EVENTS */

  function onResult ( args: Args, callResult: Result ): Result {

    const result = hookResult ( args, callResult );

    hookAfter ( args, result );

    return result;

  }

  function onError ( args: Args, err: Error ) {

    hookAfter ( args, err );

    throw err;

  }

  /* HOOKS */

  function hookArgs ( args: Args ): Args {

    if ( !hooks.args ) return args;

    return hooks.args ( args );

  }

  function hookBefore ( args: Args ): void {

    if ( !hooks.before ) return;

    hooks.before ( args );

  }

  function hookCall ( args: Args, thisArg ): Result {

    if ( !hooks.call ) return fn.apply ( thisArg, args );

    return hooks.call.call ( thisArg, args );

  }

  function hookResult ( args: Args, result ): Result {

    if ( !hooks.result ) return result;

    return hooks.result ( args, result );

  }

  function hookAfter ( args: Args, result: Result ): void {

    if ( !hooks.after ) return;

    hooks.after ( args, result );

  }

  /* WRAPPER */

  function wrapper () {

    const args = hookArgs ( arguments );

    try {

      hookBefore ( args );

      const callResult = hookCall ( args, this );

      if ( callResult instanceof Promise ) {

        return callResult.then ( callResult => onResult ( args, callResult ) )
                         .catch ( err => onError ( args, err ) );

      } else {

        return onResult ( args, callResult );

      }

    } catch ( err ) {

      return onError ( args, err );

    }

  }

  return wrapper;

}

/* EXPORT */

export default callHooks;
