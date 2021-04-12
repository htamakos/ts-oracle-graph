// TODO
export interface IPgxFrame {
  getInternalObject(): IPgxFrame
  close(): void
  count(): number
  destroy(): void
  flatten(...columns: any): IPgxFrame
  flattenAll(): IPgxFrame
  getColumn(columnName: string): IPgxFrameColumn
  getColumnDescriptors(): IColumnDescriptor[]
  head(numRows?: number): IPgxFrame
  join(
    right: IPgxFrame,
    leftJoinKeyColumn: string,
    rightJoinKeyColumn: string,
    leftPrefix: string,
    rightPrefix: string,
  ): IPgxFrame
  length(): number
  print(numResults?: number, from?: number): void
  renameColumn(oldColumnName: string, newColumnName: string): IPgxFrame
  select<T extends string[] = string[]>(...columns: T): IPgxFrame
}

// TODO
export interface IPgxFrameColumn {}
// TODO
export interface IColumnDescriptor {}

// TODO
export class PgxFrame implements IPgxFrame {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  getInternalObject(): IPgxFrame {
    return this.internalObj
  }

  close(): void {
    this.internalObj.closeSync()
  }
  count(): number {
    return this.internalObj.countSync().valueOf()
  }
  destroy(): void {
    this.internalObj.destroySync()
  }
  flatten(...columns: any): IPgxFrame {
    return new PgxFrame(this.internalObj.flattenSync(columns))
  }
  flattenAll(): IPgxFrame {
    return new PgxFrame(this.internalObj.flattenAllSync())
  }
  getColumn(columnName: string): IPgxFrameColumn {
    return new PgxFrameColumn(this.internalObj.getColumnSync(columnName))
  }
  getColumnDescriptors(): IColumnDescriptor[] {
    const descriptors: any[] = this.internalObj
      .getColumnDescriptorsSync()
      .toArraySync()

    return descriptors.map((desc) => new ColumnDescriptor(desc))
  }
  head(numRows?: number): IPgxFrame {
    if (numRows !== undefined && numRows !== null) {
      return new PgxFrame(this.internalObj.headSync(numRows))
    } else {
      return new PgxFrame(this.internalObj.headSync())
    }
  }

  join(
    right: IPgxFrame,
    leftJoinKeyColumn: string,
    rightJoinKeyColumn: string,
    leftPrefix: string,
    rightPrefix: string,
  ): IPgxFrame {
    return new PgxFrame(
      this.internalObj.joinSync(
        right.getInternalObject(),
        leftJoinKeyColumn,
        rightJoinKeyColumn,
        leftPrefix,
        rightPrefix,
      ),
    )
  }
  length(): number {
    return this.internalObj.lengthSync().valueOf()
  }
  print(numResults?: number, from?: number): void {
    if (
      numResults !== undefined &&
      numResults !== null &&
      from !== undefined &&
      from !== null
    ) {
      this.internalObj.printSync(numResults, from)
    } else if (numResults !== undefined && numResults !== null) {
      this.internalObj.printSync(numResults)
    } else {
      this.internalObj.printSync()
    }
  }

  renameColumn(oldColumnName: string, newColumnName: string): IPgxFrame {
    return new PgxFrame(
      this.internalObj.renameColumnSync(oldColumnName, newColumnName),
    )
  }

  select<T extends string[] = string[]>(...columns: T): IPgxFrame {
    return new PgxFrame(this.internalObj.selectSync(columns))
  }
}

// TODO
export class PgxFrameColumn implements IPgxFrameColumn {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }
}

// TODO
export class ColumnDescriptor implements IColumnDescriptor {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }
}
