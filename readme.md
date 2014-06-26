# Tekst

A webservice that has a Angular/Javascript frontend that communicates through ajax calls to the Go backend that will respond with JSON responses.

The services runs on the default :8000 port.

<a href="http://kyledinh.com:8000/"><img src="https://raw.github.com/kyledinh/tekst/master/webapp/img/tekstapp_screen.png" height="540" width="600" /></a>

[Online Demo](http://kyledinh.com:8000/view/)

Stack
* Twitter Bootstrap
* AngularJS
* D3JS
* Go Lang
* Ruby


## Install with NodeJS/Grunt
This project has moved use Grunt to test, compile and build. Then point your browser to `localhost:8000`.

* [Install Go Lang](https://github.com/kyledinh/toolkit/wiki/Go)
* Get source `git clone https://github.com/kyledinh/tekst.git`
* Install Node
* Install NPM (node package manager)
* Install Grunt
* Then build and run
```
npm intstall
grunt 
``` 

### Without Grunt/NodeJS
* ./make.sh
* Build from source `cd tekst/webapp; go build`
* Run webserver `./tekst`
* Point browser to localhost:8000/ 


Launch the Go Server and the Ruby On Rails Server
```
cd ~/toolkit/ruby/rubysort; rails server > /home/kyle/ror.log &
cd ~/tekst; ./tekst > /home/kyle/tekst.log &
```

## Request json payload format
```
{ "action":"SELECTION", "data":["This", "is", "an", "example", "string", "to", "sort."] }
```

## Response json format
```
{ "status":"success", "message":"30ms : 6 elements", "data": ["This","an", "example",
     "is", "sort", "string"] }
```

## Action to Sort Mapping
* "SELECTION" SelectionSort
* "INSERTION" InsertionSort
* "NATIVE" Language supplied sort
* "QUICK" QuickSort
* "MERGE" MergeSort

## Testing
Go code unit test
```
go test ./...
```

## Curl
```
curl -X POST -d "{\"action\" : \"SELECTION\", \"data\" : [\"This is a string to sort.\" ]}" 
      http://localhost:8000/rest
```

## Dev Notes
Build and run
```
go build;
./tekst
```

## License
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
