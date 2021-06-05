import { interpret, parse } from './lisp';

const is = (input: any, type: string) => {
  return Object.prototype.toString.call(input) === '[object ' + type + ']';
};

// takes an AST and replaces type annotated nodes with raw values
const unannotate = (input: any): Array<any> => {
  if (is(input, 'Array')) {
    if (input[0] === undefined) {
      return [];
    } else if (is(input[0], 'Array')) {
      return [unannotate(input[0])].concat(unannotate(input.slice(1)));
    } else {
      return unannotate(input[0]).concat(unannotate(input.slice(1)));
    }
  } else {
    return [input.value];
  }
};

describe('Lisp interpreter', () => {
  describe('parse', () => {
    it('should lex a single atom', () => {
      expect(parse("a").value).toEqual("a");
    });

    it('should lex an atom in a list', () => {
      expect(unannotate(parse("()"))).toEqual([]);
    });

    it('should lex multi atom list', () => {
      expect(unannotate(parse("(hi you)"))).toEqual(["hi", "you"]);
    });

    it('should lex list containing list', () => {
      expect(unannotate(parse("((x))"))).toEqual([["x"]]);
    });

    it('should lex list containing list', () => {
      expect(unannotate(parse("(x (x))"))).toEqual(["x", ["x"]]);
    });

    it('should lex list containing list', () => {
      expect(unannotate(parse("(x y)"))).toEqual(["x", "y"]);
    });

    it('should lex list containing list', () => {
      expect(unannotate(parse("(x (y) z)"))).toEqual(["x", ["y"], "z"]);
    });

    it('should lex list containing list', () => {
      expect(unannotate(parse("(x (y) (a b c))"))).toEqual(["x", ["y"], ["a", "b", "c"]]);
    });

    describe('atoms', () => {
      it('should parse out numbers', () => {
        expect(unannotate(parse("(1 (a 2))"))).toEqual([1, ["a", 2]]);
      });
    });
  });

  describe('interpret', () => {
    describe('lists', () => {
      it('should return empty list', () => {
        expect(interpret(parse('()'), undefined)).toEqual([]);
      });

      it('should return list of strings', () => {
        expect(interpret(parse('("hi" "mary" "rose")'), undefined)).toEqual(['hi', "mary", "rose"]);
      });

      it('should return list of numbers', () => {
        expect(interpret(parse('(1 2 3)'), undefined)).toEqual([1, 2, 3]);
      });

      it('should return list of numbers in strings as strings', () => {
        expect(interpret(parse('("1" "2" "3")'), undefined)).toEqual(["1", "2", "3"]);
      });
    });

    describe('atoms', () => {
      it('should return string atom', () => {
        expect(interpret(parse('"a"'), undefined)).toEqual("a");
      });

      it('should return string with space atom', () => {
        expect(interpret(parse('"a b"'), undefined)).toEqual("a b");
      });

      it('should return string with opening paren', () => {
        expect(interpret(parse('"(a"'), undefined)).toEqual("(a");
      });

      it('should return string with closing paren', () => {
        expect(interpret(parse('")a"'), undefined)).toEqual(")a");
      });

      it('should return string with parens', () => {
        expect(interpret(parse('"(a)"'), undefined)).toEqual("(a)");
      });

      it('should return number atom', () => {
        expect(interpret(parse('123'), undefined)).toEqual(123);
      });
    });

    describe('invocation', () => {
      it('should run print on an int', () => {
        expect(interpret(parse("(print 1)"), undefined)).toEqual(1);
      });

      it('should return first element of list', () => {
        expect(interpret(parse("(first (1 2 3))"), undefined)).toEqual(1);
      });

      it('should return rest of list', () => {
        expect(interpret(parse("(rest (1 2 3))"), undefined)).toEqual([2, 3]);
      });
    });

    describe('lambdas', () => {
      it('should return correct result when invoke lambda w no params', () => {
        expect(interpret(parse("((lambda () (rest (1 2))))"), undefined)).toEqual([2]);
      });

      it('should return correct result for lambda that takes and returns arg', () => {
        expect(interpret(parse("((lambda (x) x) 1)"), undefined)).toEqual(1);
      });

      it('should return correct result for lambda that returns list of vars', () => {
        expect(interpret(parse("((lambda (x y) (x y)) 1 2)"), undefined)).toEqual([1, 2]);
      });

      it('should get correct result for lambda that returns list of lits + vars', () => {
        expect(interpret(parse("((lambda (x y) (0 x y)) 1 2)"), undefined)).toEqual([0, 1, 2]);
      });

      it('should return correct result when invoke lambda w params', () => {
        expect(interpret(parse("((lambda (x) (first (x))) 1)"), undefined))
          .toEqual(1);
      });
    });

    describe('let', () => {
      it('should eval inner expression w names bound', () => {
        expect(interpret(parse("(let ((x 1) (y 2)) (x y))"), undefined)).toEqual([1, 2]);
      });

      it('should not expose parallel bindings to each other', () => {
        // Expecting undefined for y to be consistent with normal
        // identifier resolution in littleLisp.
        expect(interpret(parse("(let ((x 1) (y x)) (x y))"), undefined)).toEqual([1, undefined]);
      });

      it('should accept empty binding list', () => {
        expect(interpret(parse("(let () 42)"), undefined)).toEqual(42);
      });
    });

    describe('if', () => {
      it('should choose the right branch', () => {
        expect(interpret(parse("(if 1 42 4711)"), undefined)).toEqual(42);
        expect(interpret(parse("(if 0 42 4711)"), undefined)).toEqual(4711);
      });
    });
  });
});
