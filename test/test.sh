testPath=":5000/api/test"
userFile="./sessions/user1.json"

http --session=${userFile} ${testPath}
