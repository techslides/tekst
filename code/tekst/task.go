package tekst 

import(
   . "fmt"
)

// Object to represent a task sent from a Request with Action and Data
// Data is transformed to Result; and returned as Response as Data
// with Message to describe an error message or the elapsed time for calculation
// and Status; either: success, fail or error 

type Task struct{
   Action string
   Data string
   Message string
   Result string    
   Status string
}
 
func TaskTest(){
   t1 := Task{"Data str", "Message str", "Action command","",""}
   Printf("Task: %s %s %s \n", t1)
}
