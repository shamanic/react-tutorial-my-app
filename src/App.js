import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            slay React
          </a>
          <Game />
        </header>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
    
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
    if (calculateWinner(squares) != null) {
      alert(this.state.xIsNext ? 'X has won' : 'O has won');
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move :
        'Go to start';
      return (
        <li key={move}> 
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    )
  }
}

class Board extends React.Component {

  renderBoard(squaresCount) {
    //buggy..
    const side = Math.floor(Math.sqrt(squaresCount));
    console.log(side);

    let board = [];
    for (let s = 1; s <= side; s++) {
      let row = [];
      console.log('row length is: ' + row.length);
      // debugger;
      for (let i = 1; i <= side; i++) {
        if (i % 3 === 0) {
          row.push(<div className="board-row"> {
            this.renderSquare(s * i)
          }
          </div>);
        } else {
          // append to the above row?
        }
        console.log('row length is now: ' + row.length);
      }
      board.push(row);
    }
    console.log(board);
    return board;
  }

  renderSquare(i) {
    return (<Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />);
  }

  render() {
    return (
      <div>
        <div className="board-row"> 
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row"> 
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          
          </div>
          <div className="board-row"> 
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          
          </div>
      </div>
    )
  }
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

class boogers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consistency: null,
      color: null,
      hairs: false,
    }
  }
  render() {
    return (
      <button>pick!</button>
    )
  }
}

function calculateWinner(squares) {
  const winningRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < winningRows.length; i++) {
    const [a, b, c] = winningRows[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

export default App;
