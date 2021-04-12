import { Point2D } from '../../src/pgql/Point2D'

describe('Point2D', (): void => {
  test('should get X, Y', async () => {
    const point2D: Point2D = Point2D.fromWkt('POINT(1 2)')

    expect(point2D.getX()).toBe(1)
    expect(point2D.getY()).toBe(2)
  })
})
