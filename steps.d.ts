/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type ChaiWrapper = typeof import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: CodeceptJS.I}
  interface CallbackOrder { [0]: CodeceptJS.I }
  interface Methods extends CodeceptJS.WebDriver, ChaiWrapper {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}

declare module 'codeceptjs-chai';

declare module 'dd-cc-zycus-automation';


declare module NodeJS {
  interface Global {
    scenarioName: string;
    moduleName: string;
    Step:string;
  }
} 