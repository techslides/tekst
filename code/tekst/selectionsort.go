package tekst

func Swap (arr []byte, x, y int) {
   var temp = arr[x]
   arr[x] = arr[y]
   arr[y] = temp 
} 


