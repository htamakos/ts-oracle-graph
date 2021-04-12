import { IServerInstance } from '../../src/api/ServerInstance'
import { GraphServer } from '../../src/rdbms/GraphServer'
import { TestConfig } from '../TestHelper'

describe('GraphServer', (): void => {
  test('should generate token', async () => {
    const baseUrl: string = TestConfig.baseUrl
    const userName: string = TestConfig.userName
    const password: string = TestConfig.password

    const token: string = GraphServer.generateToken(baseUrl, userName, password)
    expect(token.length).toBeGreaterThan(1000)
  })

  test('should get server instance', async () => {
    const baseUrl: string = TestConfig.baseUrl
    const userName: string = TestConfig.userName
    const password: string = TestConfig.password

    const instance: IServerInstance = await GraphServer.getInstance(
      baseUrl,
      userName,
      password,
    )

    expect(instance.getPrefetchSize()).toBeGreaterThan(0)
  })
})
