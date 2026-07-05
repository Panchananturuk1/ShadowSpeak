// @vitest-environment node
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from './app'

describe('platform api', () => {
  it('returns supported languages', async () => {
    const response = await request(app).get('/api/languages')

    expect(response.status).toBe(200)
    expect(response.body.languages.length).toBeGreaterThan(3)
  })

  it('authenticates a learner', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'learner@example.com',
      password: 'demo-pass',
    })

    expect(response.status).toBe(200)
    expect(response.body.user.displayName).toBeTruthy()
  })
})
