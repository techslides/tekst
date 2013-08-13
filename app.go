/* 
 * Kyle Dinh, 2013; https://github.com/kyledinh/tekst
 */

package main

import (
   "./code/tekst"
   "encoding/json"
   "fmt"
   "html/template"
   "io/ioutil"
   "log"
   "net/http"
   "os"
   "regexp"
   "sort"
   "strings"
)

type Response map[string]interface{}

func (r Response) String() (s string) {
   b, err := json.Marshal(r)
   if err != nil {
      s = ""
      return
   }
   s = string(b)
   return
}

type Page struct {
   Title string
   Body []byte
}

func (p *Page) save() error {
   filename := p.Title + ".txt"
   return ioutil.WriteFile("data/" + filename, p.Body, 0600)
}

func loadPage(title string) (*Page, error) {
   filename := title + ".txt"
   body, err := ioutil.ReadFile("data/" + filename)
   if err != nil {
      return nil, err
   }
   return &Page{Title: title, Body: body}, nil
}

var templates = template.Must(template.ParseFiles("app.html"))

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
   err := templates.ExecuteTemplate(w, tmpl + ".html", p)
   if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
   }
}

const lenPath = len("/view/")
var titleValidator = regexp.MustCompile("[a-zA-Z0-9]+$")
var cwd, _ = os.Getwd()

func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
   return func(w http.ResponseWriter, r *http.Request) {
      title := r.URL.Path[lenPath:]
      if !titleValidator.MatchString(title) {
         http.NotFound(w, r)
         return
      } 
      fn(w, r, title)
   }
}

func editHandler(w http.ResponseWriter, r *http.Request, title string) {
   p, err := loadPage(title)
   if err != nil {
      p = &Page{Title: title}
   }
   renderTemplate(w, "app", p)
}

func saveHandler(w http.ResponseWriter, r *http.Request, title string) {
   body := r.FormValue("body") 
   p := &Page{Title: title, Body: []byte(body)}
   err := p.save()
   if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
   }
   http.Redirect(w, r, "/view/" + title, http.StatusFound)
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
   p, err := loadPage(title)
   if err != nil {
      http.Redirect(w, r, "/edit/" + title, http.StatusFound)
      return
   }
   renderTemplate(w, "app", p)
}

func jsonRespond(w http.ResponseWriter, res Response) {
   w.Header().Set("Content-Type", "application/json")
   fmt.Fprint(w, res)
   return
}

func testHandler(w http.ResponseWriter, r *http.Request) {
   body, err := ioutil.ReadAll(r.Body)
   sw := tekst.Stopwatch {}
   if err != nil {
      jsonRespond(w, Response{"status": "fail", "message": "Could not parse the Body from the Request."})
   }
   sw.Start()
   log.Println(string(body))
   var t tekst.Task
   err = json.Unmarshal(body, &t)
   sw.Stop()
   if err != nil {
      jsonRespond(w, Response{"status": "fail", "message": "Could not parse the JSON message."})
   }
   
   log.Println(t.Data + t.Message + t.Action)
   jsonRespond(w, Response{"status": "success", "message": t.Message, "result": sw.Dur.String()})
   return
}

func restHandler(w http.ResponseWriter, r *http.Request) {
   sw := tekst.Stopwatch {}
   var t tekst.Task
   
   body, err := ioutil.ReadAll(r.Body)
   if err != nil {
      jsonRespond(w, Response{"status": "fail", "message": "Could not parse the Body from the Request."})
   }
   
   log.Println(string(body))
      
   sw.Start()
   err = json.Unmarshal(body, &t)
   
   if err != nil {
      jsonRespond(w, Response{"status": "fail", "message": "Could not parse the JSON message."})
   }
   
   arr := strings.Split(t.Data, " ")
   sort.Strings(arr)
   for x := range arr { 
      t.Result = t.Result + arr[x] + " " 
      log.Println(arr[x])
   } 
   t.Message = sw.Stop()
   log.Println(t.Data + t.Message + t.Action)
   jsonRespond(w, Response{"status": "success", "data": t.Result, "result": t.Message})
   return
}

func main() {
   http.HandleFunc("/edit/", makeHandler(editHandler))
   http.HandleFunc("/save/", makeHandler(saveHandler))
   http.HandleFunc("/view/", makeHandler(viewHandler))
   http.HandleFunc("/test", testHandler)
   http.HandleFunc("/rest", restHandler)
   http.HandleFunc("/", makeHandler(viewHandler))
   http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
   http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("img"))))
   http.Handle("/js/",  http.StripPrefix("/js/",  http.FileServer(http.Dir("js"))))
   http.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("lib"))))
   log.Fatal(http.ListenAndServe(":8000", nil))
}

