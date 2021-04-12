import javaNodeApi from './JavaApi'

export interface DateTimeFormatter {}

/**
 */
export const JavaDateTimeFormatter = javaNodeApi.import(
  'java.time.format.DateTimeFormatter',
)

/**
 */
export const JavaLocalDateTime = javaNodeApi.import('java.time.LocalDateTime')

// Set UTC timezone
// const JavaTimeZone = javaNodeApi.import('java.util.TimeZone')
// JavaTimeZone.setDefaultSync(JavaTimeZone.getTimeZoneSync('UTC'))

/**
 */
export const JavaTimestamp = javaNodeApi.import('java.sql.Timestamp')

export const JavaLocalTime = javaNodeApi.import('java.time.LocalTime')
export const JavaLocalDate = javaNodeApi.import('java.time.LocalDate')
export const JavaOffsetTime = javaNodeApi.import('java.time.OffsetTime')
export const JavaOffsetDateTime = javaNodeApi.import('java.time.OffsetDateTime')

/**
 */
export class LocalDateTime {
  public static MAX: LocalDateTime = new LocalDateTime(JavaLocalDateTime.MAX)
  public static MIN: LocalDateTime = new LocalDateTime(JavaLocalDateTime.MIN)

  private static _cls: any = JavaLocalDateTime
  private static readonly TIMESTAMP_FORMAT: string =
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  private static readonly TIMESTAMP_FORMATTER = JavaDateTimeFormatter.ofPatternSync(
    LocalDateTime.TIMESTAMP_FORMAT,
  )

  private readonly internalObj: any

  static now(): LocalDateTime {
    return new LocalDateTime(LocalDateTime._cls.nowSync())
  }

  static parse(text: string, format: string) {
    return new LocalDateTime(
      LocalDateTime._cls.parseSync(
        text,
        JavaDateTimeFormatter.ofPatternSync(format),
      ),
    )
  }

  static parseISOString(text: string): LocalDateTime {
    return new LocalDateTime(
      LocalDateTime._cls.parseSync(text, LocalDateTime.TIMESTAMP_FORMATTER),
    )
  }

  constructor(javaLocalDateTime: any) {
    this.internalObj = javaLocalDateTime
  }

  getDayOfMonth(): number {
    return this.internalObj.getDayOfMonthSync()
  }

  getDayOfYear(): number {
    return this.internalObj.getDayOfYearSync()
  }

  getHour(): number {
    return this.internalObj.getHourSync()
  }

  getMinute(): number {
    return this.internalObj.getMinuteSync()
  }

  getMonthValue(): number {
    return this.internalObj.getMonthValueSync()
  }

  getNano(): number {
    return this.internalObj.getNanoSync()
  }

  getSecond(): number {
    return this.internalObj.getSecondSync()
  }

  getYear(): number {
    return this.internalObj.getYearSync()
  }

  hashCode(): number {
    return this.internalObj.hashCodeSync()
  }

  minusDays(days: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusDaysSync(days))
  }

  minusHours(hours: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusHoursSync(hours))
  }

  minusMinutes(minutes: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusMinutesSync(minutes))
  }

  minusMonths(months: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusMonthsSync(months))
  }

  minusNanos(nanos: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusNanosSync(nanos))
  }

  minusSeconds(seconds: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusSecondsSync(seconds))
  }

  minusWeeks(weeks: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusWeeksSync(weeks))
  }

  minusYears(years: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.minusYearsSync(years))
  }

  plusDays(days: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusDaysSync(days))
  }

  plusHours(hours: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusHoursSync(hours))
  }

  plusMinutes(minutes: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusMinutesSync(minutes))
  }

  plusMonths(months: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusMonthsSync(months))
  }

  plusNanos(nanos: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusNanosSync(nanos))
  }

  plusSeconds(seconds: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusSecondsSync(seconds))
  }

  plusWeeks(weeks: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusWeeksSync(weeks))
  }

  plusYears(years: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.plusYearsSync(years))
  }

  withDayOfMonth(dayOfMonth: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withDayOfMonthSync(dayOfMonth))
  }

  withDayOfYear(dayOfYear: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withDayOfYearSync(dayOfYear))
  }

  withHour(hour: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withHourSync(hour))
  }

  withMinute(minute: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withMinuteSync(minute))
  }

  withMonth(month: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withMonthSync(month))
  }

  withNano(nano: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withNanoSync(nano))
  }

  withSecond(second: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withSecondSync(second))
  }

  withYear(year: number): LocalDateTime {
    return new LocalDateTime(this.internalObj.withYearSync(year))
  }

  toString(): string {
    return this.internalObj.formatSync(
      JavaDateTimeFormatter.ofPatternSync('yyyy-MM-dd HH:mm:ss'),
    )
  }

  getJavaObject(): any {
    return this.internalObj
  }
}

export class LocalDate {
  private static readonly _cls: any = JavaLocalDate
  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  toString(): string {
    return this.internalObj.toStringSync()
  }

  static now(): LocalTime {
    return new LocalTime(JavaLocalTime.nowSync())
  }

  static parse(text: string, format: string): LocalDate {
    return new LocalDate(
      LocalDate._cls.parseSync(
        text,
        JavaDateTimeFormatter.ofPatternSync(format),
      ),
    )
  }

  getJavaObject(): any {
    return this.internalObj
  }
}

export class LocalTime {
  private static readonly _cls: any = JavaLocalTime
  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }
  toString(): string {
    return this.internalObj.formatSync(
      JavaDateTimeFormatter.ofPatternSync('HH:mm:ss'),
    )
  }

  static now(): LocalTime {
    return new LocalTime(JavaLocalTime.nowSync())
  }

  static parse(text: string, format: string): LocalTime {
    return new LocalTime(
      LocalTime._cls.parseSync(
        text,
        JavaDateTimeFormatter.ofPatternSync(format),
      ),
    )
  }

  getJavaObject(): any {
    return this.internalObj
  }
}

export class OffsetDateTime {
  private static readonly _cls: any = JavaOffsetDateTime
  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }
  toString(): string {
    return this.internalObj.formatSync(
      JavaDateTimeFormatter.ofPatternSync('yyyy-MM-dd HH:mm:ssxxx'),
    )
  }
  static now(): OffsetDateTime {
    return new OffsetDateTime(OffsetDateTime._cls.nowSync())
  }

  static parse(text: string, format: string): OffsetDateTime {
    return new OffsetDateTime(
      OffsetDateTime._cls.parseSync(
        text,
        JavaDateTimeFormatter.ofPatternSync(format),
      ),
    )
  }

  getJavaObject(): any {
    return this.internalObj
  }
}

export class OffsetTime {
  private static readonly _cls: any = JavaOffsetTime
  private readonly internalObj: any
  constructor(internalObj: any) {
    this.internalObj = internalObj
  }
  toString(): string {
    return this.internalObj.formatSync(
      JavaDateTimeFormatter.ofPatternSync('HH:mm:ssxxx'),
    )
  }

  getJavaObject(): any {
    return this.internalObj
  }
  static now(): OffsetTime {
    return new OffsetTime(OffsetTime._cls.nowSync())
  }

  static parse(text: string, format: string): OffsetTime {
    return new OffsetTime(
      OffsetTime._cls.parseSync(
        text,
        JavaDateTimeFormatter.ofPatternSync(format),
      ),
    )
  }
}
