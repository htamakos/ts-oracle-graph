import { IPgxEdge } from './PgxEdge'
import { IPgxProperty } from './Property'
import { PropertyType } from '../common/types'
import javaNodeApi from '../JavaApi'
import {
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../JavaStandardType'
import { Point2D } from '../pgql/Point2D'
import { PgxEdge } from './PgxEdge'
import { IPgxGraph, PgxGraph } from './PgxGraph'
import { PgxVertex } from './PgxVertex'

export interface IEdgeProperty<V> extends IPgxProperty<number, IPgxEdge, V> {
  getJavaObject(): any
  //get(id: number): V
  //getByKey(k: IPgxEdge): V
  // TODO: expand(namePrefix?: string)
  // TODO: clone(newPropertyName?: string)
}

export class EdgeProperty<V> implements IEdgeProperty<V> {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getJavaObject(): any {
    return this.internalObj
  }

  fill(value: any): void {
    let v: unknown

    switch (this.getType().toString()) {
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

    this.internalObj.fillSync(v)
  }

  get(id: number): V {
    const obj: any = this.internalObj.getSync(id)
    return this._get(obj)
  }

  getByKey(k: IPgxEdge): V {
    const obj: any = this.internalObj.getSync(k.getJavaObject())
    return this._get(obj)
  }

  private _get(v: any): any {
    switch (this.getType().toString()) {
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

  getDimension(): number {
    return this.internalObj.getDimensionSync().valueOf()
  }

  getGraph(): IPgxGraph {
    return new PgxGraph(this.internalObj.getGraphSync())
  }

  getName(): string {
    return this.internalObj.getNameSync().valueOf()
  }

  getType(): PropertyType {
    return new PropertyType(this.internalObj.getTypeSync())
  }

  isPublished(): boolean {
    return this.internalObj.isPublishedSync().valueOf()
  }

  isTransient(): boolean {
    return this.internalObj.isTransientSync().valueOf()
  }

  isVectorProperty(): boolean {
    return this.internalObj.isVectorPropertySync().valueOf()
  }

  publish(): void {
    this.internalObj.publishSync()
  }

  rename(propertyName: string): void {
    this.internalObj.renameSync(propertyName)
  }

  set(key: IPgxEdge, value: V): void {
    this.internalObj.setSync(key.getJavaObject(), value)
  }

  size(): number {
    return this.internalObj.sizeSync().valueOf()
  }

  toString(): string {
    return this.internalObj.toStringSync().valueOf()
  }

  close(): void {
    this.internalObj.closeSync()
  }

  destroy(): void {
    this.internalObj.destroySync()
  }
}
