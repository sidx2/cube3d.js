class Cube3d {
    constructor(x, y, sideLength, ctx, lineColor = "black") {
        this.x = x;
        this.y = y;
        this.sideLength = sideLength;
        this.distance = 400;
        this.ctx = ctx;
        this.lineColor = lineColor;

        this.vertices = [
            [-this.sideLength, this.sideLength, -this.sideLength],
            [this.sideLength, this.sideLength, -this.sideLength],
            [this.sideLength, -this.sideLength, -this.sideLength],
            [-this.sideLength, -this.sideLength, -this.sideLength],

            [-this.sideLength, this.sideLength, this.sideLength],
            [this.sideLength, this.sideLength, this.sideLength],
            [this.sideLength, -this.sideLength, this.sideLength],
            [-this.sideLength, -this.sideLength, this.sideLength]
        ]; // all 8 vertices of the cube
    }

    _drawLine(a, b) {
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.beginPath();

        let scale = 100;

        this.ctx.moveTo(this.x + (a[0] * scale), this.y - (a[1] * scale));
        this.ctx.lineTo(this.x + (b[0] * scale), this.y - (b[1] * scale));

        this.ctx.stroke();
    }

    matrixMultiply(matrixA, matrixB) {
        const rowsA = matrixA.length;
        const colsA = matrixA[0].length;
        const rowsB = matrixB.length;
        const colsB = matrixB[0].length;

        if (colsA !== rowsB) {
            throw new Error("Matrix dimensions are not compatible for multiplication.");
        }

        const result = new Array(rowsA);
        for (let i = 0; i < rowsA; i++) {
            result[i] = new Array(colsB);
            for (let j = 0; j < colsB; j++) {
                result[i][j] = 0;
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }

        return result;
    }

    draw() {
        let projected = Array(8);
        for (let i = 0; i < 8; i++) {
            let z = 1 / (this.distance - (this.vertices[i][2]));
            projected[i] = [z * this.vertices[i][0], z * this.vertices[i][1]];
        }

        for (let i = 0; i < 4; i++) {
            this._drawLine(projected[i], projected[(i + 1) % 4]);
            this._drawLine(projected[i], projected[i + 4]);
            this._drawLine(projected[i + 4], projected[(i + 5) % 4 + 4]);
        }
    }

    rotateX(angle) {
        const Rx = [
            [1, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle)],
            [0, Math.sin(angle), Math.cos(angle)]
        ]; // Rotation matrix to rotate around X axis

        this.vertices = this.matrixMultiply(this.vertices, Rx);
    }

    rotateY(angle) {
        const Ry = [
            [Math.cos(angle), 0, Math.sin(angle)],
            [0, 1, 0],
            [-Math.sin(angle), 0, Math.cos(angle)],
        ]; // Rotation matrix to rotate around Y axis

        this.vertices = this.matrixMultiply(this.vertices, Ry);
    }

    rotateZ(angle) {
        const Rz = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]; // Rotation matrix to rotate around Z axis

        this.vertices = this.matrixMultiply(this.vertices, Rz);
    }
}