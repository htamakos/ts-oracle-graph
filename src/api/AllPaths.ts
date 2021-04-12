import { IPgxPath } from './PgxPath'
import { IPgxVertex } from './PgxVertex'

export interface IAllPaths<VID> {
  close(): void
  destroy(): void
  getGraph(): void
  getPath(destination: IPgxVertex<VID>): IPgxPath<VID>
  getSource(): IPgxVertex<VID>
  toString(): string
}
