import { Direction, IdType, PropertyType } from '../common/types'
import javaNodeApi from '../JavaApi'
import {
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../JavaStandardType'
import { Point2D } from '../pgql/Point2D'
import { IPgxEdge, PgxEdge } from './PgxEdge'
import { IPgxEntity } from './PgxEntity'
import { IPgxGraph, PgxGraph } from './PgxGraph'

export interface IPgxVertex<VID> extends IPgxEntity<VID> {
  getJavaObject(): any
  getDegree(): number
  getInDegree(): number
  getInEdges(): IPgxEdge[]
  getInNeighbors(): IPgxVertex<VID>[]
  getLabels(): string[]
  getNeighbors(
    direction: Direction,
    removeDuplicates?: boolean,
  ): IPgxVertex<VID>[]
  getOutDegree(): number
  getOutEdges(): IPgxEdge[]
  getOutNeighbors(): IPgxVertex<VID>[]
}

export class PgxVertex<VID> implements IPgxVertex<VID> {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getDegree(): number {
    return this.internalObj.getDegreeSync().valueOf()
  }

  getInDegree(): number {
    return this.internalObj.getInDegreeSync().valueOf()
  }

  getInEdges(): IPgxEdge[] {
    const obj: any[] = this.internalObj.getInEdgesSync().toArraySync()
    return obj.map((o) => new PgxEdge(o))
  }

  getInNeighbors(): IPgxVertex<VID>[] {
    const obj: any[] = this.internalObj.getInNeighborsSync().toArraySync()
    return obj.map((o) => new PgxVertex<VID>(o))
  }

  getLabels(): string[] {
    const obj: any[] = this.internalObj.getLabelsSync().toArraySync()
    return obj.map((o) => o.valueOf())
  }

  getNeighbors(
    direction: Direction,
    removeDuplicates: boolean = false,
  ): IPgxVertex<VID>[] {
    const obj: any[] = this.internalObj
      .getNeighborsSync(direction.getJavaObject(), removeDuplicates)
      .toArraySync()
    return obj.map((o) => new PgxVertex<VID>(o))
  }

  getOutDegree(): number {
    return this.internalObj.getOutDegreeSync().valueOf()
  }

  getOutEdges(): IPgxEdge[] {
    const obj: any[] = this.internalObj.getOutEdgesSync().toArraySync()
    return obj.map((o) => new PgxEdge(o))
  }

  getOutNeighbors(): IPgxVertex<VID>[] {
    const obj: any[] = this.internalObj.getOutNeighborsSync().toArraySync()
    return obj.map((o) => new PgxVertex<VID>(o))
  }

  getGraph(): IPgxGraph {
    return new PgxGraph(this.internalObj.getGraphSync())
  }

  getJavaObject(): any {
    return this.internalObj
  }

  getId(): VID {
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
    return new IdType(this.internalObj.getTypeSync())
  }

  hashCode(): number {
    return this.internalObj.hashCodeSync().valueOf()
  }

  setProperty<V>(propertyName: string, t: PropertyType, value: V): void {
    this.internalObj.setPropertySync(propertyName, this._setValue(t, value))
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }
}
