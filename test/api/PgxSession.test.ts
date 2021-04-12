import { IGraphBuilder } from '../../src/api/GraphBuilder'
import { Namespace } from '../../src/api/Namespace'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { IdType } from '../../src/common/types'
import { IdGenerationStrategy } from '../../src/config/IdGenerationStrategy'
import { createGraph, createSession, destroySession } from '../TestHelper'

describe('PgxSession', (): void => {
  let testSession: IPgxSession | undefined
  let testGraph: IPgxGraph | undefined

  beforeAll(async () => {
    testSession = await createSession('PgxSessionTest')
    testGraph = await createGraph(testSession!)
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('createGraphBuilder', async () => {
    const gb1: IGraphBuilder<IdType> = testSession!.createGraphBuilder()

    const g1: IPgxGraph = await gb1.build()
    expect(g1).not.toBeNull()
    expect(g1).not.toBeUndefined()
    await g1.destroy()

    const gb2: IGraphBuilder<IdType> = testSession!.createGraphBuilder(
      IdType.LONG,
      IdGenerationStrategy.USER_IDS,
    )

    const g2: IPgxGraph = await gb2.build()
    expect(g2).not.toBeNull()
    expect(g2).not.toBeUndefined()
    await g2.destroy()

    const gb3: IGraphBuilder<IdType> = testSession!.createGraphBuilder(
      IdType.LONG,
      IdGenerationStrategy.USER_IDS,
      IdGenerationStrategy.AUTO_GENERATED,
    )

    const g3: IPgxGraph = await gb3.build()
    expect(g3).not.toBeNull()
    expect(g3).not.toBeUndefined()
    await g3.destroy()
  })

  test('getGraphs', async () => {
    const graphNames: string[] = await testSession!.getGraphs(Namespace.PRIVATE)

    expect(
      graphNames.find((s) => s.includes(testGraph!.getName())),
    ).toBeTruthy()

    const publicGraphNames: string[] = await testSession!.getGraphs(
      Namespace.PUBLIC,
    )

    expect(
      publicGraphNames.find((s) => s.includes(testGraph!.getName())),
    ).toBeFalsy()
  })

  test('getGraph', async () => {
    const g1: IPgxGraph | null = await testSession!.getGraph(
      testGraph!.getName(),
      Namespace.PRIVATE,
    )

    expect(g1 !== null).toBeTruthy()

    const g2: IPgxGraph | null = await testSession!.getGraph(
      testGraph!.getName(),
    )

    expect(g2).toBeNull()
  })
})
