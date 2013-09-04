"use strict";

function Stopwatch(debug) {
   this.begin;
   this.end;
   this.dur;
   this.debug = false; 
   if (debug === true) this.debug = true;
}

Stopwatch.prototype.start = function() {
   this.begin = Date.now();
   if (this.debug) console.log("Stopwatch started at: " + this.begin);
}

Stopwatch.prototype.stop = function() {
   this.end = Date.now();
   this.dur = this.end - this.begin;
   if (this.debug) console.log("Stopwatch stopped at: " + this.end + " dur: " + this.dur + " ms");
   return this.dur;
}

Stopwatch.prototype.lap = function() {
   var laptime = Date.now() - this.begin;
   if (this.debug) console.log("Stopwatch lapped, dur: " + laptime + " ms");
   return laptime;
}

function swap (items, x, y) {
   var temp = items[x];
   items[x] = items[y];
   items[y] = temp;
}

function selectionSort(items) {
   var N = items.length; 
   console.log("selectionSort " + N + " items");
   var min;
   for (var i = 0; i < N; i++) {
      min = i;
      //console.log(items);
      //check the rest of the array for anything smaller
      for (var j = i+1; j < N; j++) {
         if (items[j] < items[min]) {
            min = j;
         }
      }
      //swap the min found with pointer i
      swap(items, i , min);
   }
   return items;
}

function insertionSort(items) {
   var N = items.length;
   console.log("insertionSort " + N + " items");
   for (var i = 0; i < N; i++) {
      for (var j = i; j > 0; j--) {
         if (items[j] < items[j-1]) {
            swap(items, j, j-1);
         } else {
            break;
         }
      }
   }
   return items;
}

function partition(items, left, right) {
   var pivot = items[Math.floor((right + left) / 2)],
       l = left,
       r = right;

   while (l <= r) {   
      while (items[l] < pivot) { l++; }
      while (items[r] > pivot) { r--; }

      if (l <= r) {
         swap(items, l, r);
         l++;
         r--;
      }
   }
   return l;
}

function quickSort(items, left, right) {
   var index;
   var N = items.length;

   if (N > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? (N -1) : right;
      index = partition(items, left, right);

      if (left < index -1) { quickSort(items, left, index -1); }
      if (index < right)   { quickSort(items, index, right); }
   } 
   return items;
}
