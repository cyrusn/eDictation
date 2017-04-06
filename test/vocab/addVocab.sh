title="accept"
defination="接受"
partOfSpeech="v"

method="POST"
testPath=":5000/api/vocabularies/add"
userFile="./sessions/user1.json"

jq '.list[0] | {title, definations: [{partOfSpeech, chi: .definations[]}]}' < ./vocab/vocab.json | http --session=${userFile} ${method} ${testPath}



