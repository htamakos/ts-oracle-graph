import { IPgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { PgqlResultElementType } from '../../src/common/types'
import { createGraph, createSession, destroySession } from '../TestHelper'

describe('PgqlResultElement', (): void => {
  let testSession: IPgxSession | undefined
  let testGraph: IPgxGraph | undefined

  beforeAll(async () => {
    testSession = await createSession('PgxSessionTest')
    testGraph = await createGraph(testSession)
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('should get element', async () => {
    const rs: IPgqlResultSet = await testGraph!.queryPgql(`
    SELECT 1 as long_prop
    FROM MATCH (n)
    `)

    rs.getPgqlResultElements().forEach((elm) => {
      expect(elm.getElementType().name()).toStrictEqual(
        PgqlResultElementType.LONG.name(),
      )

      expect(elm.getVarName()).toStrictEqual('long_prop')
    })
  })
})
