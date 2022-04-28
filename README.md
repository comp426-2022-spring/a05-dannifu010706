[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7647821&assignment_repo_type=AssignmentRepo)
# a05 Human Interface

In this assignment, you will build an HTML human interface for your API. You will also document your API endpoints and consider package structure.

## DO NOT CLONE THIS REPOSITORY DIRECTLY

Use the GitHub classroom link instead: https://classroom.github.com/a/PUVGxeMe

If you clone this repo directly, it will not be added to the organization as an individual repo associated with your account and you will not be able to push to it.

## Instructions

Full instructions for this assignment are available at: https://comp426.johndmart.in/a/05/

<!-- DELETE EVERYTHING ABOVE THIS LINE -->

# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 28 Apr 2022 02:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flip/
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 29
ETag: W/"1d-F1e1PYqNFAglEIDCiBTyGCoLBls"
Date: Thu, 28 Apr 2022 01:59:00 EST
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flips/5
```

#### Response body

```
{"raw":["tails","heads","heads","heads","heads"],"summary":{"heads":4,"tails":1}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 32
ETag: W/"20-AI3b+IJTVuuq4p+UCNVdxC54Y04"
Date: Wed, 27 Apr 2022 22:04:13 EST
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coin/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flip/coin/
```

#### Response body

```
{"flip":"tails"}
```

#### Response headers

```
$ curl -I http://localhost:5555/app/flip/coins
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:07:29 EST
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flip/call/heads
```

#### Response body

```
{"call":"heads","flip":"tails","result":"lose"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-7jHpBxeRlMwmX45a5nEiITPVllI"
Date: Thu, 28 Apr 2022 02:10:52 EST
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5555/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5555/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","tails","tails","heads","heads","tails","tails","tails","tailss","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","tails","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":18,"tails":12}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 28 Apr 2022 02:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```


### /app/log/access/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/log
```

#### Response body

```
{"message":"Endpoint not found (404)"}
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:22:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/error/ (GET)

_Not yet implemented_

#### Request cURL

```
curl http://localhost:5555/app/log/error
```

#### Response body

```
{"message":"Endpoint not found (404)"}
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:22:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/ (POST)

_Not yet implemented_

#### Request cURL

```
curl --data "username=test&password=pwd" http://localhost:5555/app/user/login/
```

#### Response body

```
{"message":"Endpoint not found (404)"}
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:22:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/new/ (POST)

_Not yet implemented_

#### Request cURL

```
curl --data "email=ahhha@email.com&username=testuser&password=password" http://localhost:5555/app/user/new
```

#### Response body

```
{"message":"Endpoint not found (404)"}
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:22:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/update/ (PATCH)

_Not yet implemented_

#### Request cURL

```
curl -X PATCH http://localhost:5555/app/user/update/ -H "Content-Type: application/json" -d '{"username":"testuser","password":"password","email":"ahhha@email.com"}'
```

#### Response body

```
{"message":"Endpoint not found (404)"}
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:22:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/delete/ (DELETE)

_Not yet implemented_

#### Request cURL

```
curl -X DELETE http://localhost:5555/app/user/delete/?username=testuser -H "Accept: application/json"
```

#### Response body

```
{"message":"Endpoint not found (404)"}
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-7vzOf0OSO0wnvL5QfhOufq8o8b4"
Date: Thu, 28 Apr 2022 02:22:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
