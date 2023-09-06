import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ParsedEquation } from './chemistryUtils.ts';
import './App.css';
import {
  // numberOfAtoms,
  equation1,
  // balancedCoefficients,
  linearAlgebraSolution,
} from './chemistryUtils.ts';

function App() {
  const [equation, setEquation] = useState<ParsedEquation>({
    allElements: ['1'],
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
  });
  const handleSubmit = () => {};

  let equation1balanced = '';

  return (
    <>
      <form onSubmit={handleSubmit}></form>
      <label htmlFor="coefficient">Coefficient:</label>
      <input type="number" id="coefficient" min={0} />
      <label htmlFor="element">Element:</label>
      <input type="text" id="element" required />
      <label htmlFor="subscript">Subscript:</label>
      <input type="text" id="subscript" />
      <button
        onClick={() => {
          console.log(
            // 'Hi, welcome to Willis',
            linearAlgebraSolution(equation1)
          );
          // console.log(
          //   'This is balanced equation',
          //   balancedCoefficients(equation1)
          // );
          const balancedEquation = linearAlgebraSolution(equation1);
          console.log('balanced equation', balancedEquation);

          setEquation(balancedEquation);
        }}
      >
        Balance the Equation
      </button>
      <div>
        {`${equation.reactants
          .map((e) =>
            e.map((e) => `${e.coefficient}${e.element}${e.subscript}`)
          )
          .join('+')} => ${equation.products.map((e) =>
          e.map((e) => `${e.coefficient}${e.element}${e.subscript}`)
        )}`}
      </div>
    </>
  );
}

export default App
