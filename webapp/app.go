/* 
 * Kyle Dinh, 2014; https://github.com/kyledinh/tekst
 */

package main

import (
     "../src/go/tekst"
     "encoding/json"
     "fmt"
     "html/template"
     "io/ioutil"
    "log"
    "net/http"
    "os"
    "regexp"
    "strconv"
    "strings"
)

/*
 * Variables and Structs
 */

const lenPath = len("/view/")
var templates = template.Must(template.New("app.html").Delims("[[","]]").ParseFiles("app.html"))
var titleValidator = regexp.MustCompile("^[a-zA-Z0-9]*$")
var cwd, _ = os.Getwd()

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

// Page can be used to load external data to the html page
type Page struct {
    Title string
    Body []byte
}

func (p *Page) save() error {
    filename := p.Title + ".txt"
    return ioutil.WriteFile("data/" + filename, p.Body, 0600)
}

/* 
 * Functions and Utils
 */

func loadPage(title string) (*Page, error) {
    filename := title + ".txt"
    body, err := ioutil.ReadFile("data/" + filename)
    if err != nil {
        return nil, err
    }
    return &Page{Title: title, Body: body}, nil
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
    err := templates.ExecuteTemplate(w, tmpl, p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
}

// Writes the Response as json
// i.e. jsonRespond(w, Response{"status":"fail", "message":"Could not parse the JSON message."})
func jsonRespond(w http.ResponseWriter, res Response) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprint(w, res)
    return
}

/* 
 * Handlers
 */

func redirectHandler(path string) func(http.ResponseWriter, *http.Request) {
    return func (w http.ResponseWriter, r *http.Request) {
        http.Redirect(w, r, path, http.StatusMovedPermanently)
    }
}

func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        title := r.URL.Path[lenPath:]
        if title == "" {
            title = "none"
        }
        if !titleValidator.MatchString(title) {
            http.NotFound(w, r)
            return
        }
        fn(w, r, title)
    }
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
    p, err := loadPage(title)
    if err != nil {
        p = &Page{Title: title}
    }
    renderTemplate(w, "app.html", p)
}

func testHandler(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    sw := tekst.Stopwatch {}
    if err != nil {
        jsonRespond(w, Response{ "message":"Could not parse the Body from the Request.", "status":"fail" })
        return
    }
    sw.Start()
    log.Println(string(body))
    var t tekst.Task
    err = json.Unmarshal(body, &t)
    sw.Stop()
    if err != nil {
        jsonRespond(w, Response{ "message":"Could not parse the JSON message.", "status":"fail" })
        return
    }

    log.Println(strings.Join(t.Data, " ") + t.Message + t.Action)
    jsonRespond(w, Response{ "message": t.Message, "status":"success" })
    return
}

func gameHandler(w http.ResponseWriter, r *http.Request) {
    var g tekst.GameData

    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        jsonRespond(w, Response{ "error":"Could not parse the Body from the Request.", "status":"fail" })
        return
    }
    log.Println(string(body))

    err = json.Unmarshal(body, &g)
    if err != nil {
        jsonRespond(w, Response{ "error":"Could not parse the JSON message.", "status":"fail" })
        return
    }

    switch g.Action{
        case "SAVEGAME" :
            // save json to file system.
            if !titleValidator.MatchString(g.Name) {
                jsonRespond(w, Response{ "error":"Invalid filename. Letters and numbers only.", "status":"fail" })
                return
            }
            g.Save()
        default :
            jsonRespond(w, Response{ "error":"Action command, not a valid action.", "status":"fail" })
            return
    }
    jsonRespond(w, Response{ "data": g.Name, "message": "saved", "status":"success"})
    return
}

func restHandler(w http.ResponseWriter, r *http.Request) {
    sw := tekst.Stopwatch {}
    var t tekst.Task

    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        jsonRespond(w, Response{ "error":"Could not parse the Body from the Request.", "status":"fail" })
        return
    }
    log.Println(string(body))

    sw.Start()
    err = json.Unmarshal(body, &t)
    if err != nil {
        jsonRespond(w, Response{ "error":"Could not parse the JSON message.", "status":"fail" })
        return
    }

    switch t.Action{
        case "NATIVE" :
            t.Result, t.Count = tekst.NativeSort(t.Data)
        case "SELECTION" :
            t.Result, t.Count = tekst.SelectionSort(t.Data)
        case "INSERTION" :
            t.Result, t.Count = tekst.InsertionSort(t.Data)
        default :
            jsonRespond(w, Response{ "error":"Action command, not a valid action.", "status":"fail" })
            return
    }

    t.Message = t.Action + " " + sw.Stop() + " : " + strconv.Itoa(t.Count) + " elements"
    log.Println(strings.Join(t.Data, " ") + t.Message + t.Action)
    jsonRespond(w, Response{ "data": t.Result, "message": t.Message, "status":"success"})
    return
}

func main() {
    http.HandleFunc("/test", testHandler)
    http.HandleFunc("/rest", restHandler)
    http.HandleFunc("/game", gameHandler)
    http.HandleFunc("/view/", makeHandler(viewHandler))
    http.HandleFunc("/", redirectHandler("/view/"))
    http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/data/", http.StripPrefix("/data/", http.FileServer(http.Dir("data"))))
    http.Handle("/fonts/", http.StripPrefix("/fonts/", http.FileServer(http.Dir("fonts"))))
    http.Handle("/html/", http.StripPrefix("/html/", http.FileServer(http.Dir("html"))))
    http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("img"))))
    http.Handle("/js/",  http.StripPrefix("/js/",  http.FileServer(http.Dir("js"))))
    http.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("lib"))))
    log.Fatal(http.ListenAndServe(":8000", nil))
}
