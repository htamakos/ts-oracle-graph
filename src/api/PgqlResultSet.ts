import {
  LocalDate,
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../JavaStandardType'
import { Point2D } from '../pgql/Point2D'
import { IPgqlResultElement, PgqlResultElement } from './PgqlResultElement'
import { IPgxEdge, PgxEdge } from './PgxEdge'
import { IPgxFrame, PgxFrame } from './PgxFrame'
import { IPgxGraph, PgxGraph } from './PgxGraph'
import { IPgxVertex, PgxVertex } from './PgxVertex'

export interface IPgqlResultSet {
  getEdge(elementIdx: number | string): IPgxEdge | null
  getGraph(): IPgxGraph
  getId(): string
  getNumResults(): number
  getPgqlResultElements(): IPgqlResultElement[]
  getVertex<VID>(elementIdx: number | string): IPgxVertex<VID> | null
  getBoolean(elementIdx: number | string): boolean | null
  getDouble(elementIdx: number | string): number | null
  getFloat(elementIdx: number | string): number | null
  getInteger(elementIdx: number | string): number | null
  getLong(elementIdx: number | string): number | null
  getObject(elementIdx: number | string): any | null
  getString(elementIdx: number | string): string | null
  getTime(elementIdx: number | string): LocalTime | null
  getTimeWithTimezone(elementIdx: number | string): OffsetTime | null
  getTimestamp(elementIdx: number | string): LocalDateTime | null
  getTimestampWithTimezone(elementIdx: number | string): OffsetDateTime | null
  getList(elementIdx: number | string): any[] | null
  getDate(elementIdx: number | string): LocalDate | null
  getPoint2D(elementIdx: number | string): Point2D | null

  absolute(row: number): boolean
  afterLast(): void
  beforeFirst(): void
  close(): void
  first(): boolean
  last(): boolean
  next(): boolean
  previous(): boolean
  relative(rows: number): boolean

  toFrame(): Promise<IPgxFrame>

  print(numResults?: number, from?: number): Promise<void>
}

export class PgqlResultSet implements IPgqlResultSet {
  private readonly _rs: any

  constructor(rs: any) {
    this._rs = rs
  }

  getNumResults(): number {
    const result = this._rs.getNumResultsSync()

    if (result !== undefined && result !== null) return result.valueOf()
    return 0
  }

  getEdge(elementIdx: number | string): IPgxEdge {
    return new PgxEdge(this._rs.getEdgeSync(elementIdx))
  }

  getGraph(): IPgxGraph {
    return new PgxGraph(this._rs.getGraphSync())
  }

  getId(): string {
    return this._rs.getIdSync()
  }

  getPgqlResultElements(): IPgqlResultElement[] {
    const elms: any[] = this._rs.getPgqlResultElementsSync().toArraySync()
    return elms.map((elm: any) => new PgqlResultElement(elm))
  }

  getVertex<VID>(elementIdx: number | string): IPgxVertex<VID> | null {
    const obj: any = this._rs.getVertexSync(elementIdx)

    if (obj === null || obj === undefined) {
      return null
    }

    return new PgxVertex(obj)
  }

  getBoolean(elementIdx: number | string): boolean | null {
    const value: any = this._rs.getBooleanSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getDouble(elementIdx: number | string): number | null {
    const value: any = this._rs.getDoubleSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getFloat(elementIdx: number | string): number | null {
    const value: any = this._rs.getFloatSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getInteger(elementIdx: number | string): number | null {
    const value: any = this._rs.getIntegerSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getLong(elementIdx: number | string): number | null {
    const value: any = this._rs.getLongSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getObject(elementIdx: number | string): any | null {
    const value: any = this._rs.getObjectSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getString(elementIdx: number | string): string | null {
    const value: any = this._rs.getStringSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.valueOf()
  }

  getTime(elementIdx: number | string): LocalTime | null {
    const value: any = this._rs.getTimeSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return new LocalTime(value)
  }

  getTimeWithTimezone(elementIdx: number | string): OffsetTime | null {
    const value: any = this._rs.getTimeWithTimezoneSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return new OffsetTime(value)
  }

  getTimestamp(elementIdx: number | string): LocalDateTime | null {
    const value: any = this._rs.getTimestampSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return new LocalDateTime(value)
  }

  getTimestampWithTimezone(elementIdx: number | string): OffsetDateTime | null {
    const value: any = this._rs.getTimestampWithTimezoneSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return new OffsetDateTime(value)
  }

  getList(elementIdx: number | string): any[] | null {
    const value: any = this._rs.getListSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return value.map((elm: any) => elm)
  }

  getDate(elementIdx: number | string): LocalDate | null {
    const value: any = this._rs.getDateSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return new LocalDate(value)
  }

  getPoint2D(elementIdx: number | string): Point2D | null {
    const value: any = this._rs.getPoint2DSync(elementIdx)

    if (value === null || value === undefined) {
      return null
    }

    return new Point2D(value)
  }

  async print(numResults?: number, from?: number): Promise<void> {
    if (
      numResults !== undefined &&
      numResults !== null &&
      (from === null || from === undefined)
    ) {
      this._rs.printSync(numResults)
    } else if (
      numResults !== undefined &&
      numResults !== null &&
      from !== null &&
      from !== undefined
    ) {
      this._rs.printSync(numResults, from)
    } else {
      this._rs.printSync()
    }
  }

  absolute(row: number): boolean {
    return this._rs.absoluteSync(row)
  }

  afterLast(): void {
    return this._rs.afterLastSync()
  }

  beforeFirst(): void {
    return this._rs.beforeFirstSync()
  }

  close(): void {
    return this._rs.closeSync()
  }

  first(): boolean {
    return this._rs.firstSync()
  }

  last(): boolean {
    return this._rs.lastSync()
  }

  next(): boolean {
    return this._rs.nextSync()
  }

  previous(): boolean {
    return this._rs.previousSync()
  }

  relative(rows: number): boolean {
    return this._rs.relativeSync(rows)
  }

  async toFrame(): Promise<IPgxFrame> {
    return new PgxFrame(this._rs.toFrameSync())
  }
}
