import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS} from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";


function App() { 
  //los hooks deben ir siempre en el cuerpo de la app, no dentro de un if

  const [board, setBoard ] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage 
     ? JSON.parse(boardFromStorage) 
     : Array(9).fill(null)
  })

  const [turn, setTurn] = useState( () => {
    const turnsFromStorage = window.localStorage.getItem('turn')
    return turnsFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  

  const updateBoard = (index) => {
//este if es para no actulizar si ya tiene contenido o si ya hay un ganador
    if (board[index] || winner) return
 
//actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

//cambiar el turno 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

//guardar partida 
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)
    
//revisar si hay ganador 
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1> 
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map( (_,index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
             )
          } )
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X} >
          {TURNS.X} 
        </Square>
        <Square isSelected={turn === TURNS.O} > 
          {TURNS.O} 
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
