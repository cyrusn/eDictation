tempFile='./sessions/temp1.json'
userFile="./sessions/user1.json"

userAlias="CyrusN"
password="hello world"
path=":5000/api/auth/sign"


token=$(http -b --session=${userFile} ${path} "alias"="$userAlias" password="$password" | jq .token)

echo $token

cat ${userFile} | jq ".headers.authorization=${token}" > ${tempFile}
cat ${tempFile} > ${userFile}
\rm ${tempFile}

