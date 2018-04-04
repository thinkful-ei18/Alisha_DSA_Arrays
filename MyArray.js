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

  - addresses 0-1 are filled with array values
  - addresses 2-7 are free spaces

 */



class MyArray {

  // ** using an underscore is a naming convention for private functions. it tells dev's to not directly access this variable/method. instead, use this variable/method inside another method that you can directly access.


  constructor() {
    this.length = 2; 
    // the length of the array
    // whenever the class is first instantiated it's an empty array, so this.length would normally start at 0
    // for this purpose though, I have an array of 2 items so this.length = 2

    this._capacity = 2;
    // at this point, I've only set aside (allocated) 2 boxes for the array 
    // if it gets any longer, I'll have to go to a new spot where I have more consecutive boxes available using _resize.

    this.pointer = memory.allocate(this.length); 
    // the memory address of the array @ index 0
    // for my pretend memory, this.pointer = 0
  }



  /* =============================
  PUSH
  ============================= */

  push(value) { // add a value to the next available box in my array ... ('gamma')

    if (this.length >= this.__) {
      // for the pretend array this.length = 2 && this._capacity = 2 so we will get inside of this statement when we try to add a 3rd value

      this._resize((this.length + 1) * MyArray.SIZE_RATIO);
      // this._resize(3 * 3) => this._resize(9)

      /* after we run _resize we have new constructor values: 
      this.length is still 2
      this._capacity = 9
      this.pointer = 2
      */
    }

    memory.set(this.ptr + this.length, value);
    /* memory.set(4, gamma) =>
        this.memory[4] = gamma
    */

    this.length++;
    // this.length = 3
  }
  


  /* =============================
  _RESIZE
  ============================= */

  // if we want to add another value to our array but we don't have any more free boxes in our array, we must copy our old array and move it to another memory address where there are enough boxes side by side to hold all of the values of the array.
  _resize(size) { // size = the amount of boxes we need, according to the push method, that's 9
    const previousPointer = this.pointer; 
    // gets the current memory address of the first box in our array (0)

    this.pointer = memory.allocate(size);  
    // reassigns the value of this.pointer to be the result of memory.allocate(9) 
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

    this._capacity = size;
    // change the value in the constructor to 9
    // I now have 3 values in my array. I can add 5 more before having to resize again.
  }



  /* =============================
  * UPDATED PRETEND MEMORY AFTER PUSH && RESIZE
    value:    | # | # | [alpha | beta | gamma] | ... | ... | ... | ... | ... | ... | #  |
    address:    0   1      2      3       4      5      6     7     8     9     10   11

    - addresses 0-1 && 11 are now free
    - addresses 2-4 are filled with array values
    - addresses 5-10 are boxes that have been allocated for my array, but are empty

  ============================= */



  /* =============================
  GET
  ============================= */

  get(index) { // we want the value at index 2
    if (index < 0 || index >= this.length) {
      // arrays don't have negative indexes so you'll get this error if you try
      // likewise, if the index is equal to or greater than the length of the array, you'll get this error
      throw new Error('Invalid index');
    }

    return memory.get(this.pointer + index);
    // if you search for a valid array index (in this case 0, 1 or 2) memory will go to this.pointer (which is array[0]) && add the index you're searching for
    /* memory.get(2 + 2) => 
        memory.get(4) =>
          this.memory[4] = 'gamma'
     */
  }



  /* =============================
  POP
  ============================= */

  pop() {
    if (this.length === 0) {
      // if the array is empty, there's nothing to remove
      throw new Error('Index error');
    }

    const value = memory.get(this.pointer + this.length - 1);
    /* memory.get(2 + 3 - 1) => 
        memory.get(4) =>
          this.memory[4] = 'gamma'
     */

    this.length--;
    // this.length = 2

    return value;
    // value = 'gamma'
  }


  /* =============================
  * UPDATED PRETEND MEMORY AFTER POP
    value:    | # | # | [alpha | beta] | ... | ... | ... | ... | ... | ... | ... | #  |
    address:    0   1      2      3       4     5     6     7     8     9     10   11

    - addresses 0-1 && 11 are still free
    - addresses 2-3 are filled with array values
    - addresses 4-10 are boxes that have been allocated for my array, but are empty

  ============================= */


  insert(index, value) { // index = 1, value = 'delta'
    if (index < 0 || index >= this.length) {
      // arrays don't have negative indexes so you'll get this error if you try
      // likewise, if the index is equal to or greater than the length of the array, you'll get this error
      throw new Error('Invalid index');
    }

    if (this.length >= this._capacity) {
      // if the length of the array equals or exceeds the amount of boxes I've set aside for it, we need to resize again
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.pointer + index + 1, this.pointer + index, this.length - index);
    /* memory.copy( (2+1+1), (2+1), (2-1) )
        memory.copy(4, 3, 1)
          this.set(4, this.get(3))
            this.set(4, beta)
              this.memory[4] = beta
     */

    memory.set(this.pointer + index, value);
    /* memory.set( (2+1), delta)
        memory.set(3, delta)
              this.memory[3] = delta
     */

    this.length++;
    // this.length = 3
  }

  
  /* =============================
  * UPDATED PRETEND MEMORY AFTER INSERT
    value:    | # | # | [alpha | delta | beta] | ... | ... | ... | ... | ... | ... | #  |
    address:    0   1      2      3       4     5     6     7     8     9     10   11

    - addresses 0-1 && 11 are still free
    - addresses 2-4 are filled with array values
    - addresses 5-10 are boxes that have been allocated for my array, but are empty

  ============================= */


  remove() {

  }

}

MyArray.SIZE_RATIO = 3;
// the size ratio is how many times the capacity is going to be increased by once the current capacity is met
// this is useful so that we don't have to resize every time we push

module.exports = MyArray;


