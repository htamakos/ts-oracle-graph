import { IdType, PgqlResultElementType } from '../common/types'

export interface IPgqlResultElement {
  getCollectionElementType(): PgqlResultElementType
  getElementType(): PgqlResultElementType
  getVarName(): string
  getVertexEdgeIdType(): IdType
}

export class PgqlResultElement implements IPgqlResultElement {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getCollectionElementType(): PgqlResultElementType {
    return new PgqlResultElementType(
      this.internalObj.getCollectionElementTypeSync(),
    )
  }

  getElementType(): PgqlResultElementType {
    return new PgqlResultElementType(this.internalObj.getElementTypeSync())
  }

  getVarName(): string {
    return this.internalObj.getVarNameSync()
  }

  getVertexEdgeIdType(): IdType {
    return this.internalObj.getVertexEdgeIdTypeSync()
  }
}
