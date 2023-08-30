import rref from 'rref';

export type ParsedEquation = {
  allElements: Array<string>;
  reactants: Array<
    Array<{ element: string; subscript: number; coefficient: number }>
  >;
  products: Array<
    Array<{ element: string; subscript: number; coefficient: number }>
  >;
};
//Fe + O2 => Fe2O3 becomes 4Fe + 3O2 => 2FeO3
export const equation1: ParsedEquation = {
  allElements: ['Fe', 'O'],
  reactants: [
    [{ element: 'Fe', subscript: 1, coefficient: 1 }],
    [{ element: 'O', subscript: 2, coefficient: 1 }],
  ],
  products: [
    [
      { element: 'Fe', subscript: 2, coefficient: 1 },
      { element: 'O', subscript: 3, coefficient: 1 },
    ],
  ],
};

export const linearAlgebraSolution = (parsedEquation: ParsedEquation) => {
  let arrayToRref: number[][] = [];
  for (let i = 0; i < parsedEquation.allElements.length; i++) {
    arrayToRref.push([]);
  }

  for (let j = 0; j < parsedEquation.allElements.length; j++) {
    for (let i = 0; i < parsedEquation.reactants.length; i++) {
      if (
        parsedEquation.reactants[i][0].element === parsedEquation.allElements[j]
      ) {
        arrayToRref[j].push(
          parsedEquation.reactants[i][0].subscript *
            parsedEquation.reactants[i][0].coefficient
        );
      } else arrayToRref[j].push(0);
    }

    // for (let i = 0; i < parsedEquation.products.length; i++) {
    //   if (
    //     parsedEquation.products[i][0].element === parsedEquation.allElements[j]
    //   ) {
    //     rrefArray[j].push(
    //       parsedEquation.products[i][0].subscript *
    //         parsedEquation.products[i][0].coefficient
    //     );
    //   } else rrefArray[j].push(0);
    // }

    for (let i = 0; i < parsedEquation.products.length; i++) {
      const productElement = parsedEquation.products[i].find(
        (product) => product.element === parsedEquation.allElements[j]
      );

      if (productElement) {
        arrayToRref[j].push(
          productElement.subscript * productElement.coefficient
        );
      } else {
        arrayToRref[j].push(0);
      }
    }
  }

  let rrefedArray;
  for (let i = 0; i < parsedEquation.allElements.length - 1; i++) {
    rrefedArray = rref([arrayToRref[i], arrayToRref[i + 1]]);
  }
  // const rrefedArray = rref([arrayToRref[0], arrayToRref[1]]);
  let balancedEquation: ParsedEquation = {
    allElements: [],
    reactants: [],
    products: [],
  };
  for (let i = 0; i < parsedEquation.allElements.length; i++) {
    console.log('hiiiiiii', rrefedArray[i][rrefedArray.length]);

    balancedEquation = {
      allElements: ['Fe', 'O'],
      reactants: [
        [
          {
            element: 'Fe',
            subscript: 1,
            coefficient: rrefedArray[0][rrefedArray.length],
          },
        ],
        [
          {
            element: 'O',
            subscript: 2,
            coefficient: rrefedArray[1][rrefedArray.length],
          },
        ],
      ],
      products: [
        [
          {
            element: 'Fe',
            subscript: 2,
            coefficient: 1,
          },
          {
            element: 'O',
            subscript: 3,
            coefficient: 1,
          },
        ],
      ],
    };
  }

  console.log(
    `the result is`,
    `${balancedEquation.reactants[0][0].coefficient}`,
    `${balancedEquation.reactants[0][0].element}`,
    `${balancedEquation.reactants[0][0].subscript} +`,
    `${balancedEquation.reactants[1][0].coefficient}`,
    `${balancedEquation.reactants[1][0].element}`,
    `${balancedEquation.reactants[1][0].subscript} =>`,
    `${balancedEquation.products[0][0].coefficient} `,
    `${balancedEquation.products[0][0].element}`,
    `${balancedEquation.products[0][0].subscript}`,
    `${balancedEquation.products[0][1].element}`,
    `${balancedEquation.products[0][1].subscript}`
  );

  return balancedEquation;
};

// export const balancedEquation = (rrefedArray: Array<[]>) => {
//   const hi = rrefedArray.length - 1;
// };

/*


export const linearAlgebraSolution = (parsedEquation: ParsedEquation) => {
  let rrefArray = [];
  for (let i = 0; i < parsedEquation.reactants.length; i++) {
    let coefficientSum = 0;
    for (let j = 0; j < parsedEquation.products.length; j++) {
      coefficientSum +=
        parsedEquation.reactants[i][i].subscript *
        parsedEquation.reactants[i][i].coefficient;
    }

    // if (
    //   parsedEquation.reactants[i][i].element === parsedEquation.allElements[0]
    // ) {
    //   rrefArray.push(
    //     parsedEquation.reactants[i][i].subscript *
    //       parsedEquation.reactants[i][i].coefficient
    //   );
    // }
    rrefArray.push(coefficientSum);
  }

  return rrefArray;
};
export const numberOfAtoms = (parsedEquation: ParsedEquation) => {
  let reactant;
  let product;
  const numberOfAtoms: {
    reactant: { element: string; numberOfAtoms: number };
    product: { element: string; numberOfAtoms: number };
  }[] = [];
  for (let i = 0; i < parsedEquation.products.length; i++) {
    reactant = {
      element: parsedEquation.reactants[i][i].element,
      numberOfAtoms:
        parsedEquation.reactants[i][i].subscript *
        parsedEquation.reactants[i][i].coefficient,
    };

    product = {
      element: parsedEquation.products[i][i].element,
      numberOfAtoms:
        parsedEquation.products[i][i].subscript *
        parsedEquation.products[i][i].coefficient,
    };
    numberOfAtoms.push({ reactant: reactant, product: product });
  }
  return numberOfAtoms;
};

console.log(numberOfAtoms(equation1));

export const balancedCoefficients = (parsedEquation: ParsedEquation) => {
  // console.log('THIS IS THE RREF', rref([1, -2], [2, -3]));

  //make an array of xs to send to rref (aka coefficient + subscript of each element)

  console.log(
    'THIS IS THE RREF',
    rref([
      [1, 0, -2],
      [0, 2, -3],
    ])
  );
  const rref1 = rref([
    [1, 0, -2],
    [0, 2, -3],
  ])[0][2];
  console.log('this is happy rref1', rref1);

  console.log(
    'THIS IS THE 2ND RREF',
    rref([
      [2, 1, -1, 8],
      [-3, -1, 2, -11],
      [-2, 1, 2, -3],
    ])
  );

  // Loop through each element in the equation
  // for (let i = 0; i < parsedEquation.products.length; i++) {
  //   const reactantAtoms =
  //     parsedEquation.reactants[i].subscript *
  //     parsedEquation.reactants[i].coefficient;

  //   const productAtoms =
  //     parsedEquation.products[i].subscript *
  //     parsedEquation.products[i].coefficient;

  //   if (reactantAtoms !== productAtoms) {
  //     // Adjust coefficients to balance the equation
  //     if (reactantAtoms < productAtoms) {
  //       parsedEquation.reactants[i].coefficient +=
  //         productAtoms - reactantAtoms;
  //     } else {
  //       parsedEquation.products[i].coefficient +=
  //         reactantAtoms - productAtoms;
  //     }
  //   }
  // }

  return parsedEquation;
};

/*export const balancedCoefficients = (parsedEquation: ParsedEquation) => {
  const toCompareReactantsAndProducts = numberOfAtoms(parsedEquation);
  for (let i = 0; i < parsedEquation.products.length; i++) {
    if (
      toCompareReactantsAndProducts[i].reactant.numberOfAtoms !==
      toCompareReactantsAndProducts[i].product.numberOfAtoms
    ) {
      // parsedEquation.reactants[i].coefficient++;
      console.log(
        'this is round ',
        i,
        ': ',
        toCompareReactantsAndProducts[i].reactant.numberOfAtoms,
        ' vs: ',
        toCompareReactantsAndProducts[i].product.numberOfAtoms
      );

      if (
        toCompareReactantsAndProducts[i].reactant.numberOfAtoms <
        toCompareReactantsAndProducts[i].product.numberOfAtoms
      ) {
        parsedEquation.reactants[i].coefficient++;
        console.log(
          'now this is ',
          parsedEquation.reactants[i].coefficient,
          ' vs: ',
          toCompareReactantsAndProducts[i].product.numberOfAtoms
        );
      }

      if (
        toCompareReactantsAndProducts[i].reactant.numberOfAtoms >
        toCompareReactantsAndProducts[i].product.numberOfAtoms
      ) {
        parsedEquation.products[i].coefficient++;
        console.log(
          'now this is ',
          toCompareReactantsAndProducts[i].reactant.numberOfAtoms,
          ' vs: ',
          parsedEquation.products[i].coefficient
        );
      }
    }
  }
  return parsedEquation;
};

*/
// for (let i = 0; i < parsedEquation.products.length; i++) {
//   if (
//     parsedEquation.reactants[i].coefficient !==
//     parsedEquation.products[i].coefficient
//   ) {
//   }
// }

// parsedEquation.reactants.forEach((reactant) => {
//   reactant.coefficient;
// });
