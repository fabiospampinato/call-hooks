
/* TYPES */

type Args = ArrayLike<any>;

type Result = any;

type Hooks = {
  args?: ( args: Args ) => Args,
  before?: ( args: Args ) => void,
  call?: ( args: Args ) => Result,
  result?: ( args: Args, result: Result ) => Result,
  after?: ( args: Args, result: Result | Error ) => void
};

/* EXPORT */

export {Args, Result, Hooks};
