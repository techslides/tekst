Tekst
-----
A webservice that has a Angular/Javascript frontend that communicates through ajax calls to the Go backend that will respond with JSON responses.

The services runs on the default :8000 port.

Stack
* Twitter Bootstrap
* AngularJS
* Go Lang

Install and Execute
-------------------
* [Install Go Lang](https://github.com/kyledinh/toolkit/wiki/Go)
* Get source `git clone https://github.com/kyledinh/tekst.git`
* Build from source `cd tekst; go build`
* Run webserver `./tekst`
* Point browser to localhost:8000/ 

Request json payload format
-------------------
```
{ "action":"SELECTION", "data":["This", "is", "an", "example", "string", "to", "sort."] }
```

Response json format
--------------------
```
{ "status":"success", "message":"30ms : 6 elements", "data": ["an", "example",
     "is", "sort", "string", This"] }
```

Action to Sort Mapping
----------------------
* "SELECTION" SelectionSort
* "INSERTION" InsertionSort
* "NATIVE" Language supplied sort
* "QUICK" QuickSort
* "MERGE" MergeSort

Testing
-------
```
curl -X POST -d "{\"action\" : \"SELECTION\", \"data\" : [\"This is a string to sort.\" ]}" 
      http://localhost:8000/rest
```

License
-------
Copyright 2013 Kyle Dinh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
