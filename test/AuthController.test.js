process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { User } = require('../models')

describe('Auth controller test', () => {
  let testUser
  let testToken

  test('Create user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'testpassword',
      DOB: '1999-05-01',
      state: 'userstate',
      ZIP: 'userZIP',
      firstName: 'userfirstname',
      gender: 'usergender',
      ethnicity: 'userethnicity',
      email: 'test@email.com',
      race: 'userrace'
    })

    testUser = response.body

    expect(response.statusCode).toBe(201)
    expect(testUser.username).toBe('testuser')
    expect(testUser.id).toBe(testUser.id)
  })

  test('Login user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpassword'
    })

    testToken = response.body.token

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.user.username).toBe('testuser')
  })

  test('Check session test', async () => {
    const response = await request(app)
      .get('/api/auth/session')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.statusCode).toBe(200)
    expect(response).toHaveProperty('body')
  })

  test('Update password', async () => {
    const response = await request(app)
      .put('/api/auth/update-password')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        username: 'testuser',
        oldPassword: 'testpassword',
        newPassword: 'testnewpassword'
      })

    expect(response.body.status).toBe('Success')
    expect(response.body.msg).toBe('Password updated')
  })

  test('Update password fail', async () => {
    const response = await request(app)
      .put('/api/auth/update-password')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        username: 'testuser',
        oldPassword: 'testpassword1',
        newPassword: 'testnewpassword'
      })

    expect(response.body.status).toBe('Error')
    expect(response.body.msg).toBe('Unauthorized')
  })

  afterAll(async () => {
    try {
      await User.destroy({ truncate: { cascade: true } })
    } catch (error) {
      console.log('Error cleaning up test data: ', error)
    }
  })
})
