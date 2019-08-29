import micro from 'micro'
import handler from '../src'

describe('Serverless implemenation', () => {
  it('exists', async () => {
    const server = micro(handler)

    expect(server).not.toBeFalsy()
  })
})
