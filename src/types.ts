
/* MAIN */

type Args = any[];

type Result = any;

type This = any;

type Hooks = {
  args?: ( args: Args ) => Args,
  before?: ( args: Args ) => void,
  call?: ( args: Args ) => Result,
  result?: ( args: Args, result: Result ) => Result,
  after?: ( args: Args, result: Result | unknown ) => void
};

/* EXPORT */

export type {Args, Result, This, Hooks};
