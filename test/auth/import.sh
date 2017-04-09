method="POST"
testPath=":5000/api/auth/import"

jq '.users' < './auth/users.json' | http  ${method} ${testPath}
