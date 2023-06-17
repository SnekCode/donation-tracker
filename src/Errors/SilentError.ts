// create a client only warning 

export class SilentError extends Error {

    constructor(message: string) {
      super(message);
      this.stack = undefined;
      this.name = "Silent...ish...Error";
    }


  }