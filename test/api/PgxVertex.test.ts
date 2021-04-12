import { IPgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxEdge } from '../../src/api/PgxEdge'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { IPgxVertex } from '../../src/api/PgxVertex'
import { IVertexProperty } from '../../src/api/VertexProperty'
import { Direction, IdType, PropertyType } from '../../src/common/types'
import {
  createGraph,
  createSession,
  destroySession,
  TestPropNames,
} from '../TestHelper'

describe('PgxVertex', (): void => {
  let testSession: IPgxSession
  let testGraph: IPgxGraph
  let testVertex: IPgxVertex<number>
  let sourceVertex: IPgxVertex<number>
  let destVertex: IPgxVertex<number>

  beforeAll(async () => {
    testSession = await createSession('PgxSessionTest')
    testGraph = await createGraph(testSession)
    testVertex = testGraph.getRandomVertex()

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
    SELECT s, d
    FROM MATCH (s:TEST_S1)->(d:TEST_D1)
    LIMIT 1
    `)

    if (rs.next()) {
      sourceVertex = rs.getVertex('s')!
      destVertex = rs.getVertex('d')!
    }
    rs.close()
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('getDegree', async () => {
    expect(sourceVertex!.getDegree()).toBe(1)
  })

  test('getInDegree', async () => {
    expect(sourceVertex!.getInDegree()).toBe(0)
    expect(destVertex!.getInDegree()).toBe(2)
  })

  test('getInEdges', async () => {
    const edges: IPgxEdge[] = destVertex!.getInEdges()
    expect(edges.length).toBe(2)
    expect(edges[0].getLabel()).toStrictEqual('TEST_E')

    const emptyEdges: IPgxEdge[] = sourceVertex!.getInEdges()
    expect(emptyEdges.length).toBe(0)
  })

  test('getInNeighbors', async () => {
    const inNeighbors: IPgxVertex<number>[] = destVertex!.getInNeighbors()
    expect(inNeighbors.map((n) => n.getLabels()[0])).toEqual(
      expect.arrayContaining(['TEST_S1', 'TEST_S2']),
    )
  })

  test('getLabels', async () => {
    expect(sourceVertex.getLabels()).toEqual(
      expect.arrayContaining(['TEST_S1']),
    )
  })

  test('getNeighbors', async () => {
    const neighbors1: IPgxVertex<number>[] = destVertex!.getNeighbors(
      Direction.BOTH,
    )

    expect(neighbors1.map((n) => n.getLabels()[0])).toEqual(
      expect.arrayContaining(['TEST_S1', 'TEST_S2']),
    )

    const neighbors2: IPgxVertex<number>[] = destVertex!.getNeighbors(
      Direction.INCOMING,
    )

    expect(neighbors2.map((n) => n.getLabels()[0])).toEqual(
      expect.arrayContaining(['TEST_S1', 'TEST_S2']),
    )

    const neighbors3: IPgxVertex<number>[] = destVertex!.getNeighbors(
      Direction.OUTGOING,
    )

    expect(neighbors3.length).toBe(1)

    const rs: IPgqlResultSet = await testGraph!.queryPgql(`
    SELECT n
    FROM MATCH (n:TEST_S2)
    LIMIT 1
    `)
    rs.next()
    const destVertex2: IPgxVertex<number> = rs.getVertex('n')!
    rs.close()

    const nonduplicateNeighbors: IPgxVertex<number>[] = destVertex2!.getNeighbors(
      Direction.BOTH,
      true,
    )

    expect(nonduplicateNeighbors.length).toBe(2)
    const duplicateNeighbors: IPgxVertex<number>[] = destVertex2!.getNeighbors(
      Direction.BOTH,
      false,
    )

    expect(duplicateNeighbors.length).toBe(3)
  })

  test('getOutDegree', async () => {
    expect(sourceVertex!.getOutDegree()).toBe(1)
    expect(destVertex!.getOutDegree()).toBe(1)
  })

  test('getOutEdges', async () => {
    const edges1: IPgxEdge[] = destVertex!.getOutEdges()
    expect(edges1.length).toBe(1)

    const edges2: IPgxEdge[] = sourceVertex!.getOutEdges()
    expect(edges2.length).toBe(1)
    expect(edges2[0].getLabel()).toStrictEqual('TEST_E')
  })

  test('getOutNeighbors', async () => {
    const outNeighbors: IPgxVertex<number>[] = destVertex!.getOutNeighbors()
    expect(outNeighbors.map((n) => n.getLabels()[0])).toEqual(
      expect.arrayContaining(['TEST_S2']),
    )
  })

  test('getGraph', async () => {
    const g: IPgxGraph = testVertex!.getGraph()

    expect(g.getName()).toStrictEqual(testGraph!.getName())
  })

  test('getJavaObject', async () => {
    const javaObject: any = testVertex!.getJavaObject()
    expect(javaObject.getIdSync().valueOf()).toBeGreaterThan(0)
  })

  test('getId', async () => {
    const id: number = testVertex!.getId()
    expect(id).toBeGreaterThan(0)
  })

  test('getProperty', async () => {
    const propetry: IVertexProperty<number, number> = testVertex!.getProperty(
      TestPropNames.intPropName,
      PropertyType.INTEGER,
    )

    expect(propetry).toBe(0)
  })

  test('getType', async () => {
    expect(testVertex!.getType().toString()).toStrictEqual(
      IdType.LONG.toString(),
    )
  })

  test('hashCode', async () => {
    expect(testVertex!.hashCode()).toBeGreaterThan(0)
  })

  test('setProperty', async () => {
    const newPropeValue: string = 'NEW_PROP_VALUE'
    testVertex!.setProperty(
      TestPropNames.stringPropName,
      PropertyType.STRING,
      newPropeValue,
    )

    expect(
      testVertex!.getProperty(
        TestPropNames.stringPropName,
        PropertyType.STRING,
      ),
    ).toStrictEqual(newPropeValue)
  })

  test('toString', async () => {
    expect(testVertex!.toString().includes('PgxVertex')).toBeTruthy()
  })
})
