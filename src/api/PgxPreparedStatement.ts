import javaNodeApi from '../JavaApi'
import {
  LocalDate,
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../JavaStandardType'
import { Point2D } from '../pgql/Point2D'
import { IPgqlResultSet, PgqlResultSet } from './PgqlResultSet'

export interface IPgxPreparedStatement {
  close(): void
  execute(): Promise<boolean>
  executeQuery(): Promise<IPgqlResultSet>
  getResultSet(): Promise<IPgqlResultSet>

  setArray(column: string | number, x: any): void
  setBoolean(column: string | number, x: boolean): void
  setDate(column: string | number, x: LocalDate): void
  setDouble(column: string | number, x: number): void
  setFloat(column: string | number, x: number): void
  setInt(column: string | number, x: number): void
  setLong(column: string | number, x: number): void
  setString(column: string | number, x: string): void
  setTime(column: string | number, x: LocalTime): void
  setTimestamp(column: string | number, x: LocalDateTime): void
  setTimestampWithTimezone(column: string | number, x: OffsetDateTime): void
  setTimeWithTimezone(column: string | number, x: OffsetTime): void
  setPoint2D(column: string | number, x: Point2D): void
}

const JavaArrayList: any = javaNodeApi.import('java.util.ArrayList')

export class PgxPreparedStatement implements IPgxPreparedStatement {
  private readonly _ps: any
  constructor(ps: any) {
    this._ps = ps
  }

  close(): void {
    this._ps.closeSync()
  }
  async execute(): Promise<boolean> {
    return this._ps.executeSync()
  }
  async executeQuery(): Promise<IPgqlResultSet> {
    return new PgqlResultSet(this._ps.executeQuerySync())
  }
  async getResultSet(): Promise<IPgqlResultSet> {
    return new PgqlResultSet(this._ps.getResultSetSync())
  }

  setArray(column: string | number, x: any[]): void {
    const javaListValue: any = new JavaArrayList()
    x.forEach((v) => {
      javaListValue.addSync(v)
    })

    this._ps.setArraySync(column, javaListValue)
  }
  setBoolean(column: string | number, x: boolean): void {
    this._ps.setBooleanSync(column, x)
  }
  setDate(column: string | number, x: LocalDate): void {
    this._ps.setDateSync(column, x.getJavaObject())
  }
  setDouble(column: string | number, x: number): void {
    this._ps.setDoubleSync(column, javaNodeApi.newDouble(x))
  }
  setFloat(column: string | number, x: number): void {
    this._ps.setFloatSync(column, javaNodeApi.newFloat(x))
  }
  setInt(column: string | number, x: number): void {
    this._ps.setIntSync(column, x)
  }
  setLong(column: string | number, x: number): void {
    this._ps.setLongSync(column, x)
  }
  setString(column: string | number, x: string): void {
    this._ps.setStringSync(column, x)
  }
  setTime(column: string | number, x: LocalTime): void {
    this._ps.setTimeSync(column, x.getJavaObject())
  }
  setTimestamp(column: string | number, x: LocalDateTime): void {
    this._ps.setTimestampSync(column, x.getJavaObject())
  }
  setTimestampWithTimezone(column: string | number, x: OffsetDateTime): void {
    this._ps.setTimestampWithTimezoneSync(column, x.getJavaObject())
  }
  setTimeWithTimezone(column: string | number, x: OffsetTime): void {
    this._ps.setTimeWithTimezoneSync(column, x.getJavaObject())
  }
  setPoint2D(column: string | number, x: Point2D): void {
    this._ps.setPoint2DSync(column, x.getJavaObject())
  }
}
