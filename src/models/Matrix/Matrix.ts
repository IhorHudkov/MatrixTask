export type CellId = number; // unique value for all table
export type CellValue = number; // three digit random number

export type Cell = {
  id: CellId;
  amount: CellValue;
};

export class Matrix {
  private static instance: Matrix;
  private constructor() {}
  public static getInstance(): Matrix {
    if (!Matrix.instance) {
      Matrix.instance = new Matrix();
    }
    return Matrix.instance;
  }
  private M: number = 0;
  private N: number = 0;

  public get rows(): number {
    return this.M;
  }
  public get columns(): number {
    return this.N;
  }
  private _size: number = 0;

  public get size(): number {
    return this._size;
  }

  private _isMatrixCreated = false;

  public get isMatrixCreated() {
    return this._isMatrixCreated;
  }

  public create(rows: number, columns: number) {
    if (this.isMatrixCreated) {
      throw new Error('The matrix already exists');
    }
    this.M = rows;
    this.N = columns;
    this._size = this.M * this.N;
    this.fillInMatrix();
    this._isMatrixCreated = true;
  }

  public increaseCellValue(cellId: CellId) {
    for (let m = 0; m < this.M; m++) {
      for (let n = 0; n < this.N; n++) {
        if (this._matrix[m][n].id === cellId) {
          this._matrix[m][n].amount++;
        }
      }
    }
  }

  public getCell(cellId: CellId) {
    const index = this.cells.findIndex((cell) => cell.id === cellId);
    return this.cells[index];
  }

  public removeRow(rowNumber: number = this.M) {
    this._matrix.splice(rowNumber - 1, 1);
    this.M--;
  }

  public addRow() {
    const newRow: Cell[] = Array(this.N).fill(0);

    newRow.forEach((el, index) => {
      newRow[index] = {
        id: this.generateCellId(),
        amount: this.generateCellValue(),
      };
    });

    this._matrix.push(newRow);
    this.M++;
  }

  public addColumn() {
    this._matrix.forEach((row) => {
      row.push({
        id: this.generateCellId(),
        amount: this.generateCellValue(),
      });
    });
    this.N++;
  }

  public removeColumn(columnNumber: number = this.N) {
    this._matrix.forEach((row) => {
      row.splice(columnNumber - 1, 1);
    });
    this.N--;
  }

  public get cells() {
    return this._matrix.flat(1);
  }

  private generateCellValue(): number {
    const min: number = 100;
    const max: number = 1000;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private generateCellId(): number {
    let cellIdStr = '';
    let cellId = 0;
    do {
      cellIdStr += Math.floor(Math.random() * 9 + 1);
      for (let i = 0; i < 9; i++) {
        cellIdStr += Math.floor(Math.random() * 10);
      }
      cellId = Number(cellIdStr);
    } while (this.cells.findIndex((cell) => cell.id === cellId) !== -1);
    return cellId;
  }

  private _matrix: Cell[][] = [];

  public get matrix(): Cell[][] {
    if (!this._isMatrixCreated) {
      this.create(this.M, this.N);
    }
    return this._matrix;
  }

  private fillInMatrix() {
    for (let m = 0; m < this.M; m++) {
      this._matrix.push([]);
    }
    for (let m = 0; m < this.M; m++) {
      for (let n = 0; n < this.N; n++) {
        this._matrix[m].push({
          id: this.generateCellId(),
          amount: this.generateCellValue(),
        });
      }
    }
  }

  public delete() {
    this.M = 0;
    this.N = 0;
    this._size = 0;
    this._matrix = [];
    this._isMatrixCreated = false;
  }
}

const singletonMatrix = Matrix.getInstance();
export default singletonMatrix;
