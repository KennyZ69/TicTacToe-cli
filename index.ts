enum Player{
    X = 'X',
    O = 'O',
    draw = 'DRAW'
  };
  
  type Board = (Player | null)[][];
  // type pickPosition = number[];
  
  class TicTacToe {
    private board: Board;
    public currentPlayer: Player;
    private readonly size: number;
  
    constructor(size: number = 3){
      this.size = size;
      this.board = this.createBoard(size);
      this.currentPlayer = Player.X;
    }
  
    private createBoard(size: number): Board{
      return Array.from({length: size}, () => Array(size).fill(null))
    }
  
    public printBoard(): void{
      console.log('Board: ');
      for(let row of this.board){
        console.log(row.map(cell => cell || ' ').join(' | '));
        console.log('-'.repeat(this.size * 4 - 1));
      }
    }
  
    public makeMove(row: number, col: number): boolean{
      if(row < 0 || row > this.size || col < 0 || col > this.size || this.board[row][col] !== null){
        console.log('Invalid input');
        return false;
      }
      this.board[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      return true;
    }
  
    public checkWinner(): Player | null{
      for(let row = 0; row < this.size; row++){
        if(this.board[row].every(cell => cell === Player.X)) return Player.X;
        if(this.board[row].every(cell => cell === Player.O)) return Player.O;
      }
  
      for(let col = 0; col < this.size; col++){
        let colArr = this.board.map(row => row[col]);
        if(colArr.every(cell => cell === Player.X)) return Player.X;
        if(colArr.every(cell => cell === Player.O)) return Player.O;
      }
  
      // Skontroluj uhlopriecky
      let diagonal1 = [];
      let diagonal2 = [];
      for(let i = 0; i < this.size; i++){
        diagonal1.push(this.board[i][i]);
        diagonal2.push(this.board[i][this.size - 1 - i]);
      }
      if(diagonal1.every(cell => cell === Player.X)) return Player.X;
      if(diagonal1.every(cell => cell === Player.O)) return Player.O;
  
      // Ci nahodou nemni remiza
      if(this.board.every(row => row.every(cell => cell !== null))) return Player.draw;
  
      return null;
    }
  
    public computerMove(): void{
      const emptyCols: [number, number][] = [];
      for(let row = 0; row < this.size; row++){
        for(let col = 0; col < this.size; col++){
          if(this.board[row][col] === null){
            emptyCols.push([row, col]);
          }
          // ! There has to be some else statement, otherwise it just throws an error if the game ended up by draw
          // else{
          // // return;
          // return;
          // }
        }
      }
       if(emptyCols.length === 0){
        console.log('DRAW');
        return;
       }
       else{
      const [row, col] = emptyCols[Math.floor(Math.random() * emptyCols.length)]
        this.makeMove(row, col);
    }
  }
      // console.log('Unfortunately, this game happended to end up by draw');
      
    }
  
  
  
  async function main() {
    const game = new TicTacToe();
    let winner: Player | null = null
    // let [checkRow, checkCol] = await promptMove();
  
    while(!winner){
      game.printBoard();
      if(game.currentPlayer === Player.X){
        const [row, col] = await promptMove();
        game.makeMove(row, col);
      }
      else{
        game.computerMove();
      }
      winner = game.checkWinner();
    }
    if(winner === Player.X){
      game.printBoard();
      console.log(`${winner} Congrats you won!`);
    }
    // else if(winner === null && game.makeMove(checkRow, checkCol)){
    //   console.log('Oh, there happened to be a draw, play again maybe?');
    // }
    // else{
    //   console.log('Thats unfortunate, you lost');      
    // }
    else if(winner === Player.O) {
      game.printBoard();
      console.log('Thats unfortunate. the AI beat you');
    }
    else if(winner === Player.draw){
      game.printBoard();
      console.log('DRAW');
      
    }
    // else console.log('There happened to be a draw... maybe play again?');
  }
  
  async function promptMove(): Promise<[number, number]>{
    const input = prompt('Enter the row and column (index from 0 and separate numbers by space): ')
    const [row, col] = input!.trim().split(' ').map(num => parseInt(num));
    return [row, col];
  }
  
  main();