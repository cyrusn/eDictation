userFile="./sessions/user1.json"
method="POST"
testPath=":5000/api/vocabs/import"

jq '[.[] | {title, definations: [{partOfSpeeches: [.partOfSpeech], translations: .definations}]}]' < ./vocab/vocab.json | http --session=${userFile} ${method} ${testPath}
