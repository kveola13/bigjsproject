import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import {createMatrix, cloneMatrix} from "./utils";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: createMatrix(4, 4, null)
        };
    }

    componentDidMount() {
        this.shuffle();
    }

    shuffle = () => {

        const values = _.shuffle(Array.from(Array(16)).map((e, i) => i === 15 ? null : i + 1));
        const board = createMatrix(4, 4, null);
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                board[r][c] = values[(r * 4) + c];
            }
        }
        this.setState({cells: board})
    };

    static freeRects(board) {
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 4; column++) {
                if (!board[row][column]) {
                    return {r: row, c: column}
                }
            }
        }
        throw "Invalid board state: no free cell"
    }

    freeRect(row, column) {
        const free = App.freeRects(this.state.cells);
        return free.r === row && free.c === column;
    }

    canPlayerMoveToRect(row, column) {

        const freePosition = App.freeRects(this.state.cells);

        const moveLeft = row === freePosition.r && column === freePosition.c - 1;
        const moveRight = row === freePosition.r && column === freePosition.c + 1;
        const moveUp = row === freePosition.r - 1 && column === freePosition.c;
        const moveDown = row === freePosition.r + 1 && column === freePosition.c;

        return moveLeft || moveRight || moveUp || moveDown;
    }

    selectCell = (row, column) => {
        this.setState(prev => {
            const copy = cloneMatrix(prev.cells);
            const freeRects = App.freeRects(copy);

            const temp = copy[row][column];
            copy[row][column] = copy[freeRects.r][freeRects.c];
            copy[freeRects.r][freeRects.c] = temp;

            return {cells: copy};
        })
    };

    renderCell(row, column) {
        const value = this.state.cells[row][column];
        let style = {cursor: "default", background: "white"};
        let handler = null;

        if (this.freeRect(row, column)) {
            style = {cursor: "default", background: "black"};
        }
        if (this.canPlayerMoveToRect(row, column)) {
            style = {cursor: "pointer", background: "white"};
            handler = () => this.selectCell(row, column);
        }
        return (
            <div className={"cell"}
                 key={"unique_cell_key_row_" + row + "_column_" + column}
                 style={style}
                 onClick={handler}
            >
                {value === null ? "" : value}
            </div>
        );
    }

    renderRow(row) {
        return (
            <div className={"cell-row"} key={"unique_row_key_" + row}>
                {this.state.cells[row].map((e, i) => this.renderCell(row, i))}
            </div>
        );
    }

    isSolved() {
        let expected = 1;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (expected === 16) {
                    return true;
                }
                if (this.state.cells[r][c] !== expected) {
                    return false;
                }
                expected++;
            }
        }
        throw "Please contact system administrator";
    }

    render() {
        return (
            <div>
                <h2>React Puzzle</h2>
                {this.state.cells.map((e, i) => this.renderRow(i))}
                <div className={"button"} onClick={this.shuffle}>New Game</div>
                {this.isSolved() ? <h3>Solved!</h3> : <h3>Unsolved</h3>}
            </div>
        );
    }

}

ReactDOM.render(<App/>, document.getElementById("root"));