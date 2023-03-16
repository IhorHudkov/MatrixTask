import { beforeEach, describe, expect, it } from 'vitest';
import singletonMatrix, { Matrix } from './Matrix';

describe('#Matrix', () => {
  beforeEach(() => {
    singletonMatrix.delete();
  });

  it('Mast be the same instance', () => {
    const instanceA = Matrix.getInstance();
    const instanceB = Matrix.getInstance();
    expect(instanceA).toEqual(instanceB);
  });

  it('The matrix has not been created yet', () => {
    expect(singletonMatrix.isMatrixCreated).toBe(false);
  });

  it('Matrix created', () => {
    singletonMatrix.create(2, 2);
    expect(singletonMatrix.isMatrixCreated).toBe(true);
    expect(singletonMatrix.rows).toBe(2);
    expect(singletonMatrix.columns).toBe(2);
    expect(singletonMatrix.size).toBe(4);
    expect(singletonMatrix.cells.length).toBe(4);
    expect(singletonMatrix.matrix.length).toBe(2);
    expect(singletonMatrix.matrix[0].length).toBe(2);
    expect(singletonMatrix.matrix[1].length).toBe(2);
  });

  it('An exception should be thrown because the matrix has already been created.', () => {
    singletonMatrix.create(2, 2);
    expect(() => singletonMatrix.create(2, 2)).toThrowError(
      'The matrix already exists'
    );
  });

  it('The row should be added', () => {
    singletonMatrix.create(2, 2);
    singletonMatrix.addRow();
    expect(singletonMatrix.rows).toBe(3);
    expect(singletonMatrix.matrix.length).toBe(3);
    expect(singletonMatrix.cells.length).toBe(6);
  });

  it('The column should be added', () => {
    singletonMatrix.create(3, 3);
    singletonMatrix.addColumn();
    expect(singletonMatrix.columns).toBe(4);
    expect(singletonMatrix.matrix.length).toBe(3);
    expect(singletonMatrix.cells.length).toBe(12);
  });

  it('The row should be removed', () => {
    singletonMatrix.create(3, 3);
    singletonMatrix.removeRow();
    expect(singletonMatrix.rows).toBe(2);
    expect(singletonMatrix.matrix.length).toBe(2);
    expect(singletonMatrix.cells.length).toBe(6);
  });

  it('The column should be removed', () => {
    singletonMatrix.create(3, 3);
    singletonMatrix.removeColumn();
    expect(singletonMatrix.columns).toBe(2);
    expect(singletonMatrix.matrix.length).toBe(3);
    expect(singletonMatrix.cells.length).toBe(6);
  });
});
