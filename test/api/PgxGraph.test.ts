import { IPgqlResultSet, PgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { IVertexProperty } from '../../src/api/VertexProperty'
import { PropertyType } from '../../src/common/types'
import { createGraph, createSession, destroySession } from '../TestHelper'

describe('PgxGraph', (): void => {
  let testSession: IPgxSession | undefined
  let testGraph: IPgxGraph | undefined

  beforeAll(async () => {
    testSession = await createSession('PgxSessionTest')
    testGraph = await createGraph(testSession)
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('should get or create vertexProperty', async () => {
    testGraph!.getOrCreateVertexProperty(PropertyType.LONG, 'LONG_PROP')
  })

  test('should executePgql', async () => {
    const newLabel: string = 'NEW_LABEL'

    await testGraph!.executePgql(`
    INSERT VERTEX v LABELS(${newLabel})
    `)

    const rs: IPgqlResultSet = await testGraph!.executePgql(`
    SELECT n
    FROM MATCH (n:${newLabel})
    `)
    expect(rs.getNumResults()).toBe(1)
  })

  test('getVertexProperties', async () => {
    const properties: IVertexProperty<
      any,
      any
    >[] = testGraph!.getVertexProperties()

    properties.forEach((prop) => {})
  })

  test('clone', async () => {
    //const g: IPgxGraph = await testGraph!.clone()
  })
})
