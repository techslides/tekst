package tekst

import (
   "log"
   "sort"
   "strings"
)

func Swap (arr []byte, x, y int) {
   var temp = arr[x]
   arr[x] = arr[y]
   arr[y] = temp 
} 

func SortByWordWithGoSort(input string) (output string, cnt int) {
   arr := strings.Split(input, " ")
   cnt = len(arr)
   sort.Strings(arr)
   for x := range arr { 
      output += arr[x] + " " 
      log.Println(arr[x])
   }
   return  
}

