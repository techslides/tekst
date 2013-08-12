package tekst 

import(
   . "fmt"
)

type Task struct{
   Data string
   Message string 
   Action string
}
 
func TaskTest(){
   t1 := Task{"Data str", "Message str", "Action command"}
   Printf("Task: %s %s %s \n", t1)
}
