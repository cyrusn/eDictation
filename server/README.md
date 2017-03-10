# eDictation

# Features
- login / logout
- role
	+ student
	+ teacher
	+ admin
- `admin` can add or remove vocabulary
- test
	+ loop all the vocabulary
	+ shuffle questions
	+ if `noOfCurrentCorrectAnswer` is less the 80% of total no of answered question.
		* then test will restart.
- marking system
- generate report
- create database for vocabulary

# HapiJS as server app
- [16.1.0 API Reference](https://hapijs.com/api)

## HapiJS Plugin
- [GitHub - glennjones/hapi-swagger: A Swagger interface for HAPI](https://github.com/glennjones/hapi-swagger)
- [GitHub - ryanfitz/hapi-auth-jwt: JSON Web Token (JWT) authentication plugin](https://github.com/ryanfitz/hapi-auth-jwt)
- [GitHub - hapijs/good: hapi process monitoring](https://github.com/hapijs/good)
- [GitHub - hapijs/boom: HTTP-friendly error objects](https://github.com/hapijs/boom)
- [GitHub - hapijs/joi: Object schema validation](https://github.com/hapijs/joi)
- [GitHub - hapijs/inert: Static file and directory handlers for hapi.js](https://github.com/hapijs/inert)

## Use JWT for authetication
- save to header, using a short live token
- [JSON Web Tokens - jwt.io](https://jwt.io/)

# LevelDB as Database
- [GitHub - Level/levelup: LevelDB - Node.js style](https://github.com/Level/levelup)

# Vocabulary Schema
- `level`: 1 - 5 ranking, 5 is the most difficult wording

``` json
[{
	"level": 1,
	"chinese": "你好",
	"english": "hello",
	"example": "hello, how are you."
}]
```
