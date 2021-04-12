import { IPgxEdge } from './PgxEdge'
import { IPgxVertex } from './PgxVertex'

export interface IPgxPath<VID> {
  existsSync(): boolean
  getDestinationSync(): IPgxVertex<VID>
  getEdgesSync(): IPgxPathIterable<IPgxEdge>
}

export interface IPgxPathIterable<E> {
  iteratorSync(): IPgxPathIterator<E>
}

export interface IPgxPathIterator<E> {
  addSync(e: E): void
  hasNextSync(): boolean
  hasPreviousSync(): boolean
  nextSync(): E
  nextIndexSync(): number
  previousSync(): E
  previousIndexSync(): number
  removeSync(): void
  resetSync(): void
  setSync(e: E): void
}
