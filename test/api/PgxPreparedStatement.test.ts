import { IPgqlResultSet } from '../../src/api/PgqlResultSet'
import { IPgxGraph } from '../../src/api/PgxGraph'
import { IPgxPreparedStatement } from '../../src/api/PgxPreparedStatement'
import { IPgxSession } from '../../src/api/PgxSession'
import {
  LocalDate,
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
} from '../../src/JavaStandardType'
import { Point2D } from '../../src/pgql/Point2D'
import {
  createGraph,
  createSession,
  destroySession,
  TestPropNames,
} from '../TestHelper'

describe('PgxPreparedStatement', (): void => {
  let testSession: IPgxSession | undefined
  let testGraph: IPgxGraph | undefined

  beforeAll(async () => {
    testSession = await createSession('PgxSessionTest')
    testGraph = await createGraph(testSession)
  })

  afterAll(async () => {
    await destroySession(testSession!)
  })

  test('INSERT/SELECT/UPDATE/DELETE PreparedStatement', async () => {
    const newLabel: string = 'NEW_LABEL'
    const stringPropValue: string = 'strValue'
    const intPropValue: number = 10
    const longPropValue: number = 100000
    const booleanPropValue: boolean = false
    const floatPropValue: number = 0.1
    const doublePropValue: number = 0.1222
    const timePropValue: string = '11:22:10'
    const timestampPropValue: string = '2021-04-01 11:00:02'
    const timeWithTimezonePropValue: string = '10:10:55+09:00'
    const timestampWithTimezonePropValue: string = '2021-03-11 21:09:02+09:00'
    const datePropValue: string = '2021-05-22'
    const spatialPropValue: Point2D = Point2D.fromWkt('POINT(2 3)')

    // INSERT
    const pstmtInsert: IPgxPreparedStatement = await testGraph!.preparePgql(`
    INSERT VERTEX v LABELS(${newLabel})
    PROPERTIES(
      v.${TestPropNames.stringPropName} = ?,
      v.${TestPropNames.intPropName} = ?,
      v.${TestPropNames.longPropName} = ?,
      v.${TestPropNames.booleanPropName} = ?,
      v.${TestPropNames.floatPropName} = ?,
      v.${TestPropNames.doublePropName} = ?,
      v.${TestPropNames.timePropName} = ?,
      v.${TestPropNames.timestampPropName} = ?,
      v.${TestPropNames.timeWithTimezonePropName} = ?,
      v.${TestPropNames.timestampWithTimezonePropName} = ?,
      v.${TestPropNames.datePropName} = ?,
      v.${TestPropNames.spatialPropName} = ?
    )
    `)

    pstmtInsert.setString(1, stringPropValue)
    pstmtInsert.setInt(2, intPropValue)
    pstmtInsert.setLong(3, longPropValue)
    pstmtInsert.setBoolean(4, booleanPropValue)
    pstmtInsert.setFloat(5, floatPropValue)
    pstmtInsert.setDouble(6, doublePropValue)
    pstmtInsert.setTime(7, LocalTime.parse(timePropValue, 'HH:mm:ss'))
    pstmtInsert.setTimestamp(
      8,
      LocalDateTime.parse(timestampPropValue, 'yyyy-MM-dd HH:mm:ss'),
    )
    pstmtInsert.setTimeWithTimezone(
      9,
      OffsetTime.parse(timeWithTimezonePropValue, 'HH:mm:ssxxx'),
    )

    pstmtInsert.setTimestampWithTimezone(
      10,
      OffsetDateTime.parse(
        timestampWithTimezonePropValue,
        'yyyy-MM-dd HH:mm:ssxxx',
      ),
    )

    pstmtInsert.setDate(11, LocalDate.parse(datePropValue, 'yyyy-MM-dd'))
    pstmtInsert.setPoint2D(12, spatialPropValue)

    await pstmtInsert.execute()
    pstmtInsert.close()

    // SELECT
    const pstmtSelect: IPgxPreparedStatement = await testGraph!
      .preparePgql(` SELECT n.${TestPropNames.stringPropName}, n.${TestPropNames.intPropName},
      n.${TestPropNames.longPropName},
      n.${TestPropNames.booleanPropName},
      n.${TestPropNames.floatPropName},
      n.${TestPropNames.doublePropName},
      n.${TestPropNames.timePropName},
      n.${TestPropNames.timestampPropName},
      n.${TestPropNames.timeWithTimezonePropName},
      n.${TestPropNames.timestampWithTimezonePropName},
      n.${TestPropNames.datePropName},
      n.${TestPropNames.spatialPropName}
    FROM MATCH (n:${newLabel})
    WHERE
      n.${TestPropNames.stringPropName} = ? AND
      n.${TestPropNames.intPropName} = ? AND
      n.${TestPropNames.longPropName} = ? AND
      n.${TestPropNames.booleanPropName} = ? AND
      n.${TestPropNames.floatPropName} = ? AND
      n.${TestPropNames.doublePropName} = ? AND
      n.${TestPropNames.timePropName} = ? AND
      n.${TestPropNames.timestampPropName} = ? AND
      n.${TestPropNames.timeWithTimezonePropName} = ? AND
      n.${TestPropNames.timestampWithTimezonePropName} = ? AND
      n.${TestPropNames.datePropName} = ? AND
      n.${TestPropNames.spatialPropName} = ?
    `)

    pstmtSelect.setString(1, stringPropValue)
    pstmtSelect.setInt(2, intPropValue)
    pstmtSelect.setLong(3, longPropValue)
    pstmtSelect.setBoolean(4, booleanPropValue)
    pstmtSelect.setFloat(5, floatPropValue)
    pstmtSelect.setDouble(6, doublePropValue)
    pstmtSelect.setTime(7, LocalTime.parse(timePropValue, 'HH:mm:ss'))
    pstmtSelect.setTimestamp(
      8,
      LocalDateTime.parse(timestampPropValue, 'yyyy-MM-dd HH:mm:ss'),
    )
    pstmtSelect.setTimeWithTimezone(
      9,
      OffsetTime.parse(timeWithTimezonePropValue, 'HH:mm:ssxxx'),
    )

    pstmtSelect.setTimestampWithTimezone(
      10,
      OffsetDateTime.parse(
        timestampWithTimezonePropValue,
        'yyyy-MM-dd HH:mm:ssxxx',
      ),
    )

    pstmtSelect.setDate(11, LocalDate.parse(datePropValue, 'yyyy-MM-dd'))
    pstmtSelect.setPoint2D(12, spatialPropValue)

    const rs: IPgqlResultSet = await pstmtSelect.executeQuery()
    let isFound = false
    while (rs.next()) {
      expect(rs.getString(TestPropNames.stringPropName)).toStrictEqual(
        stringPropValue,
      )
      expect(rs.getInteger(TestPropNames.intPropName)).toBe(intPropValue)
      expect(rs.getLong(TestPropNames.longPropName)).toBe(longPropValue)
      expect(rs.getBoolean(TestPropNames.booleanPropName)).toBe(
        booleanPropValue,
      )
      expect(
        Math.round(rs.getFloat(TestPropNames.floatPropName)! * 10) / 10,
      ).toBe(floatPropValue)
      expect(rs.getDouble(TestPropNames.doublePropName)).toBe(doublePropValue)
      expect(rs.getTime(TestPropNames.timePropName)!.toString()).toStrictEqual(
        timePropValue,
      )
      expect(
        rs.getTimestamp(TestPropNames.timestampPropName)!.toString(),
      ).toStrictEqual(timestampPropValue)
      expect(
        rs
          .getTimeWithTimezone(TestPropNames.timeWithTimezonePropName)!
          .toString(),
      ).toStrictEqual(timeWithTimezonePropValue)
      expect(
        rs
          .getTimestampWithTimezone(
            TestPropNames.timestampWithTimezonePropName,
          )!
          .toString(),
      ).toStrictEqual(timestampWithTimezonePropValue)
      expect(rs.getDate(TestPropNames.datePropName)!.toString()).toStrictEqual(
        datePropValue,
      )

      expect(
        rs.getPoint2D(TestPropNames.spatialPropName)!.toString(),
      ).toStrictEqual(spatialPropValue.toString())

      isFound = true
    }
    expect(isFound).toBeTruthy()
    rs.close()

    // UPDATE
    const pstmtUpdate: IPgxPreparedStatement = await testGraph!.preparePgql(`
    UPDATE v
    SET(
      v.${TestPropNames.stringPropName} = ?,
      v.${TestPropNames.intPropName} = ?,
      v.${TestPropNames.longPropName} = ?,
      v.${TestPropNames.booleanPropName} = ?,
      v.${TestPropNames.floatPropName} = ?,
      v.${TestPropNames.doublePropName} = ?,
      v.${TestPropNames.timePropName} = ?,
      v.${TestPropNames.timestampPropName} = ?,
      v.${TestPropNames.timeWithTimezonePropName} = ?,
      v.${TestPropNames.timestampWithTimezonePropName} = ?,
      v.${TestPropNames.datePropName} = ?,
      v.${TestPropNames.spatialPropName} = ?
    )
    FROM MATCH (v:${newLabel})
    `)
    const newStringPropValue: string = 'newStrValue'
    const newIntPropValue: number = 30
    const newLongPropValue: number = 400000
    const newBooleanPropValue: boolean = true
    const newFloatPropValue: number = 4.1
    const newDoublePropValue: number = 0.1222
    const newTimePropValue: string = '21:22:10'
    const newTimestampPropValue: string = '2019-04-01 11:00:02'
    const newTimeWithTimezonePropValue: string = '01:59:55+09:00'
    const newTimestampWithTimezonePropValue: string =
      '2019-03-11 21:09:02+09:00'
    const newDatePropValue: string = '2019-05-22'
    const newSpatialPropValue: Point2D = Point2D.fromWkt('POINT(8 10)')

    pstmtUpdate.setString(1, newStringPropValue)
    pstmtUpdate.setInt(2, newIntPropValue)
    pstmtUpdate.setLong(3, newLongPropValue)
    pstmtUpdate.setBoolean(4, newBooleanPropValue)
    pstmtUpdate.setFloat(5, newFloatPropValue)
    pstmtUpdate.setDouble(6, newDoublePropValue)
    pstmtUpdate.setTime(7, LocalTime.parse(newTimePropValue, 'HH:mm:ss'))
    pstmtUpdate.setTimestamp(
      8,
      LocalDateTime.parse(newTimestampPropValue, 'yyyy-MM-dd HH:mm:ss'),
    )
    pstmtUpdate.setTimeWithTimezone(
      9,
      OffsetTime.parse(newTimeWithTimezonePropValue, 'HH:mm:ssxxx'),
    )

    pstmtUpdate.setTimestampWithTimezone(
      10,
      OffsetDateTime.parse(
        newTimestampWithTimezonePropValue,
        'yyyy-MM-dd HH:mm:ssxxx',
      ),
    )

    pstmtUpdate.setDate(11, LocalDate.parse(newDatePropValue, 'yyyy-MM-dd'))
    pstmtUpdate.setPoint2D(12, newSpatialPropValue)
    await pstmtUpdate.execute()
    pstmtUpdate.close()

    // UPDATE Check
    const pstmtUpdateCheck: IPgxPreparedStatement = await testGraph!
      .preparePgql(` SELECT n.${TestPropNames.stringPropName}, n.${TestPropNames.intPropName},
      n.${TestPropNames.longPropName},
      n.${TestPropNames.booleanPropName},
      n.${TestPropNames.floatPropName},
      n.${TestPropNames.doublePropName},
      n.${TestPropNames.timePropName},
      n.${TestPropNames.timestampPropName},
      n.${TestPropNames.timeWithTimezonePropName},
      n.${TestPropNames.timestampWithTimezonePropName},
      n.${TestPropNames.datePropName},
      n.${TestPropNames.spatialPropName}
    FROM MATCH (n:${newLabel})
    WHERE
      n.${TestPropNames.stringPropName} = ? AND
      n.${TestPropNames.intPropName} = ? AND
      n.${TestPropNames.longPropName} = ? AND
      n.${TestPropNames.booleanPropName} = ? AND
      n.${TestPropNames.floatPropName} = ? AND
      n.${TestPropNames.doublePropName} = ? AND
      n.${TestPropNames.timePropName} = ? AND n.${TestPropNames.timestampPropName} = ? AND n.${TestPropNames.timeWithTimezonePropName} = ? AND
      n.${TestPropNames.timestampWithTimezonePropName} = ? AND
      n.${TestPropNames.datePropName} = ? AND
      n.${TestPropNames.spatialPropName} = ?
    `)

    pstmtUpdateCheck.setString(1, newStringPropValue)
    pstmtUpdateCheck.setInt(2, newIntPropValue)
    pstmtUpdateCheck.setLong(3, newLongPropValue)
    pstmtUpdateCheck.setBoolean(4, newBooleanPropValue)
    pstmtUpdateCheck.setFloat(5, newFloatPropValue)
    pstmtUpdateCheck.setDouble(6, newDoublePropValue)
    pstmtUpdateCheck.setTime(7, LocalTime.parse(newTimePropValue, 'HH:mm:ss'))
    pstmtUpdateCheck.setTimestamp(
      8,
      LocalDateTime.parse(newTimestampPropValue, 'yyyy-MM-dd HH:mm:ss'),
    )
    pstmtUpdateCheck.setTimeWithTimezone(
      9,
      OffsetTime.parse(newTimeWithTimezonePropValue, 'HH:mm:ssxxx'),
    )

    pstmtUpdateCheck.setTimestampWithTimezone(
      10,
      OffsetDateTime.parse(
        newTimestampWithTimezonePropValue,
        'yyyy-MM-dd HH:mm:ssxxx',
      ),
    )

    pstmtUpdateCheck.setDate(
      11,
      LocalDate.parse(newDatePropValue, 'yyyy-MM-dd'),
    )
    pstmtUpdateCheck.setPoint2D(12, newSpatialPropValue)

    const rsUpdateCheck: IPgqlResultSet = await pstmtUpdateCheck.executeQuery()
    isFound = false
    while (rsUpdateCheck.next()) {
      expect(
        rsUpdateCheck.getString(TestPropNames.stringPropName),
      ).toStrictEqual(newStringPropValue)
      expect(rsUpdateCheck.getInteger(TestPropNames.intPropName)).toBe(
        newIntPropValue,
      )
      expect(rsUpdateCheck.getLong(TestPropNames.longPropName)).toBe(
        newLongPropValue,
      )
      expect(rsUpdateCheck.getBoolean(TestPropNames.booleanPropName)).toBe(
        newBooleanPropValue,
      )
      expect(
        Math.round(rsUpdateCheck.getFloat(TestPropNames.floatPropName)! * 10) /
          10,
      ).toBe(newFloatPropValue)
      expect(rsUpdateCheck.getDouble(TestPropNames.doublePropName)).toBe(
        newDoublePropValue,
      )
      expect(
        rsUpdateCheck.getTime(TestPropNames.timePropName)!.toString(),
      ).toStrictEqual(newTimePropValue)
      expect(
        rsUpdateCheck.getTimestamp(TestPropNames.timestampPropName)!.toString(),
      ).toStrictEqual(newTimestampPropValue)
      expect(
        rsUpdateCheck
          .getTimeWithTimezone(TestPropNames.timeWithTimezonePropName)!
          .toString(),
      ).toStrictEqual(newTimeWithTimezonePropValue)
      expect(
        rsUpdateCheck
          .getTimestampWithTimezone(
            TestPropNames.timestampWithTimezonePropName,
          )!
          .toString(),
      ).toStrictEqual(newTimestampWithTimezonePropValue)
      expect(
        rsUpdateCheck.getDate(TestPropNames.datePropName)!.toString(),
      ).toStrictEqual(newDatePropValue)
      expect(
        rsUpdateCheck.getPoint2D(TestPropNames.spatialPropName)!.toString(),
      ).toStrictEqual(newSpatialPropValue.toString())

      isFound = true
    }
    expect(isFound).toBeTruthy()
    pstmtUpdateCheck.close()

    // DELETE
    const pstmtDelete: IPgxPreparedStatement = await testGraph!.preparePgql(`
    DELETE n
    FROM MATCH (n)
    WHERE
      n.${TestPropNames.stringPropName} = ? AND
      n.${TestPropNames.intPropName} = ? AND
      n.${TestPropNames.longPropName} = ? AND
      n.${TestPropNames.booleanPropName} = ? AND
      n.${TestPropNames.floatPropName} = ? AND
      n.${TestPropNames.doublePropName} = ? AND
      n.${TestPropNames.timePropName} = ? AND
      n.${TestPropNames.timestampPropName} = ?AND
      n.${TestPropNames.timeWithTimezonePropName} = ? AND
      n.${TestPropNames.timestampWithTimezonePropName} = ? AND
      n.${TestPropNames.datePropName} = ? AND
      n.${TestPropNames.spatialPropName} = ?
    `)

    pstmtDelete.setString(1, newStringPropValue)
    pstmtDelete.setInt(2, newIntPropValue)
    pstmtDelete.setLong(3, newLongPropValue)
    pstmtDelete.setBoolean(4, newBooleanPropValue)
    pstmtDelete.setFloat(5, newFloatPropValue)
    pstmtDelete.setDouble(6, newDoublePropValue)
    pstmtDelete.setTime(7, LocalTime.parse(newTimePropValue, 'HH:mm:ss'))
    pstmtDelete.setTimestamp(
      8,
      LocalDateTime.parse(newTimestampPropValue, 'yyyy-MM-dd HH:mm:ss'),
    )
    pstmtDelete.setTimeWithTimezone(
      9,
      OffsetTime.parse(newTimeWithTimezonePropValue, 'HH:mm:ssxxx'),
    )

    pstmtDelete.setTimestampWithTimezone(
      10,
      OffsetDateTime.parse(
        newTimestampWithTimezonePropValue,
        'yyyy-MM-dd HH:mm:ssxxx',
      ),
    )

    pstmtDelete.setDate(11, LocalDate.parse(newDatePropValue, 'yyyy-MM-dd'))
    pstmtDelete.setPoint2D(12, newSpatialPropValue)

    await pstmtDelete.execute()
    pstmtDelete.close()

    // DELETE CHECK
    const pstmtDeleteCheck: IPgxPreparedStatement = await testGraph!
      .preparePgql(`
    SELECT n
    FROM MATCH (n:${newLabel})
    WHERE
      n.${TestPropNames.stringPropName} = ? AND
      n.${TestPropNames.intPropName} = ? AND
      n.${TestPropNames.longPropName} = ? AND
      n.${TestPropNames.booleanPropName} = ? AND
      n.${TestPropNames.floatPropName} = ? AND
      n.${TestPropNames.doublePropName} = ? AND
      n.${TestPropNames.timePropName} = ? AND
      n.${TestPropNames.timestampPropName} = ? AND
      n.${TestPropNames.timeWithTimezonePropName} = ? AND
      n.${TestPropNames.timestampWithTimezonePropName} = ? AND
      n.${TestPropNames.datePropName} = ? AND
      n.${TestPropNames.spatialPropName} = ?
    `)

    pstmtDeleteCheck.setString(1, newStringPropValue)
    pstmtDeleteCheck.setInt(2, newIntPropValue)
    pstmtDeleteCheck.setLong(3, newLongPropValue)
    pstmtDeleteCheck.setBoolean(4, newBooleanPropValue)
    pstmtDeleteCheck.setFloat(5, newFloatPropValue)
    pstmtDeleteCheck.setDouble(6, newDoublePropValue)
    pstmtDeleteCheck.setTime(7, LocalTime.parse(newTimePropValue, 'HH:mm:ss'))
    pstmtDeleteCheck.setTimestamp(
      8,
      LocalDateTime.parse(newTimestampPropValue, 'yyyy-MM-dd HH:mm:ss'),
    )
    pstmtDeleteCheck.setTimeWithTimezone(
      9,
      OffsetTime.parse(newTimeWithTimezonePropValue, 'HH:mm:ssxxx'),
    )

    pstmtDeleteCheck.setTimestampWithTimezone(
      10,
      OffsetDateTime.parse(
        newTimestampWithTimezonePropValue,
        'yyyy-MM-dd HH:mm:ssxxx',
      ),
    )

    pstmtDeleteCheck.setDate(
      11,
      LocalDate.parse(newDatePropValue, 'yyyy-MM-dd'),
    )
    pstmtDeleteCheck.setPoint2D(12, newSpatialPropValue)

    const rsDeleteCheck: IPgqlResultSet = await pstmtDeleteCheck.executeQuery()
    expect(rsDeleteCheck.getNumResults()).toBe(0)
    rsDeleteCheck.close()
  })

  test('setArray', async () => {
    const stmt: IPgxPreparedStatement = await testGraph!.preparePgql(`
    SELECT id(n)
    FROM MATCH (n)
    WHERE n.${TestPropNames.longPropName} IN ?
    `)

    stmt.setArray(1, [1, 2, 3])
    await stmt.executeQuery()
  })
})
