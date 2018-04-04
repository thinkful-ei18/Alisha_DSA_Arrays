'use strict';

const MyArray = require('./MyArray');


const main = (function() {
  let arr = new MyArray();

  MyArray.SIZE_RATIO = 3;
  // MyArray begins with a length && capacity of 2


  arr.push('alpha'); // { length: 3, _capacity: 9, pointer: 2 }
  arr.push('beta'); // { length: 4, _capacity: 9, pointer: 2 }
  arr.push('gamma'); // { length: 5, _capacity: 9, pointer: 2 }
  arr.push('delta'); // { length: 6, _capacity: 9, pointer: 2 }
  // the capacity tripled upon pushing 'alpha' per line 54 of MyArray.js

  arr.get(4);
  console.log('GET:', arr.get(4));

  arr.pop(); // MyArray { length: 5, _capacity: 9, pointer: 2 }
  arr.pop(); // MyArray { length: 4, _capacity: 9, pointer: 2 }

  console.log('GET:', arr.get(2));


  console.log('arr:', arr);

})();