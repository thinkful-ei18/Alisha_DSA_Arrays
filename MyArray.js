'use strict';
const Memory = require('./Memory'); // imports the class from the other file
const memory = new Memory(); // creates an instance of the Memory class that can be used

/*
Walk through each step of implementing an array. Don't rush through this by copying and pasting the code 
samples. Once you've walked through it and you understand the code of the Array class, hide the sample 
code and try writing the array class from scratch using the memory module here for allocating memory.

If you are using node, export the memory module and then import it using require. If you are using 
React, import the module using import*
*/

/*
 * PRETEND MEMORY:
  value:    |[alpha | beta]| # | # | # | # | # | # |
  address:      0      1     2   3   4   5   6   7

  - memory has a max of 8 boxes
  - addresses 0-1 are my array
  - addresses 2-7 are free spaces

 */



class MyArray {

  constructor() {
    this.length = 2; 
    // the length of the array
    // whenever the class is first instantiated it's an empty array, so this.length would normally start at 0
    // for this purpose though, I have an array of 2 items so this.length = 2

    this.capacity = 2;
    // at this point, I've only set aside (allocated) 2 boxes for the array 
    // if it gets any longer, I'll have to go to a new spot where I have more consecutive boxes available using _resize.

    this.pointer = memory.allocate(this.length); 
    // the memory address of the array @ index 0
    // for my pretend memory, this.pointer = 0
  }

  

  get() {
    console.log(this.pointer);
  }

  push(value) { // add a value to the next available box in my array ... ('gamma')
    this._resize(this.length + 1);
    // we need to place a 3rd value in our array
    /* after we run _resize we have new constructor values: 
        this.length is still 2
        this.capacity = 3
        this.pointer = 2
    */

    memory.set(this.ptr + this.length, value);
    /* memory.set(4, gamma) =>
        this.memory[4] = gamma
    */

    this.length++;
    // this.length = 3
  }


  // if we want to add another value to our array but we don't have any more free boxes in our array, we must copy our old array and move it to another memory address where there are enough boxes side by side to hold all of the values of the array.
  // ** using the underscore is a naming convention for private functions. it tells dev's to not directly access this function (array._resize). instead, use this function inside another method that you can directly access.
  _resize(size) { // size = the amount of boxes we need, according to the push method, that's 3
    const previousPointer = this.pointer; 
    // gets the current memory address of the first box in our array

    this.pointer = memory.allocate(size);  
    // reassigns the value of this.pointer to be the result of memory.allocate(3) 
    // i.e. the memory address of the first box in the next set of (at least) 3 available consecutive boxes
    // this.pointer = 2

    if (this.pointer === null) {
      throw new Error('Not enough memory!');
    } 
    // if there are not 3 available consecutive boxes left out of our 1024 memory boxes, then we can't move our array

    memory.copy(this.pointer, previousPointer, this.length); 
    /* memory.copy(2, 0, 2) => 
        this.set(3, this.get(1)) => 
          this.set(3, beta) =>
            this.memory[3] = beta
    */
    // the copy method determines what memory address the last item in the array needs to have
    // in this case, array[0] (aka this.pointer) = memory address 2
    // array[1] = memory address 3
    // i now have space for array[2] at memory address 4

    memory.free(previousPointer);
    // we don't need garbage collection in JS because it is natively done
    // JS treats resizing as cut + paste; the values only exist in the new memory boxes
    // other languages treat resizing as copy + paste; the values exist in both sets of boxes

    this.capacity = size;
    // change the value in the constructor to 3

  }


  pop() {

  }


  insert() {

  }


  remove() {

  }

}

module.exports = MyArray;


