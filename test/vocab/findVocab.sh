method="GET"
testPath=":5000/api/vocabularies/search"
userFile="./sessions/user1.json"

http --session=${userFile} ${method} ${testPath} $@


