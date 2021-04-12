import { PropertyType } from '../common/types'
import { IPgxEntity } from './PgxEntity'
import { IPgxGraph } from './PgxGraph'

export interface IPgxProperty<ID, K extends IPgxEntity<ID>, V> {
  close(): void
  destroy(): void

  fill(value: any): void
  get(id: ID): V
  getByKey(key: K): V
  // TODO: EntryIterable<ID,K,V> getBottomKValues(int k)
  getDimension(): number
  // TODO: getEntityType(): EntityType
  getGraph(): IPgxGraph
  getName(): string
  // TODO: getPropertyId(): PgxId
  // TODO: getTopKValues(int k): EntryIterable<ID,K,V>
  getType(): PropertyType
  // TODO: getValues(): EntryIterable<ID,K,V>
  isPublished(): boolean
  isTransient(): boolean
  isVectorProperty(): boolean
  publish(): void
  rename(newPropertyName: string): void
  set(key: K, value: V): void
  // TODO: setValues(java.util.Map<K,V> values)
  size(): number
  toString(): string
  // TODO: wrap(V value, PropertyType type, PgxGraph graph) : V
}
