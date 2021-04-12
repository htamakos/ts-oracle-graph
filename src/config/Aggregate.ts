import javaNodeApi from '../JavaApi'

const JavaAggregate: any = javaNodeApi.import('oracle.pgx.config.Aggregate')

export class Aggregate {
  public static readonly AVG = new Aggregate(JavaAggregate.AVG)
  public static readonly CONCAT = new Aggregate(JavaAggregate.CONCAT)
  public static readonly COUNT = new Aggregate(JavaAggregate.COUNT)
  public static readonly GROUP_KEY = new Aggregate(JavaAggregate.GROUP_KEY)
  public static readonly IDENTITY = new Aggregate(JavaAggregate.IDENTITY)
  public static readonly MAX = new Aggregate(JavaAggregate.MAX)
  public static readonly MIN = new Aggregate(JavaAggregate.MIN)
  public static readonly SUM = new Aggregate(JavaAggregate.SUM)

  private readonly internalObj: any

  public static valueOf(name: string): Aggregate {
    return Aggregate.fromJavaObject(JavaAggregate.valueOfSync(name))
  }

  public static values(): Aggregate[] {
    const obj: any[] = JavaAggregate.valuesSync().toArraySync()
    return obj.map((o) => new Aggregate(o))
  }

  private constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getJavaObject(): any {
    return this.internalObj
  }

  name(): string {
    return this.internalObj.nameSync().valueOf()
  }

  toString(): string {
    return this.internalObj.toStringSync().valueOf()
  }

  public static fromJavaObject(javaObject: any): Aggregate {
    return new Aggregate(javaObject)
  }
}
