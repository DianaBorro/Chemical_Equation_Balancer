// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { ParsedEquation } from './chemistryUtils.ts';
// import './App.css';
// import {
//   // numberOfAtoms,
//   equation1,
//   // balancedCoefficients,
//   linearAlgebraSolution,
// } from './chemistryUtils.ts';

// function App() {
//   const [equation, setEquation] = useState<ParsedEquation>({
//     allElements: [],
//     reactants: [],
//     products: [],
//   });
//   const handleSubmit = () => {};

//   let coefficient;
//   let element;
//   let subscript;

//   const equationToParse: ParsedEquation = {
//     allElements
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}></form>

//       <div className="reactant">
//         <label htmlFor="coefficient">Coefficient:</label>
//         <input type="number" id="coefficient" min={0} value={coefficient} />

//         <label htmlFor="element">Element:</label>
//         <input type="text" id="element" required value={element} />

//         <label htmlFor="subscript">Subscript:</label>
//         <input type="text" id="subscript" value={subscript} />

//         <button>Add reactant</button>
//       </div>
//       <button
//         onClick={() => {
//           console.log(
//             // 'Hi, welcome to Willis',
//             linearAlgebraSolution(equation1)
//           );
//           // console.log(
//           //   'This is balanced equation',
//           //   balancedCoefficients(equation1)
//           // );
//           const balancedEquation = linearAlgebraSolution(equation1);
//           console.log('balanced equation', balancedEquation);

//           setEquation(balancedEquation);
//         }}
//       >
//         Balance the Equation
//       </button>
//       <div>
//         {`${equation.reactants
//           .map((e) =>
//             e.map((e) => `${e.coefficient}${e.element}${e.subscript}`)
//           )
//           .join('+')} => ${equation.products.map((e) =>
//           e.map((e) => `${e.coefficient}${e.element}${e.subscript}`)
//         )}`}
//       </div>
//     </>
//   );
// }

// export default App

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
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
    allElements: [],
    reactants: [],
    products: [],
  });

  const [reactants, setReactants] = useState([
    // Initial reactant, you can add more if needed
    {
      coefficient: 0,
      element: '',
      subscript: '',
    },
  ]);

  const handleSubmit = () => {};

  const handleAddReactant = () => {
    // Add a new reactant object to the reactants array
    setReactants([
      ...reactants,
      {
        coefficient: 0,
        element: '',
        subscript: '',
      },
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}></form>

      {reactants.map((reactant, index) => (
        <div key={index} className="reactant">
          <label htmlFor={`coefficient-${index}`}>Coefficient:</label>
          <input
            type="number"
            id={`coefficient-${index}`}
            min={0}
            value={reactant.coefficient}
            onChange={(e) => {
              const newReactants = [...reactants];
              newReactants[index].coefficient = Number(e.target.value);
              setReactants(newReactants);
            }}
          />

          <label htmlFor={`element-${index}`}>Element:</label>
          <input
            type="text"
            id={`element-${index}`}
            required
            value={reactant.element}
            onChange={(e) => {
              const newReactants = [...reactants];
              newReactants[index].element = e.target.value;
              setReactants(newReactants);
            }}
          />

          <label htmlFor={`subscript-${index}`}>Subscript:</label>
          <input
            type="text"
            id={`subscript-${index}`}
            value={reactant.subscript}
            onChange={(e) => {
              const newReactants = [...reactants];
              newReactants[index].subscript = e.target.value;
              setReactants(newReactants);
            }}
          />
        </div>
      ))}

      <button onClick={handleAddReactant}>Add reactant</button>

      <button
        onClick={() => {
          console.log(linearAlgebraSolution(equation1));
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

export default App;
