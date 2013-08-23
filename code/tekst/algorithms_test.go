package tekst

import (
   "testing"
   "strings"
)

var arr = []string{"v", "a", "d", "e", "r"}

var words = []struct {
   in string
   out string

}{
   {"zebra", "aberz"},
   {"abT80", "08Tab"},
   {"Chuck Norris 8", "  8CNchikorrsu"},
   {"thequickbrownfoxjumpsoverthelazydog", "abcdeeefghhijklmnoooopqrrsttuuvwxyz"},
}

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

func TestWords_SelectionSort(t *testing.T) {
   var ss string
   for _, tt := range words {
      arr, _ := SelectionSort(strings.Split(tt.in, ""))
      ss = strings.Join(arr,"")
      if ss != tt.out {
         t.Error("Selection sort FAILED on : " + ss)
      }
   }
}


func Test_ForceError(t *testing.T) {
   //t.Error("A FORCED ERROR")
}
