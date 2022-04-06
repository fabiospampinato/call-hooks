
/* IMPORT */

import type {Args, This, Result, Hooks} from './types';

/* MAIN */

const callHooks = <FN extends Function> ( fn: FN, hooks: Hooks ): FN => {

  /* HELPERS */

  const onCall = ( args: Args, thisArg: This ) => {

    if ( hooks.call ) return hooks.call.call ( thisArg, args );

    return fn.apply ( thisArg, args );

  };

  const onResult = ( args: Args, result: Result ) => {

    result = hooks.result ? hooks.result ( args, result ) : result;

    if ( hooks.after ) hooks.after ( args, result );

    return result;

  };

  const onError = ( args: Args, error: unknown ) => {

    if ( hooks.after ) hooks.after ( args, error );

    throw error;

  };

  /* WRAPPER */

  return function callHooksWrapper ( this: This ) {

    const argsv = Array.from ( arguments );
    const args = hooks.args ? hooks.args ( argsv ) : argsv;

    if ( hooks.before ) hooks.before ( args );

    if ( !hooks.after && !hooks.result ) return onCall ( args, this );

    try {

      const result = onCall ( args, this );

      if ( result instanceof Promise ) {

        const onResolve = ( result: Result) => onResult ( args, result );
        const onReject = ( error: unknown ) => onError ( args, error );

        return result.then ( onResolve, onReject );

      } else {

        return onResult ( args, result );

      }

    } catch ( error: unknown ) {

      onError ( args, error );

    }

  } as unknown as FN; //TSC

};

/* EXPORT */

export default callHooks;
