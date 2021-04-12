import { IServerInstance, ServerInstance } from '../api/ServerInstance'
import { ClientConfig } from '../config/ClientConfig'
import javaNodeApi from '../JavaApi'

const JavaGraphServer = javaNodeApi.import('oracle.pg.rdbms.GraphServer')

/**
 * GraphServer
 * https://docs.oracle.com/en/database/oracle/property-graph/21.1/spgjv/index.html
 */
export class GraphServer {
  private static readonly _cls: any = JavaGraphServer
  public static generateToken(
    baseUrl: string,
    username: string,
    password: string,
  ) {
    return GraphServer._cls.generateTokenSync(
      baseUrl,
      username,
      GraphServer.createJavaCharArray(password),
    )
  }

  public static async getInstance(
    baseUrl: string,
    username: string,
    password: string,
    refreshTimeBeforeTokenExpiry?: number,
  ): Promise<IServerInstance> {
    const passwordCharArray: any = GraphServer.createJavaCharArray(password)

    if (
      refreshTimeBeforeTokenExpiry == null ||
      refreshTimeBeforeTokenExpiry == undefined
    ) {
      const serverInstance: ServerInstance = await GraphServer._cls.getInstanceSync(
        baseUrl,
        username,
        passwordCharArray,
      )
      return new ServerInstance(serverInstance)
    }

    const serverInstance: ServerInstance = await GraphServer._cls.getInstanceSync(
      baseUrl,
      username,
      passwordCharArray,
      refreshTimeBeforeTokenExpiry,
    )
    return new ServerInstance(serverInstance)
  }

  public static async getInstanceWithConfig(
    clientConfig: ClientConfig,
    username: string,
    password: string,
    refreshTimeBeforeTokenExpiry?: number,
  ): Promise<IServerInstance> {
    const passwordCharArray: any = GraphServer.createJavaCharArray(password)

    if (
      refreshTimeBeforeTokenExpiry == null ||
      refreshTimeBeforeTokenExpiry == undefined
    ) {
      const serverInstance: ServerInstance = await GraphServer._cls.getInstanceSync(
        clientConfig,
        username,
        passwordCharArray,
      )
      return new ServerInstance(serverInstance)
    }

    const serverInstance: ServerInstance = await GraphServer._cls.getInstanceSync(
      clientConfig,
      username,
      passwordCharArray,
      refreshTimeBeforeTokenExpiry,
    )
    return new ServerInstance(serverInstance)
  }

  private static createJavaCharArray(str: string): any {
    return javaNodeApi.newArray('char', str.split(''))
  }
}
