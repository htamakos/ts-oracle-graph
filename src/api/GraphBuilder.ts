import { IPgxGraph, PgxGraph } from './PgxGraph'

export interface IGraphBuilder<VID> {
  addVertex(vertexId?: VID): IVertexBuilder<VID>
  addEdgeWithId(
    edgeId: number,
    srcVertex: VID,
    dstVertex: VID,
  ): IEdgeBuilder<VID>
  addEdge(srcVertex: VID, dstVertex: VID): IEdgeBuilder<VID>
  resetEdge(edgeId: number): IGraphBuilder<VID>
  resetVertex(vertexId: VID): IGraphBuilder<VID>
  setDataSourceVersion(version: string): IGraphBuilder<VID>
  setRetainEdgeIds(retainEdgeIds: boolean): IGraphBuilder<VID>
  setRetainIds(retainIds: boolean): IGraphBuilder<VID>
  setRetainVertexIds(retainVertexIds: boolean): IGraphBuilder<VID>
  build(newGraphName?: string): Promise<IPgxGraph>
}

export interface IEdgeBuilder<VID> extends IGraphBuilder<VID> {
  getId(): number
  isIgnored(): boolean
  setLabel(label: string): IEdgeBuilder<VID>
  setProperty(key: string, value: any): IEdgeBuilder<VID>
}

export interface IVertexBuilder<VID> extends IGraphBuilder<VID> {
  getId(): number
  isIgnored(): boolean
  addLabel(label: string): IVertexBuilder<VID>
  setProperty(key: string, value: any): IVertexBuilder<VID>
}

export class GraphBuilder<VID> implements IGraphBuilder<VID> {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  addVertex(vertexId?: VID): IVertexBuilder<VID> {
    let obj: any
    if (vertexId === null || vertexId === undefined) {
      obj = this.internalObj.addVertexSync()
    } else {
      obj = this.internalObj.addVertexSync(vertexId!)
    }
    return new VertexBuilder(obj)
  }

  addEdge(srcVertex: VID, dstVertex: VID): IEdgeBuilder<VID> {
    const obj: any = this.internalObj.addEdgeSync(srcVertex, dstVertex)
    return new EdgeBuilder(obj)
  }

  addEdgeWithId(
    edgeId: number,
    srcVertex: VID,
    dstVertex: VID,
  ): IEdgeBuilder<VID> {
    const obj: any = this.internalObj.addEdgeSync(edgeId, srcVertex, dstVertex)
    return new EdgeBuilder(obj)
  }

  async build(newGraphName?: string): Promise<IPgxGraph> {
    if (newGraphName === null || newGraphName === undefined) {
      return new PgxGraph(this.internalObj.buildSync())
    } else {
      return new PgxGraph(this.internalObj.buildSync(newGraphName))
    }
  }

  resetEdge(edgeId: number): IGraphBuilder<VID> {
    return new GraphBuilder<VID>(this.internalObj.resetEdgeSync(edgeId))
  }

  resetVertex(vertexId: VID): IGraphBuilder<VID> {
    return new GraphBuilder<VID>(this.internalObj.resetVertexSync(vertexId))
  }

  setDataSourceVersion(version: string): IGraphBuilder<VID> {
    return new GraphBuilder<VID>(
      this.internalObj.setDataSourceVersionSync(version),
    )
  }

  setRetainEdgeIds(retainEdgeIds: boolean): IGraphBuilder<VID> {
    return new GraphBuilder<VID>(
      this.internalObj.setRetainEdgeIdsSync(retainEdgeIds),
    )
  }

  setRetainIds(retainIds: boolean): IGraphBuilder<VID> {
    return new GraphBuilder<VID>(this.internalObj.setRetainIdsSync(retainIds))
  }

  setRetainVertexIds(retainVertexIds: boolean): IGraphBuilder<VID> {
    return new GraphBuilder<VID>(
      this.internalObj.setRetainVertexIdsSync(retainVertexIds),
    )
  }
}

class EdgeBuilder<VID> extends GraphBuilder<VID> implements IEdgeBuilder<VID> {
  private readonly _edgeBuilder: any

  constructor(internalObj: any) {
    super(internalObj)
    this._edgeBuilder = internalObj
  }

  getId(): number {
    return this._edgeBuilder.getIdSyn()
  }

  isIgnored(): boolean {
    return this._edgeBuilder.isIgnoredSync()
  }

  setLabel(label: string): IEdgeBuilder<VID> {
    this._edgeBuilder.setLabelSync(label)
    return this
  }

  setProperty(key: string, value: any): IEdgeBuilder<VID> {
    this._edgeBuilder.setPropertySync(key, value)
    return this
  }
}

class VertexBuilder<VID>
  extends GraphBuilder<VID>
  implements IVertexBuilder<VID> {
  private readonly _vertexBuilder: any

  constructor(internalObj: any) {
    super(internalObj)
    this._vertexBuilder = internalObj
  }

  getId(): number {
    return this._vertexBuilder.getIdSyn()
  }

  isIgnored(): boolean {
    return this._vertexBuilder.isIgnoredSync()
  }

  addLabel(label: string): IVertexBuilder<VID> {
    this._vertexBuilder.addLabelSync(label)
    return this
  }

  setProperty(key: string, value: any): IVertexBuilder<VID> {
    this._vertexBuilder.setPropertySync(key, value)
    return this
  }
}
