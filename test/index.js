
/* IMPORT */

import {describe} from 'ava-spec';
import callHooks from '../dist';

/* TEST FN */

async function testFn ( fn, t ) {

  const store = {};

  const hooks = {
    args: ( args ) => {
      store.args = args;
      return [1, 2, 3];
    },
    before: ( args ) => {
      store.before = args;
    },
    call: ( args ) => {
      store.call = args;
      return Infinity;
    },
    result: ( args, result ) => {
      store.result = [args, result];
      return 0;
    },
    after: ( args, result ) => {
      store.after = [args, result];
    }
  };

  const fnWithHooks = callHooks ( fn, hooks );

  store.exit = await fnWithHooks ( 1 );

  t.deepEqual ( store.args, [1] );
  t.deepEqual ( store.before, [1 ,2, 3] );
  t.deepEqual ( store.call, [1, 2, 3] );
  t.deepEqual ( store.result, [[1, 2, 3], Infinity] );
  t.deepEqual ( store.after, [[1, 2, 3], 0] );
  t.is ( store.exit, 0 );

}

async function testThrowsFn ( fn, t ) {

  const store = {};

  const hooks = {
    result: ( args, result ) => {
      store.result = [args, result];
      return 0;
    },
    after: ( args, result ) => {
      store.after = [args, result];
    }
  };

  const fnWithHooks = callHooks ( fn, hooks );

  try {

    await fnWithHooks ( 1 );

  } catch ( e ) {

    t.deepEqual ( store.result, undefined );
    t.deepEqual ( store.after[0], [1] );
    t.true ( store.after[1] instanceof Error );

    throw e;

  }

}

/* CALL HOOKS */

describe ( 'Call Hooks', it => {

  it ( 'Supports regular functions', async t => {

    const fn = ( ...args ) => args.length;

    await testFn ( fn, t );

  });

  it ( 'Supports regular functions that throw', async t => {

    const fn = () => { throw new Error ( 'foo' ); };

    await t.throwsAsync ( testThrowsFn ( fn, t ), 'foo' );

  });

  it ( 'Supports async functions', async t => {

    const fn = async ( ...args ) => args.length;

    await testFn ( fn, t );

  });

  it ( 'Supports async functions that throw', async t => {

    const fn = async () => { throw new Error ( 'foo' ); };

    await t.throwsAsync ( testThrowsFn ( fn, t ), 'foo' );

  });

});
