import { ClientConfigBuilder } from '../../src/config/ClientConfigBuilder'
import { IClientConfig } from '../../src/config/ClientConfig'
import { TestConfig } from '../TestHelper'
import { GraphServer } from '../../src/rdbms/GraphServer'

describe('ClientConfigBuilder', (): void => {
  test('should build', async () => {
    const baseUrl: string = TestConfig.baseUrl
    const userName: string = TestConfig.userName
    const password: string = TestConfig.password
    const token: string = GraphServer.generateToken(baseUrl, userName, password)

    const builder: ClientConfigBuilder = ClientConfigBuilder.forBaseUrl(
      TestConfig.baseUrl,
    )

    const prefetchSize: number = 2000
    const isEnableCctrace: boolean = true
    const uploadBatchSize: number = 10000
    const remoteFutureTimeout: number = 1000
    const maxClientHttpConnections: number = 10
    const remoteFuturePendingRetryInterval: number = 1000

    const config: IClientConfig = builder
      .setAccessToken(token)
      .setPrefetchSize(prefetchSize)
      .setEnableCctrace(isEnableCctrace)
      .setUploadBatchSize(uploadBatchSize)
      .setRemoteFutureTimeout(remoteFutureTimeout)
      .setMaxClientHttpConnections(maxClientHttpConnections)
      .setRemoteFuturePendingRetryInterval(remoteFuturePendingRetryInterval)
      .build()

    expect(config.getBaseUrl()).toBe(baseUrl)
    expect(config.getAccessToken()).toBe(token)
    expect(config.getPrefetchSize()).toBe(prefetchSize)
    expect(config.isEnableCctrace()).toBe(isEnableCctrace)
    expect(config.getUploadBatchSize()).toBe(uploadBatchSize)
    expect(config.getRemoteFutureTimeout()).toBe(remoteFutureTimeout)
    expect(config.getMaxClientHttpConnections()).toBe(maxClientHttpConnections)
    expect(config.getRemoteFuturePendingRetryInterval()).toBe(
      remoteFuturePendingRetryInterval,
    )
  })
})
