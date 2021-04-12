import { IPgxSession, PgxSession } from './PgxSession'

export interface IServerInstance {
  createSession(source: string): Promise<IPgxSession>
  getBaseUrl(): string
  getPrefetchSize(): number
  getRemoteFuturePendingRetryInterval(): number
  getRemoteFutureTimeout(): number
  getSession(id: string): Promise<IPgxSession>
  getUploadBatchSize(): number
  getUsername(): string
  isEmbeddedInstance(): boolean
  isEngineRunning(): boolean
  killSession(sessionId: string): Promise<void>
  setToken(token: string): void
  shutdownEngineNow(): Promise<void>
  shutdownEngineNowIfRunning(): Promise<void>
  startEngine(): Promise<void>
  unpinGraph(graphName: string): Promise<void>
}

export class ServerInstance implements IServerInstance {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  async createSession(source: string): Promise<IPgxSession> {
    const session: any = await this.internalObj.createSession(source)

    return new PgxSession(session)
  }

  getBaseUrl(): string {
    return this.internalObj.getBaseUrlSync()
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

  async getSession(id: string): Promise<IPgxSession> {
    const session = await this.internalObj.getSession(id)
    return new PgxSession(session)
  }

  getUploadBatchSize(): number {
    return this.internalObj.getUploadBatchSizeSync()
  }

  getUsername(): string {
    return this.internalObj.getUsernameSync()
  }

  isEmbeddedInstance(): boolean {
    return this.internalObj.isEmbeddedInstanceSync()
  }

  isEngineRunning(): boolean {
    return this.internalObj.isEngineRunningSync()
  }

  async killSession(sessionId: string): Promise<void> {
    return this.internalObj.killSession(sessionId)
  }

  setToken(token: string): void {
    this.internalObj.setTokenSync(token)
  }

  async shutdownEngineNow(): Promise<void> {
    return this.internalObj.shutdownEngineNow()
  }

  async shutdownEngineNowIfRunning(): Promise<void> {
    return this.internalObj.shutdownEngineNowIfRunning()
  }

  async startEngine(): Promise<void> {
    return this.internalObj.startEngine()
  }

  unpinGraph(graphName: string): Promise<void> {
    return this.internalObj.unpinGraph(graphName)
  }
}
