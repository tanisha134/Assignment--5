__1. Difference between var, let, and const?__

var, let, and const are used to declare variables in JavaScript.

1. var is the old way of declaring variables . It can be re-declared and updated and it has function scope.

2. let is used for variables that can change later. It cannot be re-declared in the same scope and it has block scope.

3. const is used of values that should not change. once declared the value cannot be reassigned.


__2. What is the spread operator (...)?__

The spread operator is used to expand elements from arrays or objects. it is commonly used to copy or merge data.

Example:

*const number = [1, 2, 3]*
*const newNumber = [...numbers,4]*

__3. Difference between map(), filter(), and forEach()__

These are array methods used to work with lists of data.

1. map() creates a new array by transforming each element.

2. filter() creates a new array with elements that match a condition.

3. forEach() Simply loops through the array but does not return a new array.

__4. What is an arrow function?__

Arrow functions are a shorter way to write functions in JavaScript.

Example:

*const add = (a,b) => a + b*

They make the code cleaner and are commonly used in modern JavaScript.

__5. What are template literals?__

Template literals are strings written using backlist(``)

Example:

*const name = "Tanisha"*
*console.log(`Hello ${name}`)*

They make string formatting easier and more readable.