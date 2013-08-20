'use strict';

/* jasmine specs for controllers go here */

describe('Algorithms Sorting Functions', function() {
 
   describe('Selection Sort', function(){
      it('should sort this array', function() {
         var arr = ["v","a","d","e","r"];
         var out = selectionSort(arr);
 
         expect(out[0]).toBe("a");
         expect(out[1]).toBe("d");
         expect(out[4]).toBe("v");
      });
   });

   describe('Insertion Sort', function(){
      it('should sort this array', function() {
         var arr = ["v","a","d","e","r"];
         var out = insertionSort(arr);
 
         expect(out[0]).toBe("a");
         expect(out[1]).toBe("d");
         expect(out[4]).toBe("v");
      });
   });

});
