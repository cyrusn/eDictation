userFile="./sessions/user1.json"
method="POST"
testPath=":5000/api/vocabularies/import"

jq '[.list[] | {title, definations: [{partOfSpeech, chi: .definations[]}]}]' < ./vocab/vocab.json | http --session=${userFile} ${method} ${testPath}
