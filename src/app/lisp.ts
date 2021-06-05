const library = {
  first: (x: Array<any>): any => {
    return x[0];
  },
  rest: (x: Array<any>): Array<any> => {
    return x.slice(1)
  },
  print: (x: any): any => {
    console.log(x);
    return x;
  }
}

const Context = function(this: any, scope: any, parent: any) {
  this.scope = scope;
  this.parent = parent;

  this.get = (identifier: string): any => {
    if (identifier in this.scope) {
      return this.scope[identifier];
    } else if (this.parent !== undefined) {
      return this.parent.get(identifier);
    }
  };
};

const special = {
  let: (input: any, context: any): any => {
    const letContext = input[1].reduce((acc: any, x: any): any => {
      acc.scope[x[0].value] = interpret(x[1], context);
      return acc;
    }, new (Context as any)({}, context));

    return interpret(input[2], letContext);
  },

  lambda: (input: any, context: any): any => {
    return function() {
      const lambdaArguments = arguments;
      const lambdaScope = input[1].reduce(function(acc: any, x: any, i: any): any {
        acc[x.value] = lambdaArguments[i];
        return acc;
      }, {});

      return interpret(input[2], new (Context as any)(lambdaScope, context));
    }
  },

  if: (input: any, context: any): any => {
    return interpret(input[1], context) ?
      interpret(input[2], context) :
      interpret(input[3], context);
  }
};

type SpecialKey = keyof typeof special

const interpretList = (input: any, context: any): any => {
  if (input.length > 0 && input[0].value in special) {
    return special[input[0].value as SpecialKey](input, context);
  } else {
    const list = input.map(function(x: any) { return interpret(x, context); });
    if (list[0] instanceof Function) {
      return list[0].apply(undefined, list.slice(1));
    } else {
      return list;
    }
  }
};

function interpret(input: any, context: any): any {
  if (context === undefined) {
    return interpret(input, new (Context as any)(library));
  } else if (input instanceof Array) {
    return interpretList(input, context);
  } else if (input.type === 'identifier') {
    return context.get(input.value);
  } else if (input.type === 'number' || input.type === 'string') {
    return input.value;
  }
};

const categorize = (input: any): any => {
  if (!isNaN(parseFloat(input))) {
    return { type: 'number', value: parseFloat(input) };
  } else if (input[0] === '"' && input.slice(-1) === '"') {
    return { type: 'string', value: input.slice(1, -1) };
  } else {
    return { type: 'identifier', value: input};
  }
};

const parenthesize = function(input: any, list: any): any {
  if (list === undefined) {
    return parenthesize(input, []);
  } else {
    const token = input.shift();
    if (token === undefined) {
      return list.pop();
    } else if (token === "(") {
      list.push(parenthesize(input, []));
      return parenthesize(input, list);
    } else if (token === ")") {
      return list;
    } else {
      return parenthesize(input, list.concat(categorize(token)));
    }
  }
};

const tokenize = function(input: any): any {
  return input.split('"')
    .map(function(x: any, i: any): any {
      if (i % 2 === 0) {
        return x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
      } else {
        return x.replace(/ /g, "!whitespace!");
      }
    })
    .join('"')
    .trim()
    .split(/\s+/)
    .map(function(x: any): any {
      return x.replace(/!whitespace!/g, " ");
    });
};

function parse (input: any): any {
  return parenthesize(tokenize(input), undefined);
};

export { interpret, parse }
