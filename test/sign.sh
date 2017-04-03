tempFile='./sessions/temp1.json'
userFile="./sessions/user1.json"

userAlias="CyrusN"
password="hello world"
path=":5000/api/auth/sign"


tokenJSON=$(http -b --session=${userFile} ${path} "alias"="$userAlias" password="$password" | jq .)

echo $tokenJSON

token=$(echo ${tokenJSON} | jq .token)

cat ${userFile} | jq ".headers.authorization=${token}" > ${tempFile}
cat ${tempFile} > ${userFile}
\rm ${tempFile}
