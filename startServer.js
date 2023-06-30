require('dotenv').config()
const app = require('./server')
const { execSync } = require('child_process')
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV === 'test') {
  try {
    console.log('Running tests...')
    execSync('npm test', { stdio: 'inherit' })
    console.log('Tests passed.')
  } catch (error) {
    console.error('Tests failed.')
    process.exit(1)
  }
}

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
