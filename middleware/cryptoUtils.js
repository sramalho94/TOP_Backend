require('dotenv').config({ path: '.env.local' })

const crypto = require('crypto')

const algorithm = process.env.ALGORITHM
const secretKey = crypto.scryptSync(process.env.SECRET_KEY, 'salt', 32)
const ivLength = 16

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return Buffer.concat([iv, authTag, encrypted]).toString('hex')
}

function decrypt(text) {
  const data = Buffer.from(text, 'hex')
  const iv = data.slice(0, ivLength)
  const authTag = data.slice(ivLength, ivLength + 16)
  const encryptedText = data.slice(ivLength + 16)
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
  decipher.setAuthTag(authTag)
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final()
  ])
  return decrypted.toString()
}

module.exports = {
  encrypt,
  decrypt
}
