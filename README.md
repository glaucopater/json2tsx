# json2tsx

A node module to convert json objects into typescript react components

# Step 1

Import json (i.e data.json)

# Step 2:

[install quicktype]

quicktype .\data.json -o output\data.ts --just-types --no-enums

# Build : will compile ts into js code

yarn build

# Run

node .\dist\index.js .\data.json
