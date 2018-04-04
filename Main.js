'use strict';

const MyArray = require('./MyArray');


const main = (function() {
  let arr = new MyArray();

  MyArray.SIZE_RATIO = 3;


  console.log('PUSH:' ,arr.push(alpha));
  // console.log('PUSH:' ,arr.push('beta'));
  // console.log('PUSH:' ,arr.push('gamma'));
  // console.log('PUSH:' ,arr.push('delta'));

  // console.log('GET:' ,arr.get(1));


  console.log('arr: ', arr);

})();