import javaNodeApi from '../JavaApi'

const JavaNamespace = javaNodeApi.import('oracle.pgx.api.Namespace')

export class Namespace {
  public static readonly PRIVATE = new Namespace(JavaNamespace.PRIVATE)
  public static readonly PUBLIC = new Namespace(JavaNamespace.PUBLIC)

  private readonly internalObj: any

  private constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getJavaObject(): any {
    return this.internalObj
  }
}
