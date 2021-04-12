import { IAnalyst } from '../../src/api/Analyst'
import { IEdgeProperty } from '../../src/api/EdgeProperty'
import { IPgxEdge } from '../../src/api/PgxEdge'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { createGraph, createSession, destroySession } from '../TestHelper'

describe('Analyst', (): void => {
  let testSession: IPgxSession
  let testGraph: IPgxGraph
  let analyst: IAnalyst

  beforeAll(async () => {
    testSession = await createSession('Analyst')
    testGraph = await createGraph(testSession!)
    analyst = await testSession!.createAnalyst()
  })

  afterAll(async () => {
    await destroySession(testSession)
    await testGraph.destroy()
  })

  test('adamicAdarCounting', async () => {
    const ep: IEdgeProperty<number> = await analyst!.adamicAdarCounting(
      testGraph!,
    )

    expect(ep.getName()).toStrictEqual('adamic_adar')
  })
})
