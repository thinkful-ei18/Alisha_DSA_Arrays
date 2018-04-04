'use strict';

/*
Imagine you have an array of numbers. Write an algorithm to remove all numbers less than five from the array. 
Don't use array's built-in .filter method here; write the algorithm from scratch.
*/

const filter = arr => {

  let filteredArray = [];
  
  arr.map(number => {
    if (number >= 5) {
      filteredArray = [...filteredArray, number];
    }
  });

  return filteredArray;

};

console.log(filter([1, 3, 5, 7, 9]));