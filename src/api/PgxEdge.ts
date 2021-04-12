import { IdType, PropertyType } from '../common/types'
import javaNodeApi from '../JavaApi'
import {
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../JavaStandardType'
import { Point2D } from '../pgql/Point2D'
import { IPgxEntity } from './PgxEntity'
import { IPgxGraph, PgxGraph } from './PgxGraph'
import { IPgxVertex, PgxVertex } from './PgxVertex'

export interface IPgxEdge extends IPgxEntity<number> {
  getDestination<VID>(): IPgxVertex<VID>
  getLabel(): string
  getSource<VID>(): IPgxVertex<VID>
  getVertices<VID>(): IPgxVertex<VID>[]
  getJavaObject(): any
}

export class PgxEdge implements IPgxEdge {
  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getDestination<VID>(): IPgxVertex<VID> {
    return new PgxVertex(this.internalObj.getDestinationSync())
  }

  getLabel(): string {
    return this.internalObj.getLabelSync().valueOf()
  }

  getSource<VID>(): IPgxVertex<VID> {
    return new PgxVertex(this.internalObj.getSourceSync())
  }

  getVertices<VID>(): IPgxVertex<VID>[] {
    const virtices: any = this.internalObj.getVerticesSync()

    return [
      new PgxVertex(virtices.getFirstSync()),
      new PgxVertex(virtices.getSecondSync()),
    ]
  }

  getGraph(): IPgxGraph {
    return new PgxGraph(this.internalObj.getGraphSync())
  }

  getId(): number {
    return this.internalObj.getIdSync().valueOf()
  }

  getProperty<V>(propertyName: string, t: PropertyType): V {
    const obj: any = this.internalObj.getPropertySync(propertyName).valueOf()
    return this._get(t, obj)
  }

  private _get(t: PropertyType, v: any): any {
    switch (t.toString()) {
      case PropertyType.TIME.toString():
        return new LocalTime(v)
      case PropertyType.TIMESTAMP.toString():
        return new LocalDateTime(v)
      case PropertyType.TIME_WITH_TIMEZONE.toString():
        return new OffsetTime(v)
      case PropertyType.TIMESTAMP_WITH_TIMEZONE.toString():
        return new OffsetDateTime(v)
      case PropertyType.POINT2D.toString():
        return new Point2D(v)
      case PropertyType.VERTEX.toString():
        return new PgxVertex<number | string>(v)
      case PropertyType.EDGE.toString():
        return new PgxEdge(v)
      default:
        return v.valueOf()
    }
  }

  private _setValue(t: PropertyType, value: any): any {
    let v: unknown

    switch (t.toString()) {
      case PropertyType.LONG.toString():
        v = javaNodeApi.newLong(value as number)
        break
      case PropertyType.FLOAT.toString():
        v = javaNodeApi.newFloat(value as number)
        break
      case PropertyType.DOUBLE.toString():
        v = javaNodeApi.newDouble(value as number)
        break
      case PropertyType.TIME.toString():
        v = (value as LocalTime).getJavaObject()
        break
      case PropertyType.TIMESTAMP.toString():
        v = (value as LocalDateTime).getJavaObject()
        break
      case PropertyType.TIME_WITH_TIMEZONE.toString():
        v = (value as OffsetTime).getJavaObject()
        break
      case PropertyType.TIMESTAMP_WITH_TIMEZONE.toString():
        v = (value as OffsetDateTime).getJavaObject()
        break
      case PropertyType.POINT2D.toString():
        v = (value as Point2D).getJavaObject()
        break
      case PropertyType.VERTEX.toString():
        v = (value as PgxVertex<number | string>).getJavaObject()
        break
      case PropertyType.EDGE.toString():
        v = (value as PgxEdge).getJavaObject()
        break
      default:
        v = value
    }
    return v
  }

  getType(): IdType {
    return IdType.LONG
  }

  hashCode(): number {
    return this.internalObj.hashCodeSync().valueOf()
  }

  setProperty<V>(propertyName: string, t: PropertyType, value: V): void {
    this.internalObj.setPropertySync(propertyName, this._setValue(t, value))
  }

  toString(): string {
    return this.internalObj.toStringSync().valueOf()
  }

  getJavaObject(): any {
    return this.internalObj
  }
}
