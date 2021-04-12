import { EdgeProperty, IEdgeProperty } from './EdgeProperty'
import { IPgxGraph } from './PgxGraph'

// TODO
export interface IAnalyst {
  adamicAdarCounting(
    graph: IPgxGraph,
    aa?: IEdgeProperty<number>,
  ): Promise<IEdgeProperty<number>>
}

// TODO
export class Analyst implements IAnalyst {
  private readonly internalObj: any

  constructor(internalObj: any) {
    this.internalObj = internalObj
  }

  async adamicAdarCounting(
    graph: IPgxGraph,
    aa?: IEdgeProperty<number>,
  ): Promise<IEdgeProperty<number>> {
    if (aa !== undefined && aa !== null) {
      return new EdgeProperty<number>(
        this.internalObj.adamicAdarCountingSync(
          graph.getJavaObject(),
          aa.getJavaObject(),
        ),
      )
    } else {
      return new EdgeProperty<number>(
        this.internalObj.adamicAdarCountingSync(graph.getJavaObject()),
      )
    }
  }
}
