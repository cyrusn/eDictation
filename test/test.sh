method="GET"
testPath=":5000/api/test"
userFile="./sessions/user1.json"

http --session=${userFile} ${method} ${testPath}
