// import React, { useState } from 'react'
  

// function Parent() {                                 // PROBLEM:        // with react.memo: parent re render hoga but child nhi  
//   const [count, setCount] = useState(0);
// console.log("parent render")
//   return (
//     <>
//       <button onClick={() => setCount(count+1)}>Click</button>
//       <Child name="r" />
//     </>
//   );
// }
// const Child = React.memo(({ name }) => {
//   console.log("Child render");
//   return <h1>{name}</h1>;
// });

// export default Parent



// import React, { useState } from "react";
// const Child = ({ name }) => {                         // SOLUTION     // without react.memo: parent re render hoga or child bhi hoga 
//   console.log("Child render hua");
//   return <h1>{name}</h1>;
// };

// function Parent() {
//   const [count, setCount] = useState(0);

//   console.log("Parent render hua");

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//       <Child name="Rohan" />
//     </>
//   );
// }

// export default Parent;


// import React, { useState } from "react";
// function Parent() {
//   const [count, setCount] = useState(0);

//   console.log("Parent render");

//   const handleClick = () => {
//     console.log("Clicked");
//   };

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <Child onClick={handleClick} />
//     </>
//   );
// }
// const Child = React.memo(({ onClick }) => {                      // PROBLEM: react.memo krne ke bad bhi child component re render krega kyuki parent comp jab jab re render ho rha h tb tb handleCick() new generete ho rha h 
//   console.log("Child render");
//   return <button onClick={onClick}>Click Child</button>;
// });
// export default Parent; 




// import React, { useState, useCallback } from "react";
// function Parent() {
//   const [count, setCount] = useState(0);

//   console.log("Parent render");
                           
//   const handleClick = useCallback(() => {                   // SOLUTION: yha pr jab parent comp ka function call ho rha h to vo useCallback ke jariye ho rha h jisse ki function sirf ek bar bnega or jisse ki child re render nhi hoga kyuki child me prop ek hi send hoga or react.memo ki help se wo child re render nhi ho payga                                 
//     console.log("Clicked");
//   }, []);

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <Child onClick={handleClick} />
//     </>
//   );
// }
// const Child = React.memo(({ onClick }) => {                      
//   console.log("Child render");
//   return <button onClick={onClick}>Click Child</button>;
// });

// export default Parent;