import { IEdgeProperty } from '../../src/api/EdgeProperty'
import { IPgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxEdge } from '../../src/api/PgxEdge'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { IPgxVertex } from '../../src/api/PgxVertex'
import { IdType, PropertyType } from '../../src/common/types'
import {
  createGraph,
  createSession,
  destroySession,
  TestPropNames,
} from '../TestHelper'

describe('PgxEdge', (): void => {
  let testSession: IPgxSession
  let testGraph: IPgxGraph
  let testEdge: IPgxEdge

  beforeAll(async () => {
    testSession = await createSession('PgxEdgeTest')
    testGraph = await createGraph(testSession)

    testGraph!.getOrCreateEdgeProperty(PropertyType.INTEGER, 'intProp')

    testGraph!.executePgql(`
    INSERT
      VERTEX s1 LABELS(TEST_S1) PROPERTIES(s1.${TestPropNames.stringPropName} = 'source'),
      VERTEX d1 LABELS(TEST_D1) PROPERTIES(d1.${TestPropNames.stringPropName} = 'dest'),
      VERTEX s2 LABELS(TEST_S2) PROPERTIES(s2.${TestPropNames.stringPropName} = 'dest'),
      VERTEX d2 LABELS(TEST_D2) PROPERTIES(d2.${TestPropNames.stringPropName} = 'dest'),
      EDGE e1 BETWEEN s1 AND d1 LABELS(TEST_E),
      EDGE e2 BETWEEN s2 AND d1 LABELS(TEST_E),
      EDGE e3 BETWEEN s2 AND d2 LABELS(TEST_E),
      EDGE e4 BETWEEN d1 AND s2 LABELS(TEST_E)
    `)

    const rs: IPgqlResultSet = await testGraph!.queryPgql(`
    SELECT s, d, e
    FROM MATCH (s:TEST_S1)-[e]->(d:TEST_D1)
    LIMIT 1
    `)

    if (rs.next()) {
      testEdge = rs.getEdge('e')!
    }
    rs.close()
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('getDestination', async () => {
    expect(testEdge.getDestination().getLabels()[0]).toStrictEqual('TEST_D1')
  })

  test('getLabel', async () => {
    expect(testEdge.getLabel()).toStrictEqual('TEST_E')
  })

  test('getSource', async () => {
    expect(testEdge.getDestination().getLabels()[0]).toStrictEqual('TEST_D1')
  })

  test('getVertices', async () => {
    const vertices: IPgxVertex<number>[] = testEdge!.getVertices()
    expect(vertices[0].getLabels()[0]).toStrictEqual('TEST_S1')
    expect(vertices[1].getLabels()[0]).toStrictEqual('TEST_D1')
  })

  test('getGraph', async () => {
    const g: IPgxGraph = testEdge!.getGraph()

    expect(g.getName()).toStrictEqual(testGraph!.getName())
  })

  test('getJavaObject', async () => {
    const javaObject: any = testEdge!.getJavaObject()
    expect(javaObject.getIdSync().valueOf()).toBeGreaterThan(0)
  })

  test('getId', async () => {
    const id: number = testEdge!.getId()
    expect(id).toBeGreaterThan(0)
  })

  test('getProperty', async () => {
    const propetry: number = testEdge!.getProperty(
      'intProp',
      PropertyType.INTEGER,
    )

    expect(propetry).toBe(0)
  })

  test('getType', async () => {
    expect(testEdge!.getType().toString()).toStrictEqual(IdType.LONG.toString())
  })

  test('hashCode', async () => {
    expect(testEdge!.hashCode()).toBeGreaterThan(0)
  })

  test('setProperty', async () => {
    const newPropeValue: number = -9
    testEdge!.setProperty('intProp', PropertyType.INTEGER, newPropeValue)

    expect(testEdge!.getProperty('intProp', PropertyType.INTEGER)).toEqual(
      newPropeValue,
    )
  })

  test('toString', async () => {
    expect(testEdge!.toString().includes('PgxEdge')).toBeTruthy()
  })
})
