package selenium_test

import (
   "fmt"
   "github.com/sourcegraph/go-selenium"
   "time"
)

func ExampleTest03() {
   var webDriver selenium.WebDriver
   var err error
   var elem selenium.WebElement

   caps := selenium.Capabilities(map[string]interface{}{"browserName": "firefox"})
   if webDriver, err = selenium.NewRemote(caps, "http://localhost:4444/wd/hub"); err != nil {
      fmt.Printf("Failed to open session: %s\n", err)
      return
   }
   defer webDriver.Quit()

   err = webDriver.Get("http://kyledinh.com:8000/view/#/alpha")
   if err != nil {
      fmt.Printf("Failed to load page: %s\n", err)
      return
   }

   if title, err := webDriver.Title(); err == nil {
      fmt.Printf("Page title: %s\n", title)
   } else {
      fmt.Printf("Failed to get page title: %s", err)
      return
   }

   elem, _ = webDriver.FindElement(selenium.ByCSSSelector, "textarea[name='sourcetext']")
   elem.Clear()
   elem.SendKeys("zzz jjj eee selection")

   time.Sleep(time.Millisecond * 3000)

   //btn, _ := webDriver.FindElement(selenium.ByCSSSelector, "button:nth-of-type(1)")
   btn, _ := webDriver.FindElement(selenium.ByCSSSelector, "button[ng-click*='SELECTION']")
   btn.Click()
   
   time.Sleep(time.Millisecond * 5000)

   // output:
   // Page title: Tekst App none

}
