Tekst
-----
A webservice that has a Angular/Javascript frontend that communicates through ajax calls to the Go backend that will respond with JSON responses.

The services runs on the default :8000 port.

Request json format
-------------------
```
{ "action":"SORT", "data":"This is an example string to sort." }

```

Response json format
--------------------
```
{ "status":"success", "message":"30ms", "data":"an example is sort string This" }
```

Testing
-------
```
curl -X POST -d "{\"action\" : \"SORT\", \"data\" : \"This is a string to sort.\"}" http://localhost:8000/test
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