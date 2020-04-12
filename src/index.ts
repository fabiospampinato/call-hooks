
/* IMPORT */

import {Args, Hooks} from './types';

/* CALL HOOKS */

function callHooks<FN extends Function> ( fn: FN, { args, before, call, result, after }: Hooks ): FN {

  /* HELPERS */

  const onCall = ( argv: Args, thisArg: any ) => {

    if ( call ) return call.call ( thisArg, argv );

    return fn.apply ( thisArg, argv );

  };

  const onResult = ( argv: Args, resv: any ) => {

    resv = result ? result ( argv, resv ) : resv;

    if ( after ) after ( argv, resv );

    return resv;

  };

  const onError = ( argv: Args, err: Error ) => {

    if ( after ) after ( argv, err );

    throw err;

  };

  /* WRAPPER */

  return function callHooksWrapper () {

    const argv = args ? args ( arguments ) : arguments;

    if ( before ) before ( argv );

    if ( !after && !result ) return onCall ( argv, this );

    try {

      const resv = onCall ( argv, this );

      if ( resv instanceof Promise ) {

        return resv.then ( resv => onResult ( argv, resv ), err => onError ( argv, err ) );

      } else {

        return onResult ( argv, resv );

      }

    } catch ( err ) {

      onError ( argv, err );

    }

  } as unknown as FN; //TSC

}

/* EXPORT */

export default callHooks;
