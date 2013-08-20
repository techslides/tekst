package tekst 

// Object to represent a task sent from a Request with Action and Data
// Data is transformed to Result; and returned as Response as Data
// with Message to describe an error message or the elapsed time for calculation
// and Status; either: success, fail or error 

type Task struct{
   Action string
   Data []string
   Result []string    
   Message string
   Status string
   Count int
}
 
