/* 
 * Kyle Dinh, 2013; https://github.com/kyledinh/tekst
 */

package main

import (
   "./code/tekst"
   "encoding/json"
   "html/template"
   "io/ioutil"
   "log"
   "net/http"
   "os"
   "regexp"
)

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

type test_struct struct {
    Test string
}

func testHandler(rw http.ResponseWriter, req *http.Request) {
    body, err := ioutil.ReadAll(req.Body)
    sw := tekst.Stopwatch {}
    if err != nil {
        //panic()
    }
    sw.Start()
    log.Println(string(body))
    var t test_struct
    err = json.Unmarshal(body, &t)
    if err != nil {
        //panic()
    }
    sw.Stop()
    log.Println(t.Test)
}

func main() {
   http.HandleFunc("/edit/", makeHandler(editHandler))
   http.HandleFunc("/save/", makeHandler(saveHandler))
   http.HandleFunc("/view/", makeHandler(viewHandler))
   http.HandleFunc("/test", testHandler)
   http.HandleFunc("/", makeHandler(viewHandler))
   http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
   http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("img"))))
   http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
   http.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("lib"))))
   log.Fatal(http.ListenAndServe(":8000", nil))
}

