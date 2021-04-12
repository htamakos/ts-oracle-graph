import { IPgxGraph } from '../src/api/PgxGraph'
import { IPgxSession } from '../src/api/PgxSession'
import { IServerInstance } from '../src/api/ServerInstance'
import { IdType, PropertyType } from '../src/common/types'
import { IdGenerationStrategy } from '../src/config/IdGenerationStrategy'
import { GraphServer } from '../src/rdbms/GraphServer'

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:17007'
const userName = process.env.TEST_GRAPH_USER || 'test_user'
const password = process.env.TEST_GRAPH_PASSWORD || 'welcome1'

export const TestConfig = {
  baseUrl: baseUrl,
  userName: userName,
  password: password,
}

export const TestPropNames = {
  stringPropName: 'STR_PROP',
  intPropName: 'INT_PROP',
  longPropName: 'LONG_PROP',
  booleanPropName: 'BOOL_PROP',
  floatPropName: 'FLOAT_PROP',
  doublePropName: 'DOUBLE_PROP',
  timePropName: 'TIME_PROP',
  timestampPropName: 'TIMESTAMP_PROP',
  timeWithTimezonePropName: 'TIME_WITH_TIMEZONE_PROP',
  timestampWithTimezonePropName: 'TIMESTAMP_WITH_TIMEZONE_PROP',
  datePropName: 'DATE_PROP',
  spatialPropName: 'SPATIAL_PROP',
}

export async function createSession(source: string) {
  const instance: IServerInstance = await GraphServer.getInstance(
    TestConfig.baseUrl,
    TestConfig.userName,
    TestConfig.password,
  )

  return instance.createSession(source)
}

export async function destroySession(session: IPgxSession): Promise<void> {
  session.destroy()
}

export async function createGraph(session: IPgxSession): Promise<IPgxGraph> {
  const graph: IPgxGraph = await session
    .createGraphBuilder<number>(
      IdType.LONG,
      IdGenerationStrategy.USER_IDS,
      IdGenerationStrategy.AUTO_GENERATED,
    )
    .addVertex(1)
    .addLabel('VL')
    .addVertex(2)
    .addLabel('VL')
    .addEdge(1, 2)
    .setLabel('EL')
    .build()

  graph.getOrCreateVertexProperty(
    PropertyType.STRING,
    TestPropNames.stringPropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.INTEGER,
    TestPropNames.intPropName,
  )
  graph.getOrCreateVertexProperty(PropertyType.LONG, TestPropNames.longPropName)
  graph.getOrCreateVertexProperty(
    PropertyType.FLOAT,
    TestPropNames.floatPropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.BOOLEAN,
    TestPropNames.booleanPropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.DOUBLE,
    TestPropNames.doublePropName,
  )
  graph.getOrCreateVertexProperty(PropertyType.TIME, TestPropNames.timePropName)
  graph.getOrCreateVertexProperty(
    PropertyType.TIMESTAMP,
    TestPropNames.timestampPropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.TIME_WITH_TIMEZONE,
    TestPropNames.timeWithTimezonePropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.TIMESTAMP_WITH_TIMEZONE,
    TestPropNames.timestampWithTimezonePropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.LOCAL_DATE,
    TestPropNames.datePropName,
  )
  graph.getOrCreateVertexProperty(
    PropertyType.POINT2D,
    TestPropNames.spatialPropName,
  )

  return graph
}
