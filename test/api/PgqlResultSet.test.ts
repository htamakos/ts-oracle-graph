import { IPgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxSession } from '../../src/api/PgxSession'
import { createGraph, createSession, destroySession } from '../TestHelper'

describe('PgqlResult', (): void => {
  let testSession: IPgxSession | undefined
  let testGraph: IPgxGraph | undefined

  beforeAll(async () => {
    testSession = await createSession('PgxSessionTest')
    testGraph = await createGraph(testSession)
  })

  afterAll(async () => {
    await destroySession(testSession!)
    await testGraph!.destroy()
  })

  test('should handle all pgql types', async () => {
    const stringPropName: string = 'STR_PROP'
    const stringPropValue: string = 'strValue'
    const intPropName: string = 'INT_PROP'
    const intPropValue: number = 10
    const longPropName: string = 'LONG_PROP'
    const longPropValue: number = 100000
    const booleanPropName: string = 'BOOL_PROP'
    const booleanPropValue: boolean = false
    const floatPropName: string = 'FLOAT_PROP'
    const floatPropValue: number = 0.1
    const doublePropName: string = 'DOUBLE_PROP'
    const doublePropValue: number = 0.1222
    const timePropName: string = 'TIME_PROP'
    const timePropValue: string = '11:22:10'
    const timestampPropName: string = 'TIMESTAMP_PROP'
    const timestampPropValue: string = '2021-04-01 11:00:02'
    const timeWithTimezonePropName: string = 'TIME_WITH_TIMEZONE_PROP'
    const timeWithTimezonePropValue: string = '10:10:55+09:00'
    const timestampWithTimezonePropName: string = 'TIMESTAMP_WITH_TIMEZONE_PROP'
    const timestampWithTimezonePropValue: string = '2021-03-11 21:09:02+09:00'
    const datePropName: string = 'DATE_PROP'
    const datePropValue: string = '2021-05-22'

    const rs: IPgqlResultSet = await testGraph!.queryPgql(`
    SELECT
      '${stringPropValue}' as ${stringPropName},
      ${intPropValue} as ${intPropName},
      ${longPropValue} as ${longPropName},
      ${booleanPropValue} as ${booleanPropName},
      ${floatPropValue} as ${floatPropName},
      ${doublePropValue} as ${doublePropName},
      time '${timePropValue}' as ${timePropName},
      timestamp '${timestampPropValue}' as ${timestampPropName},
      time '${timeWithTimezonePropValue}' as ${timeWithTimezonePropName},
      timestamp '${timestampWithTimezonePropValue}' as ${timestampWithTimezonePropName},
      date '${datePropValue}' as ${datePropName}
    FROM MATCH (n)
    LIMIT 1
    `)

    let isFound: boolean = false
    while (rs.next()) {
      expect(rs.getString(stringPropName)).toBe(stringPropValue)
      expect(rs.getInteger(intPropName)).toBe(intPropValue)
      expect(rs.getLong(longPropName)).toBe(longPropValue)
      expect(rs.getBoolean(booleanPropName)).toBe(booleanPropValue)
      expect(Math.round(rs.getFloat(floatPropName)! * 10) / 10).toBe(
        floatPropValue,
      )
      expect(rs.getDouble(doublePropName)).toBe(doublePropValue)
      expect(rs.getTime(timePropName)!.toString()).toStrictEqual(timePropValue)
      expect(rs.getTimestamp(timestampPropName)!.toString()).toStrictEqual(
        timestampPropValue,
      )
      expect(
        rs.getTimeWithTimezone(timeWithTimezonePropName)!.toString(),
      ).toStrictEqual(timeWithTimezonePropValue)
      expect(
        rs.getTimestampWithTimezone(timestampWithTimezonePropName)!.toString(),
      ).toStrictEqual(timestampWithTimezonePropValue)
      expect(rs.getDate(datePropName)!.toString()).toStrictEqual(datePropValue)

      isFound = true
    }

    expect(isFound).toBeTruthy()
    rs.close()
  })
})
