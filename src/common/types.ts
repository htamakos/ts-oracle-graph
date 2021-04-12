import javaNodeApi from '../JavaApi'

const JavaIdType: any = javaNodeApi.import('oracle.pgx.common.types.IdType')

export class IdType {
  public static INTEGER: any = new IdType(JavaIdType.INTEGER)
  public static LONG: any = new IdType(JavaIdType.LONG)
  public static STRING: any = new IdType(JavaIdType.STRING)

  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getJavaObject(): any {
    return this.internalObj
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }
}

const JavaPropertyType: any = javaNodeApi.import(
  'oracle.pgx.common.types.PropertyType',
)

export class PropertyType {
  public static DEFAULT_LABEL: string = JavaPropertyType.DEFAULT_LABEL

  public static readonly BOOLEAN = new PropertyType(JavaPropertyType.BOOLEAN)
  public static readonly DOUBLE = new PropertyType(JavaPropertyType.DOUBLE)
  public static readonly EDGE = new PropertyType(JavaPropertyType.EDGE)
  public static readonly FLOAT = new PropertyType(JavaPropertyType.FLOAT)
  public static readonly INTEGER = new PropertyType(JavaPropertyType.INTEGER)
  public static readonly LOCAL_DATE = new PropertyType(
    JavaPropertyType.LOCAL_DATE,
  )
  public static readonly LONG = new PropertyType(JavaPropertyType.LONG)
  public static readonly POINT2D = new PropertyType(JavaPropertyType.POINT2D)
  public static readonly STRING = new PropertyType(JavaPropertyType.STRING)
  public static readonly TIME = new PropertyType(JavaPropertyType.TIME)
  public static readonly TIME_WITH_TIMEZONE = new PropertyType(
    JavaPropertyType.TIME_WITH_TIMEZONE,
  )
  public static readonly TIMESTAMP = new PropertyType(
    JavaPropertyType.TIMESTAMP,
  )
  public static readonly TIMESTAMP_WITH_TIMEZONE = new PropertyType(
    JavaPropertyType.TIMESTAMP_WITH_TIMEZONE,
  )
  public static readonly VERTEX = new PropertyType(JavaPropertyType.VERTEX)

  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getJavaObject(): any {
    return this.internalObj
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }
}

const JavaPgqlResultElement: any = javaNodeApi.import(
  'oracle.pgx.api.PgqlResultElement',
)

export class PgqlResultElementType {
  public static readonly BOOLEAN = new PgqlResultElementType(
    JavaPgqlResultElement.Type.BOOLEAN,
  )
  public static readonly DATE = new PgqlResultElementType(
    JavaPgqlResultElement.Type.DATE,
  )
  public static readonly DOUBLE = new PgqlResultElementType(
    JavaPgqlResultElement.Type.DOUBLE,
  )
  public static readonly EDGE = new PgqlResultElementType(
    JavaPgqlResultElement.Type.EDGE,
  )
  public static readonly EDGE_LABEL = new PgqlResultElementType(
    JavaPgqlResultElement.Type.EDGE_LABEL,
  )
  public static readonly FLOAT = new PgqlResultElementType(
    JavaPgqlResultElement.Type.FLOAT,
  )
  public static readonly INTEGER = new PgqlResultElementType(
    JavaPgqlResultElement.Type.INTEGER,
  )
  public static readonly LIST = new PgqlResultElementType(
    JavaPgqlResultElement.Type.LIST,
  )
  public static readonly LONG = new PgqlResultElementType(
    JavaPgqlResultElement.Type.LONG,
  )
  public static readonly POINT2D = new PgqlResultElementType(
    JavaPgqlResultElement.Type.POINT2D,
  )
  public static readonly STRING = new PgqlResultElementType(
    JavaPgqlResultElement.Type.STRING,
  )
  public static readonly TIME = new PgqlResultElementType(
    JavaPgqlResultElement.Type.TIME,
  )
  public static readonly TIME_WITH_TIMEZONE = new PgqlResultElementType(
    JavaPgqlResultElement.Type.TIME_WITH_TIMEZONE,
  )
  public static readonly TIMESTAMP = new PgqlResultElementType(
    JavaPgqlResultElement.Type.TIMESTAMP,
  )
  public static readonly TIMESTAMP_WITH_TIMEZONE = new PgqlResultElementType(
    JavaPgqlResultElement.Type.TIMESTAMP_WITH_TIMEZONE,
  )
  public static readonly VERTEX = new PgqlResultElementType(
    JavaPgqlResultElement.Type.VERTEX,
  )
  public static readonly VERTEX_LABELS = new PgqlResultElementType(
    JavaPgqlResultElement.Type.VERTEX_LABELS,
  )

  private internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  name(): string {
    return this.internalObj.nameSync()
  }
}

const JavaDirection: any = javaNodeApi.import(
  'oracle.pgx.common.types.Direction',
)

export class Direction {
  public static readonly BOTH = new Direction(JavaDirection.BOTH)
  public static readonly INCOMING = new Direction(JavaDirection.INCOMING)
  public static readonly OUTGOING = new Direction(JavaDirection.OUTGOING)

  private readonly internalObj: any

  private constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getJavaObject(): any {
    return this.internalObj
  }
}
