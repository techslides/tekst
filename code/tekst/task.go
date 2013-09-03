package tekst 

import (
   "io/ioutil"
)   
   
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
 
type GameData struct {
   Action string
   Name string
   Grid string
}

func (g *GameData) Save() error {
   filename := g.Name + ".txt"
   return ioutil.WriteFile("data/" + filename, []byte(g.Grid), 0600)
}
