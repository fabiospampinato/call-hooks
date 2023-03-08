
/* IMPORT */

import benchmark from 'benchloop';
import callHooks from '../dist/index.js';

/* HELPERS */

const fn = ctx => {
  for ( let i = 0; i < 1000; i++ ) {
    ctx.fn ()
  }
};

/* MAIN */

benchmark.config ({
  iterations: 25
});

benchmark.group ( 'sync', () => {

  benchmark ({
    fn,
    name: 'control',
    beforeEach: ctx => {
      ctx.fn = () => {};
    }
  });

  benchmark ({
    fn,
    name: 'all',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => {}, {
        args: args => args,
        before: args => {},
        call: args => {},
        result: ( args, result ) => result,
        after: ( args, result ) => {}
      });
    }
  });

  benchmark ({
    fn,
    name: 'args',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => {}, {
        args: args => args
      });
    }
  });

  benchmark ({
    fn,
    name: 'before',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => {}, {
        before: args => {}
      });
    }
  });

  benchmark ({
    fn,
    name: 'call',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => {}, {
        call: args => {}
      });
    }
  });

  benchmark ({
    fn,
    name: 'result',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => {}, {
        result: ( args, result ) => result
      });
    }
  });

  benchmark ({
    fn,
    name: 'after',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => {}, {
        after: ( args, result ) => {}
      });
    }
  });

});

benchmark.group ( 'async', () => {

  benchmark ({
    fn,
    name: 'control',
    beforeEach: ctx => {
      ctx.fn = () => Promise.resolve ();
    }
  });

  benchmark ({
    fn,
    name: 'all',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => Promise.resolve (), {
        args: args => args,
        before: args => {},
        call: args => {},
        result: ( args, result ) => result,
        after: ( args, result ) => {}
      });
    }
  });

  benchmark ({
    fn,
    name: 'args',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => Promise.resolve (), {
        args: args => args
      });
    }
  });

  benchmark ({
    fn,
    name: 'before',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => Promise.resolve (), {
        before: args => {}
      });
    }
  });

  benchmark ({
    fn,
    name: 'call',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => Promise.resolve (), {
        call: args => {}
      });
    }
  });

  benchmark ({
    fn,
    name: 'result',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => Promise.resolve (), {
        result: ( args, result ) => result
      });
    }
  });

  benchmark ({
    fn,
    name: 'after',
    beforeEach: ctx => {
      ctx.fn = callHooks ( () => Promise.resolve (), {
        after: ( args, result ) => {}
      });
    }
  });

});

benchmark.summary ();
