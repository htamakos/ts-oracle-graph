export interface IClientConfig {
  /**
   * the authentication token (if server requires authentication)
   */
  getAccessToken(): number

  /**
   * The base url in the format host [ : port][ /path] of the PGX server REST end-point.
   */
  getBaseUrl(): string

  /**
   * [relevant for enable_cctrace] when cctrace is enabled, specifies a path to a file where cctrace should log to.
   */
  getCctraceOut(): string

  /**
   * path to the keystore to use for client connections.
   */
  getKeystore(): string

  /**
   * Maximum number of connections to open to the PGX server
   */
  getMaxClientHttpConnections(): number

  /**
   * if username is given, this is the HTTP BASIC Auth password.
   */
  getPassword(): string

  /**
   * How many items should be prefetched in remote iterators.
   */
  getPrefetchSize(): number

  /**
   * How many milliseconds to wait before sending another request in case a GET request for a PgxRemoteFuture receives a 202 - Accepted response
   */
  getRemoteFuturePendingRetryInterval(): number

  /**
   * How long one GET request for a PgxRemoteFuture will be alive, until it times out and tries again.
   */
  getRemoteFutureTimeout(): number

  /**
   * TLS version to be used by the client.
   */
  getTlsVersion(): string

  /**
   * path to the truststore to use for client connections.
   */
  getTruststore(): string

  /**
   * How many items will be uploaded in a batch.
   */
  getUploadBatchSize(): number

  /**
   * The username (if server requires HTTP BASIC authentication)
   */
  getUsername(): string

  /**
   * [relevant for enable_cctrace] when cctrace is enabled, print the stacktrace for each request and result
   */
  isCctracePrintStacktraces(): boolean

  /**
   * Checks if it's empty.
   */
  isEmpty(): boolean

  /**
   * if true log every call to a Control or Core interface
   */
  isEnableCctrace(): boolean

  toString(): string
  toStringWithSensitive(hideSensitiveData: boolean): string
}

export class ClientConfig implements IClientConfig {
  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getAccessToken(): number {
    return this.internalObj.getAccessTokenSync()
  }

  getBaseUrl(): string {
    return this.internalObj.getBaseUrlSync()
  }

  getCctraceOut(): string {
    return this.internalObj.getCctraceOutSync()
  }

  getKeystore(): string {
    return this.internalObj.getKeystoreSync()
  }

  getMaxClientHttpConnections(): number {
    return this.internalObj.getMaxClientHttpConnectionsSync()
  }

  getPassword(): string {
    return this.internalObj.getPasswordSync()
  }

  getPrefetchSize(): number {
    return this.internalObj.getPrefetchSizeSync()
  }

  getRemoteFuturePendingRetryInterval(): number {
    return this.internalObj.getRemoteFuturePendingRetryIntervalSync()
  }

  getRemoteFutureTimeout(): number {
    return this.internalObj.getRemoteFutureTimeoutSync()
  }

  getTlsVersion(): string {
    return this.internalObj.getTlsVersionSync()
  }

  getTruststore(): string {
    return this.internalObj.getTruststoreSync()
  }

  getUploadBatchSize(): number {
    return this.internalObj.getUploadBatchSizeSync()
  }

  getUsername(): string {
    return this.internalObj.getUsernameSync()
  }

  isCctracePrintStacktraces(): boolean {
    return this.internalObj.isCctracePrintStacktracesSync()
  }

  isEmpty(): boolean {
    return this.internalObj.isEmptySync()
  }

  isEnableCctrace(): boolean {
    return this.internalObj.isEnableCctraceSync()
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }

  toStringWithSensitive(hideSensitiveData: boolean): string {
    return this.internalObj.toStringSync(hideSensitiveData)
  }
}
