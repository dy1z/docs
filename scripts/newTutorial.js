const fs = require('fs')
const slugify = require('@sindresorhus/slugify')

const title = process.argv[2]
const tutsDir = './content/guides'

if (!title) {
  console.log('❌  Please specify a page title.')
  return
}

const basename = `${slugify(title)}`
const date = new Date().toISOString().slice(0,10)

if (fs.existsSync(`${tutsDir}/${basename}.md`)) {
  console.log(`❌  Error: ${tutsDir}/${basename}.md already exists.`)
  return
}

const contents = `---
title: "${title}"
slug: "${basename}"
description: ""
date: ${date}
---
`

fs.writeFile(`${tutsDir}/${date}-${basename}.md`, contents, () => console.log(`✔ Created ${tutsDir}/${basename}.md`))
