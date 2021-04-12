import javaNodeApi from '../JavaApi'

const JavaPoint2D = javaNodeApi.import('oracle.pgql.lang.spatial.Point2D')

export class Point2D {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  public static fromWkt(wktPoint: string): Point2D {
    return new Point2D(JavaPoint2D.fromWktSync(wktPoint))
  }

  getJavaObject(): any {
    return this.internalObj
  }

  getX(): number {
    return this.internalObj.getXSync()
  }
  getY(): number {
    return this.internalObj.getYSync()
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }
}
