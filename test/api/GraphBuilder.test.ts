import { IGraphBuilder } from '../../src/api/GraphBuilder'
import { IPgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { IdType } from '../../src/common/types'
import { IdGenerationStrategy } from '../../src/config/IdGenerationStrategy'
import { createSession, destroySession } from '../TestHelper'

describe('GraphBuilder', (): void => {
  let testSession: IPgxSession | undefined

  beforeAll(async () => {
    testSession = await createSession('GraphBuilderTest')
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('should build', async () => {
    const gb: IGraphBuilder<IdType> = testSession!
      .createGraphBuilder(
        IdType.INTEGER,
        IdGenerationStrategy.AUTO_GENERATED,
        IdGenerationStrategy.AUTO_GENERATED,
      )
      .addVertex()
      .addLabel('VL')
      .addVertex()
      .addLabel('VL')

    const g: IPgxGraph = await gb.build()

    const rs: IPgqlResultSet = await g.queryPgql(`
    SELECT id(n)
    FROM MATCH (n)
    `)
    expect(rs.getNumResults()).toBeGreaterThan(0)
    rs.close()

    await g.destroy()
  })

  test('should build with string IdType', async () => {
    const gb: IGraphBuilder<IdType> = testSession!
      .createGraphBuilder(
        IdType.STRING,
        IdGenerationStrategy.USER_IDS,
        IdGenerationStrategy.AUTO_GENERATED,
      )
      .addVertex('HOGE')
      .addLabel('VL')
      .addVertex('HAGE')
      .addLabel('VL')

    const g: IPgxGraph = await gb.build()

    const rs: IPgqlResultSet = await g.queryPgql(`
    SELECT id(n), labels(n)
    FROM MATCH (n)
    `)

    expect(rs.getNumResults()).toBeGreaterThan(0)
    rs.close()

    await g.destroy()
  })
})
