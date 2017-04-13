# eDictation

# How to use this app
## Import User
- prepare `users.json` in `/data`
- run `node ./app.js import ./data/user.json`

``` json
// student.json
[
  {
    "schoolYear": "2016-17",
    "role": "student",
    "classCode": "3A",
    "classNo": 1,
    "cname": "XXX",
    "ename": "XXX XXX XXX",
    "password": "XXXXXXXX",
    "username": "lpXXXXXX"
  }, {
    "role": "teacher",
    "cname": "XXX",
    "ename": "XXX XXX XXX",
    "password": "XXXXXXXX",
    "username": "lpXXXXXX"
  }, {
    "role": "admin",
    "cname": "XXX",
    "ename": "XXX XXX XXX",
    "password": "XXXXXXXX",
    "username": "lpXXXXXX"
  }
]
```


## start server
- setup `server/config.json`
- run `mongod --dbpath='./database'` or `npm run db`
```
cd ./server
npm run start
```
