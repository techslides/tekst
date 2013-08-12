Tekst
-----
A webservice that has a Angular/Javascript frontend that communicates through ajax calls to the Go backend that will respond with JSON responses.

The services runs on the default :8000 port.

Sample request
--------------
```
curl -X POST -d "{\"test\": \"that\"}" http://localhost:8000/test
```
