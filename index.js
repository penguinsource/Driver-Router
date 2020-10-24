const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./react/build'))

app.get('/api/sup', (req, res) => {
  res.send('Hello World 2!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
