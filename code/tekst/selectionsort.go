package tekst

import (
   "log"
   "sort"
)

func Swap (arr []byte, x, y int) {
   var temp = arr[x]
   arr[x] = arr[y]
   arr[y] = temp 
} 

func NativeSort(arr []string) (output []string, cnt int) {
   cnt = len(arr)
   sort.Strings(arr)
   output = arr
   log.Println(output) 
   return  
}

