tempFile='./sessions/temp1.json'
userFile="./sessions/user1.json"

username="lpcyn"
password="lpcyn"
path=":5000/api/auth/sign"


tokenJSON=$(http -b --session=${userFile} ${path} "username"="$username" password="$password" | jq .)


token=$(echo ${tokenJSON} | jq .token)

echo $token

cat ${userFile} | jq ".headers.authorization=${token}" > ${tempFile}
cat ${tempFile} > ${userFile}
\rm ${tempFile}
