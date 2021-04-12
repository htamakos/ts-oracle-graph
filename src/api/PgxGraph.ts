import { PropertyType } from '../common/types'
import { EdgeProperty, IEdgeProperty } from './EdgeProperty'
import { IPgqlResultSet, PgqlResultSet } from './PgqlResultSet'
import { IPgxEdge, PgxEdge } from './PgxEdge'
import { PgxPreparedStatement } from './PgxPreparedStatement'
import { IPgxVertex, PgxVertex } from './PgxVertex'
import { IVertexProperty, VertexProperty } from './VertexProperty'

export interface IPgxGraph {
  //TODO: addReductionRule(oracle.pgx.config.PgxRedactionRuleConfig ruleConfig, AuthorizationType type, java.lang.String... names)
  //TODO: alterGraph()
  //TODO: bipartiteSubGraphFromInDegree()
  //TODO: bipartiteSubGraphFromLeftSet
  //clone<VID = any, VT = any, ET = any>(
  //  vertexProps?: VertexProperty<VID, VT>,
  //  edgeProps?: EdgeProperty<ET>,
  //  newGraphName?: string,
  //): Promise<IPgxGraph>
  // TODO: getVertices(VertexFileter filter, String name)
  getVertices<VID>(): IPgxVertex<VID>[]
  getEdges(): IPgxEdge[]
  getRandomVertex<VID>(): IPgxVertex<VID>
  getRandomEdge(): IPgxEdge

  getVertexProperties<VID = any, VT = any>(): VertexProperty<VID, VT>[]

  toString(): string
  getName(): string
  getNumEdges(): number
  getNumVertices(): number

  executePgql(pgqlString: string): Promise<IPgqlResultSet>
  queryPgql(pgqlString: string): Promise<IPgqlResultSet>
  preparePgql(pgqlString: string): Promise<PgxPreparedStatement>

  getOrCreateVertexProperty<ID, V>(
    propertyType: PropertyType,
    name: string,
  ): IVertexProperty<ID, V>

  getOrCreateEdgeProperty<V>(
    propertyType: PropertyType,
    name: string,
  ): IEdgeProperty<V>

  getJavaObject(): any

  publish(): void

  destroy(): Promise<void>
}

export class PgxGraph implements IPgxGraph {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getName(): string {
    return this.internalObj.getNameSync()
  }

  getNumEdges(): number {
    return this.internalObj.getNumEdgesSync().valueOf()
  }

  getNumVertices(): number {
    return this.internalObj.getNumVerticesSync().valueOf()
  }

  async executePgql(pgqlString: string): Promise<IPgqlResultSet> {
    return new PgqlResultSet(this.internalObj.executePgqlSync(pgqlString))
  }

  async preparePgql(pgqlString: string): Promise<PgxPreparedStatement> {
    return new PgxPreparedStatement(
      this.internalObj.preparePgqlSync(pgqlString),
    )
  }

  getOrCreateVertexProperty<ID, V>(
    propertyType: PropertyType,
    name: string,
  ): IVertexProperty<ID, V> {
    return new VertexProperty(
      this.internalObj.getOrCreateVertexPropertySync(
        propertyType.getJavaObject(),
        name,
      ),
    )
  }

  getOrCreateEdgeProperty<V>(
    propertyType: PropertyType,
    name: string,
  ): IEdgeProperty<V> {
    return new EdgeProperty(
      this.internalObj.getOrCreateEdgePropertySync(
        propertyType.getJavaObject(),
        name,
      ),
    )
  }

  async destroy(): Promise<void> {
    this.internalObj.destroySync()
  }

  async queryPgql(pgqlString: string): Promise<IPgqlResultSet> {
    return new PgqlResultSet(this.internalObj.queryPgqlSync(pgqlString))
  }

  getJavaObject(): any {
    return this.internalObj
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }

  getVertexProperties<VID = any, VT = any>(): VertexProperty<VID, VT>[] {
    const obj: any[] = this.internalObj.getVertexPropertiesSync().toArraySync()

    return obj.map((o) => new VertexProperty(o))
  }

  getVertices<VID>(): IPgxVertex<VID>[] {
    const obj: any[] = this.internalObj.getVerticesSync().toArraySync()
    return obj.map((o) => new PgxVertex(o))
  }

  getEdges(): IPgxEdge[] {
    const obj: any[] = this.internalObj.getEdgesSync().toArraySync()
    return obj.map((o) => new PgxEdge(o))
  }

  getRandomVertex<VID>(): IPgxVertex<VID> {
    return new PgxVertex(this.internalObj.getRandomVertexSync())
  }

  getRandomEdge(): IPgxEdge {
    return new PgxEdge(this.internalObj.getRandomEdgeSync())
  }

  publish(): void {
    this.internalObj.publishSync()
  }
}
