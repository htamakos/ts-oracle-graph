import { IEdgeProperty } from '../../src/api/EdgeProperty'
import { IPgxEdge } from '../../src/api/PgxEdge'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { IPgxVertex } from '../../src/api/PgxVertex'
import { PropertyType } from '../../src/common/types'
import {
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../../src/JavaStandardType'
import { Point2D } from '../../src/pgql/Point2D'
import { createGraph, createSession, destroySession } from '../TestHelper'

describe('EdgeProperty', (): void => {
  let testSession: IPgxSession
  let testGraph: IPgxGraph
  let prop: IEdgeProperty<number>
  beforeAll(async () => {
    testSession = await createSession('VertexProperty')
    testGraph = await createGraph(testSession!)
    prop = testGraph!.getOrCreateEdgeProperty(
      PropertyType.LONG,
      'NEW_LONG_PROP',
    )
  })

  afterAll(async () => {
    await testGraph!.destroy()
    await destroySession(testSession!)
  })

  test('fill', async () => {
    const v: IPgxEdge = testGraph!.getRandomEdge()

    // INTEGER
    const intPropValue: number = 9
    const intProp: IEdgeProperty<number> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.INTEGER,
      'newIntProp',
    )
    intProp.fill(intPropValue)
    expect(intProp.getByKey(v)).toBe(intPropValue)
    intProp.destroy()

    // LONG
    const longPropValue: number = 190990
    const longProp: IEdgeProperty<number> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.LONG,
      'newLongProp',
    )

    longProp.fill(longPropValue)
    expect(longProp.getByKey(v)).toBe(longPropValue)
    longProp.destroy()

    // STRING
    const stringPropValue: string = 'newStringPropValue'
    const stringProp: IEdgeProperty<string> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.STRING,
      'newStringProp',
    )

    stringProp.fill(stringPropValue)
    expect(stringProp.getByKey(v)).toBe(stringPropValue)
    stringProp.destroy()

    // BOOLEAN
    const booleanPropValue: boolean = false
    const booleanProp: IEdgeProperty<boolean> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.BOOLEAN,
      'newBooleanProp',
    )

    booleanProp.fill(booleanPropValue)
    expect(booleanProp.getByKey(v)).toBe(booleanPropValue)
    booleanProp.destroy()

    // FLOAT
    const floatPropValue: number = 0.1
    const floatProp: IEdgeProperty<number> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.FLOAT,
      'newFloatProp',
    )

    floatProp.fill(floatPropValue)
    expect(Math.round(floatProp.getByKey(v) * 10) / 10).toBe(floatPropValue)
    floatProp.destroy()

    // DOUBLE
    const doublePropValue: number = 0.1
    const doubleProp: IEdgeProperty<number> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.DOUBLE,
      'newDoubleProp',
    )

    doubleProp.fill(doublePropValue)
    expect(Math.round(doubleProp.getByKey(v) * 10) / 10).toBe(doublePropValue)
    doubleProp.destroy()

    // TIME
    const timePropValue: LocalTime = LocalTime.now()
    const timeProp: IEdgeProperty<LocalTime> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.TIME,
      'newTimeProp',
    )

    timeProp.fill(timePropValue)
    expect(timeProp.getByKey(v)!.toString()).toStrictEqual(
      timePropValue.toString(),
    )
    timeProp.destroy()

    // TIMESTAMP
    const timestampPropValue: LocalDateTime = LocalDateTime.now()
    const timestampProp: IEdgeProperty<LocalDateTime> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.TIMESTAMP,
      'newTimestampProp',
    )

    timestampProp.fill(timestampPropValue)
    expect(timestampProp.getByKey(v)!.toString()).toStrictEqual(
      timestampPropValue.toString(),
    )
    timestampProp.destroy()

    // TIME WITH TIME ZONE
    const timeWithTimezonePropValue: OffsetTime = OffsetTime.now()
    const timeWithTimezoneProp: IEdgeProperty<OffsetTime> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.TIME_WITH_TIMEZONE,
      'newTimeWithTimezoneProp',
    )

    timeWithTimezoneProp.fill(timeWithTimezonePropValue)
    expect(timeWithTimezoneProp.getByKey(v)!.toString()).toStrictEqual(
      timeWithTimezonePropValue.toString(),
    )
    timeWithTimezoneProp.destroy()

    // TIMESTAMP WITH TIME ZONE
    const timestampWithTimezonePropValue: OffsetDateTime = OffsetDateTime.now()
    const timestampWithTimezoneProp: IEdgeProperty<OffsetDateTime> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.TIMESTAMP_WITH_TIMEZONE,
      'newtimestampWithTimezoneProp',
    )

    timestampWithTimezoneProp.fill(timestampWithTimezonePropValue)
    expect(timestampWithTimezoneProp.getByKey(v)!.toString()).toStrictEqual(
      timestampWithTimezonePropValue.toString(),
    )
    timestampWithTimezoneProp.destroy()

    // POINT2D
    const point2dPropValue: Point2D = Point2D.fromWkt('POINT(1 2)')
    const point2dProp: IEdgeProperty<Point2D> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.POINT2D,
      'newpoint2dProp',
    )

    point2dProp.fill(point2dPropValue)
    expect(point2dProp.getByKey(v).toString()).toBe(point2dPropValue.toString())
    point2dProp.destroy()

    // VERTEX
    const vertexPropValue: IPgxVertex<number> = testGraph!.getRandomVertex()

    const vertexProp: IEdgeProperty<
      IPgxVertex<number>
    > = testGraph!.getOrCreateEdgeProperty(PropertyType.VERTEX, 'newvertexProp')

    vertexProp.fill(vertexPropValue)
    expect(vertexProp.getByKey(v).getId()).toBe(vertexPropValue.getId())
    vertexProp.destroy()

    // EDGE
    const edgePropValue: IPgxEdge = testGraph!.getRandomEdge()

    const edgeProp: IEdgeProperty<IPgxEdge> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.EDGE,
      'newEdgeProp',
    )

    edgeProp.fill(edgePropValue)
    expect(edgeProp.getByKey(v).getId()).toBe(edgePropValue.getId())
    edgeProp.destroy()
  })

  test('get', async () => {
    const v: IPgxEdge = testGraph!.getRandomEdge()

    expect(prop!.get(v.getId())).toBe(
      v.getProperty(prop.getName(), PropertyType.LONG),
    )
  })

  test('getByKey', async () => {
    const v: IPgxEdge = testGraph!.getRandomEdge()

    expect(prop!.getByKey(v)).toBe(
      v.getProperty(prop.getName(), PropertyType.LONG),
    )
  })

  test('getDimension', async () => {
    expect(prop!.getDimension()).toBe(0)
  })

  test('getGraph', async () => {
    expect(prop!.getGraph().getName()).toStrictEqual(testGraph!.getName())
  })

  test('getName', async () => {
    expect(prop!.getName()).toStrictEqual('NEW_LONG_PROP')
  })

  test('getType', async () => {
    expect(prop!.getType().toString()).toStrictEqual('long')
  })

  test('isPublished', async () => {
    expect(prop!.isPublished()).toBeFalsy()
  })

  test('isTransient', async () => {
    expect(prop!.isTransient()).toBeTruthy()
  })

  test('isVectorProperty', async () => {
    expect(prop!.isVectorProperty()).toBeFalsy()
  })

  test('publish', async () => {
    const testGraphForPublish: IPgxGraph = await createGraph(testSession!)

    const propForPublish: IEdgeProperty<string> = testGraphForPublish!.getOrCreateEdgeProperty(
      PropertyType.STRING,
      'fuga',
    )

    testGraphForPublish.publish()
    expect(propForPublish.isPublished()).toBeFalsy()
    propForPublish.publish()
    expect(propForPublish.isPublished()).toBeTruthy()

    await testGraphForPublish.destroy()
  })

  test('rename', async () => {
    const propForRename: IEdgeProperty<number> = testGraph!.getOrCreateEdgeProperty(
      PropertyType.DOUBLE,
      'newDoubleProp',
    )

    const renamePropName: string = 'RENAME_PROP_NAME'
    propForRename.rename(renamePropName)

    expect(propForRename.getName()).toStrictEqual(renamePropName)
  })

  test('set', async () => {
    const testGraphForSet: IPgxGraph = await createGraph(testSession!)

    const propForSet: IEdgeProperty<string> = testGraphForSet!.getOrCreateEdgeProperty(
      PropertyType.STRING,
      'fuga',
    )

    const v: IPgxEdge = testGraphForSet.getRandomEdge()

    const propValue: string = 'HOGEHOGEHOGE'
    propForSet.set(v, propValue)
    expect(propForSet.getByKey(v)).toStrictEqual(propValue)

    await testGraphForSet.destroy()
  })

  test('size', async () => {
    expect(prop!.size()).toBe(testGraph!.getNumEdges())
  })

  test('toString', async () => {
    expect(
      prop!
        .toString()
        .includes('EdgeProperty[name=NEW_LONG_PROP,type=long,graph='),
    ).toBeTruthy()
  })

  test.skip('close', async () => {})
  test.skip('destroy', async () => {})
  test.skip('clone', async () => {})
  test.skip('expand', async () => {})
})
