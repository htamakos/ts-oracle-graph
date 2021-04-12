import { IdType } from '../common/types'
import { IdGenerationStrategy } from '../config/IdGenerationStrategy'
import javaNodeApi from '../JavaApi'
import { Analyst, IAnalyst } from './Analyst'
import { GraphBuilder, IGraphBuilder } from './GraphBuilder'
import { Namespace } from './Namespace'
import { IPgxGraph } from './PgxGraph'

const JavaPgxSession: any = javaNodeApi.import('oracle.pgx.api.PgxSession')

/**
 * PgxSession
 * https://docs.oracle.com/en/database/oracle/property-graph/21.1/spgjv/oracle/pgx/api/PgxSession.html
 */
export interface IPgxSession {
  createAnalyst(): Promise<IAnalyst>
  createGraphBuilder<VID>(
    idType?: IdType,
    vertexIdGenerationStrategy?: IdGenerationStrategy,
    edgeIdGenerationStrategy?: IdGenerationStrategy,
  ): IGraphBuilder<VID>

  getGraph(name: string, namespace?: Namespace): Promise<IPgxGraph | null>
  getGraphs(namespace: Namespace): Promise<string[]>

  destroy(): Promise<void>
}

export class PgxSession implements IPgxSession {
  private readonly internalObj: any

  public static LATEST_SNAPSHOT: number =
    JavaPgxSession.LATEST_SNAPSHOT.longValue

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  async getGraph(
    name: string,
    namespace: Namespace = Namespace.PUBLIC,
  ): Promise<IPgxGraph | null> {
    return this.internalObj.getGraphSync(namespace.getJavaObject(), name)
  }

  async getGraphs(namespace: Namespace): Promise<string[]> {
    const graphNames: any[] = this.internalObj
      .getGraphsSync(namespace.getJavaObject())
      .toArraySync()

    return graphNames.map((n) => n.valueOf())
  }

  /**
   * Creates a new analyst.
   */
  async createAnalyst(): Promise<IAnalyst> {
    return new Analyst(this.internalObj.createAnalystSync())
  }

  /**
   * Creates a graph builder with integer vertex IDs
   */
  createGraphBuilder<VID>(
    idType?: IdType,
    vertexIdGenerationStrategy?: IdGenerationStrategy,
    edgeIdGenerationStrategy?: IdGenerationStrategy,
  ): IGraphBuilder<VID> {
    if (
      idType !== null &&
      idType !== undefined &&
      vertexIdGenerationStrategy !== null &&
      vertexIdGenerationStrategy !== undefined &&
      (edgeIdGenerationStrategy === null ||
        edgeIdGenerationStrategy === undefined)
    ) {
      return new GraphBuilder<VID>(
        this.internalObj.createGraphBuilderSync(
          idType.getJavaObject(),
          vertexIdGenerationStrategy,
          IdGenerationStrategy.AUTO_GENERATED,
        ),
      )
    } else if (
      idType !== null &&
      idType !== undefined &&
      vertexIdGenerationStrategy !== null &&
      vertexIdGenerationStrategy !== undefined &&
      edgeIdGenerationStrategy !== null &&
      edgeIdGenerationStrategy !== undefined
    ) {
      return new GraphBuilder<VID>(
        this.internalObj.createGraphBuilderSync(
          idType.getJavaObject(),
          vertexIdGenerationStrategy,
          edgeIdGenerationStrategy,
        ),
      )
    } else {
      return new GraphBuilder<VID>(this.internalObj.createGraphBuilderSync())
    }
  }

  async destroy(): Promise<void> {
    this.internalObj.destroy()
  }
}
