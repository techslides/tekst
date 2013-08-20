package tekst

import (
   "testing"
)

var arr = []string{"v", "a", "d", "e", "r"}

func Test_SelectionSort(t *testing.T) {
   sorted, cnt := SelectionSort(arr)
   if (sorted[0] != "a")  {
      t.Error("SelectionSort FAILED!")
   } else if (sorted[4] != "v") {
      t.Error("SelectionSort FAILED!")   
   } else if (cnt != 5) {
      t.Error("SelectionSort FAILED!")   
   } else {
      t.Log("SelectionSort PASSED!")
   }
}

func Test_InsertionSort(t *testing.T) {
   sorted, cnt := InsertionSort(arr)
   if (sorted[0] != "a")  {
      t.Error("InsertionSort FAILED!")
   } else if (sorted[4] != "v") {
      t.Error("InsertionSort FAILED!")   
   } else if (cnt != 5) {
      t.Error("InsertionSort FAILED!")   
   } else {
      t.Log("InsertionSort PASSED!")
   }
}

func Test_ForceError(t *testing.T) {
   //t.Error("A FORCED ERROR")
}
