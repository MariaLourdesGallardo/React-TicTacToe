import { WINNER_COMBOS } from "../constants"
 
export const checkWinner = (boradToCheack) => {
    for ( const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boradToCheack[a] &&
        boradToCheack[a] === boradToCheack[b] &&
        boradToCheack[a] === boradToCheack[c]
      ) {
        return boradToCheack[a]
      }
    }
    //si no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
  } 