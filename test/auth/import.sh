method="POST"
files=(
  "student"
  "teacher"
  "admin"
)

for file in "${files[@]}"
do
  node ./app.js import "./data/${file}.json"
done
# rm ${dummyFile}
