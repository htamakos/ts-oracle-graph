import javaNodeApi from '../JavaApi'

const JavaIdGenerationStrategy: any = javaNodeApi.import(
  'oracle.pgx.config.IdGenerationStrategy',
)

export class IdGenerationStrategy {
  public static AUTO_GENERATED: any = JavaIdGenerationStrategy.AUTO_GENERATED
  public static USER_IDS: any = JavaIdGenerationStrategy.USER_IDS

  private constructor() {}
}
