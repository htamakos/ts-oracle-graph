import javaNodeApi from '../JavaApi'
import { ClientConfig, IClientConfig } from './ClientConfig'

const JavaClientConfigBuilder: any = javaNodeApi.import(
  'oracle.pgx.config.ClientConfigBuilder',
)

export class ClientConfigBuilder {
  private readonly internalObj: any

  /**
   * Creates a new ClientConfigBuilder for a specific PGX base URL.
   */
  public static forBaseUrl(baseUrl: string): ClientConfigBuilder {
    return new ClientConfigBuilder(
      JavaClientConfigBuilder.forBaseUrlSync(baseUrl),
    )
  }

  private constructor(internalObj?: any) {
    if (internalObj == null || internalObj == undefined) {
      this.internalObj = new JavaClientConfigBuilder()
    } else {
      this.internalObj = internalObj
    }
  }

  /**
   * Creates a ClientConfig object with the specified values
   */
  build(): IClientConfig {
    return new ClientConfig(this.internalObj.buildSync())
  }

  /**
   * Sets the authentication token (if server requires authentication)
   */
  setAccessToken(token: string): ClientConfigBuilder {
    this.internalObj.setAccessTokenSync(token)
    return this
  }

  /**
   * Sets the base URL
   */
  setBaseUrl(baseUrl: string): ClientConfigBuilder {
    this.internalObj.setBaseUrlSync(baseUrl)
    return this
  }

  /**
   * Sets whether CC tracing is enabled
   */
  setEnableCctrace(enableCctrace: boolean): ClientConfigBuilder {
    this.internalObj.setEnableCctraceSync(enableCctrace)
    return this
  }

  /**
   * Sets the maximum amount of client HTTP connections
   */
  setMaxClientHttpConnections(
    maxClientHttpConnections: number,
  ): ClientConfigBuilder {
    this.internalObj.setMaxClientHttpConnectionsSync(maxClientHttpConnections)
    return this
  }

  /**
   * Sets the password
   */
  setPassword(password: string): ClientConfigBuilder {
    this.internalObj.setPasswordSync(password)
    return this
  }

  /**
   * Sets the prefetch size
   */
  setPrefetchSize(prefetchSize: number): ClientConfigBuilder {
    this.internalObj.setPrefetchSizeSync(prefetchSize)
    return this
  }

  /**
   * Sets the remote future pending retry interval
   */
  setRemoteFuturePendingRetryInterval(
    remoteFuturePendingRetryInterval: number,
  ): ClientConfigBuilder {
    this.internalObj.setRemoteFuturePendingRetryIntervalSync(
      remoteFuturePendingRetryInterval,
    )
    return this
  }

  /**
   * Sets the remote future timeout
   */
  setRemoteFutureTimeout(remoteFutureTimeout: number): ClientConfigBuilder {
    this.internalObj.setRemoteFutureTimeoutSync(remoteFutureTimeout)
    return this
  }

  /**
   * Sets the upload batch size
   */
  setUploadBatchSize(uploadBatchSize: number): ClientConfigBuilder {
    this.internalObj.setUploadBatchSizeSync(uploadBatchSize)
    return this
  }

  /**
   * Sets the username
   */
  setUsername(username: string): ClientConfigBuilder {
    this.internalObj.setUsernameSync(username)
    return this
  }
}
