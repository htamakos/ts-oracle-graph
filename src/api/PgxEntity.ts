import { IdType, PropertyType } from '../common/types'
import { IPgxGraph } from './PgxGraph'

export interface IPgxEntity<ID> {
  getGraph(): IPgxGraph
  getId(): ID
  getProperty<V>(propertyName: string, t: PropertyType): V
  getType(): IdType
  hashCode(): number
  setProperty<V>(propertyName: string, t: PropertyType, value: V): void
  toString(): string
}
