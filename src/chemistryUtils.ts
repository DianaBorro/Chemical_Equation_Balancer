export type ParsedEquation = {
  reactants: Array<{ element: string; subscript: number; coefficient: number }>;
  products: Array<{ element: string; subscript: number; coefficient: number }>;
};

export const equation1: ParsedEquation = {
  reactants: [
    { element: 'Fe', subscript: 1, coefficient: 1 },
    { element: 'O', subscript: 2, coefficient: 1 },
  ],
  products: [
    { element: 'Fe', subscript: 2, coefficient: 1 },
    { element: 'O', subscript: 3, coefficient: 1 },
  ],
};

export const numberOfAtoms = (parsedEquation: ParsedEquation) => {
  // let reactantsNumberOfAtoms;
  // let productsNumberOfAtoms;

  const numberOfAtoms: { element: string; numberOfAtoms: number }[] = [];
  for (let i = 0; i < parsedEquation.products.length; i++) {
    numberOfAtoms.push({
      element: parsedEquation.reactants[i].element,
      numberOfAtoms:
        parsedEquation.reactants[i].subscript *
        parsedEquation.reactants[i].coefficient,
    });

    numberOfAtoms.push({
      element: parsedEquation.products[i].element,
      numberOfAtoms:
        parsedEquation.products[i].subscript *
        parsedEquation.products[i].coefficient,
    });
  }
  return numberOfAtoms;
};

console.log(numberOfAtoms(equation1));

export const balancedCoefficients = (parsedEquation: ParsedEquation) => {
  for (let i = 0; i < parsedEquation.products.length; i++) {
    if (
      parsedEquation.reactants[i].coefficient !==
      parsedEquation.products[i].coefficient
    ) {
    }
  }

  parsedEquation.reactants.forEach((reactant) => {
    reactant.coefficient;
  });
};
