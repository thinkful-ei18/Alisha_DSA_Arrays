'use strict';

/*
You are given an array containing positive and negative integers. Write an algorithm which will find the 
largest sum in a continuous sequence.
*/

const maxSum = arr => {
  let additive = 0;
  let sum = 0;

  arr.map(number => {
    additive += number;

    if(additive > sum ) {
      sum = additive;
    }
  });

  return sum;
};

// console.log(maxSum([-2, -1, 0, 1, 2, 3])); // 3
console.log(maxSum([4, 6, -3, 5, -2, 1])); // 12