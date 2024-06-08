const inc1 = document.getElementById("incre1")
const inc2 = document.getElementById("incre2")
const send = document.getElementById("send")
const White = document.getElementById("White")
const Black = document.getElementById("Black")
const mov = document.getElementById("move")
const url = 'https://corsproxy.io/?' + encodeURIComponent("https://chess-api.com/v1");


White.addEventListener("click",() =>{
    
    let inc1_1 = 1
    let inc2_1 = 1
    let inc1_2 = 1
    let inc2_2 = 1
    let send1 = false
    let FEN = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
    
    inc1.addEventListener("click", () =>{
        if (inc1_1 < 8 & !send1){
            inc1_1 +=1 
            
        }
        else if (inc1_2 < 8 & send1){
            inc1_2 +=1 
            
        }
        console.log(inc1_2)
    })
inc2.addEventListener("click", () =>{
    if (inc2_1 < 8 & !send1){
        inc2_1 +=1 
        
    }
    else if (inc2_2 < 8 & send1){
        inc2_2 +=1 
        
    }
    console.log(inc2_1)
})
send.addEventListener("click", ()=>{
    if (send1){
        send1 = false
        updateFEN(inc1_1,inc2_1, inc1_2,inc2_2)
        // Execute the function with the FEN position
        postChessApi({
            fen: FEN, // Replace 'FEN' with the actual FEN string
            depth: 15, // Adjust the depth as needed, ensuring it's an integer less than 16
            // Other parameters can be added if required by the API
        }).then(() => {
            // Additional data can be logged as needed
        });
        inc1_1 = 1
        inc2_1 = 1
        inc1_2 = 1
        inc2_2 = 1
        
        
    }
    else{
        send1 = true
        
    }
})
function translateMove(move) {
    mov.innerText = move

    navigator.vibrate(200);

    // Map the files 'a' to 'h' to numbers 1 to 8
    const fileToNumber = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 };
    
    // Extract the starting and ending positions from the move
    const [startFile, startRank, endFile, endRank] = move.split('');
    
    // Translate files to numbers and parse ranks as integers
    let inc1_1 = parseInt(startRank, 10);
    let inc2_1 = fileToNumber[startFile];
    let inc1_2 = parseInt(endRank, 10);
    let inc2_2 = fileToNumber[endFile];
    // Log the values or return them as needed
    console.log(`inc1_1: ${inc1_1}, inc2_1: ${inc2_1}, inc1_2: ${inc1_2}, inc2_2: ${inc2_2}`);
    
    updateFEN(inc1_1,inc2_1, inc1_2,inc2_2)
    let rows = FEN.split(' ')[0].split('/');
    let fenParts = FEN.split(' ');
    fenParts[1] = 'b';
    
    // Join the rows to form the new FEN
    FEN = rows.join('/') + ' ' + fenParts.slice(1).join(' ');
}

function updateFEN(inc1_1, inc2_1, inc1_2, inc2_2) {
    // Convert numeric column positions to letters
    const columns = 'abcdefgh';
    const fromCol = columns[inc2_1 - 1];
    const toCol = columns[inc2_2 - 1];
    
    // Convert FEN to board array
    let rows = FEN.split(' ')[0].split('/');
    let board = rows.map(row => row.replace(/\d/g, match => '1'.repeat(match)));
    
    // Find the piece using the starting position
    const piece = board[8 - inc1_1][columns.indexOf(fromCol)];
    
    // Remove the piece from the starting position
    board[8 - inc1_1] = setCharAt(board[8 - inc1_1], columns.indexOf(fromCol), '1');
    
    // Place the piece on the target position
    board[8 - inc1_2] = setCharAt(board[8 - inc1_2], columns.indexOf(toCol), piece);
    
    // Convert the board back to FEN rows
    rows = board.map(row => row.replace(/1{1,8}/g, match => match.length));
    
    // Update the turn to white
    let fenParts = FEN.split(' ');
    fenParts[1] = 'w';
    
    // Join the rows to form the new FEN
    FEN = rows.join('/') + ' ' + fenParts.slice(1).join(' ');
    console.log(FEN);
}

// Helper function to replace a character in a string at a specific index
function setCharAt(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}
async function postChessApi(data = {}) {
    // Construct the query parameters from the data object
    const queryParams = new URLSearchParams(data).toString();

    // Append the query parameters to the endpoint URL
    const url = `https://stockfish.online/api/s/v2.php?${queryParams}`;

    // Perform the GET request without a body
    const response = await fetch(url);
    const responseData = await response.json(); // Parses the JSON returned by the API

    if (responseData.success) {
        // Extract only the move part from the 'bestmove' string
        const move = responseData.bestmove.split(' ')[1];
        console.log(move, responseData, responseData.bestmove)
        translateMove(move);
    } else {
        // Handle error
        console.error('Error:', responseData.data);
    }
}

})
    
Black.addEventListener("click",() =>{


    let inc1_1 = 1
    let inc2_1 = 1
    let inc1_2 = 1
    let inc2_2 = 1
    let send1 = false
    let FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    
    inc1.addEventListener("click", () =>{
        if (inc1_1 < 8 & !send1){
            inc1_1 +=1 
            
        }
        else if (inc1_2 < 8 & send1){
            inc1_2 +=1 
            
        }
        console.log(inc1_2)
    })
inc2.addEventListener("click", () =>{
    if (inc2_1 < 8 & !send1){
        inc2_1 +=1 
        
    }
    else if (inc2_2 < 8 & send1){
        inc2_2 +=1 
        
    }
    console.log(inc2_1)
})
send.addEventListener("click", ()=>{
    if (send1){
        send1 = false
        updateFEN1(inc1_1,inc2_1, inc1_2,inc2_2)
        // Execute the function with the FEN position
        postChessApi({
            fen: FEN, // Replace 'FEN' with the actual FEN string
            depth: 15, // Adjust the depth as needed, ensuring it's an integer less than 16
            // Other parameters can be added if required by the API
        }).then(() => {
            // Additional data can be logged as needed
        });
        inc1_1 = 1
        inc2_1 = 1
        inc1_2 = 1
        inc2_2 = 1
        
        
    }
    else{
        send1 = true
        
    }
})
function translateMove1(move) {
    mov.innerText = move
    navigator.vibrate(200);
    // Map the files 'a' to 'h' to numbers 1 to 8
    const fileToNumber = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 };
    
    // Extract the starting and ending positions from the move
    const [startFile, startRank, endFile, endRank] = move.split('');
  
    // Translate files to numbers and parse ranks as integers
    let inc1_1 = parseInt(startRank, 10);
    let inc2_1 = fileToNumber[startFile];
    let inc1_2 = parseInt(endRank, 10);
    let inc2_2 = fileToNumber[endFile];
    
    // Log the values or return them as needed
    console.log(`inc1_1: ${inc1_1}, inc2_1: ${inc2_1}, inc1_2: ${inc1_2}, inc2_2: ${inc2_2}`);
    
    updateFEN1(inc1_1,inc2_1, inc1_2,inc2_2)
    let rows = FEN.split(' ')[0].split('/');
    let fenParts = FEN.split(' ');
    fenParts[1] = 'w';
    
    // Join the rows to form the new FEN
    FEN = rows.join('/') + ' ' + fenParts.slice(1).join(' ');
}

function updateFEN1(inc1_1, inc2_1, inc1_2, inc2_2) {
    // Convert numeric column positions to letters
    const columns = 'abcdefgh';
    const fromCol = columns[inc2_1 - 1];
    const toCol = columns[inc2_2 - 1];
    
    // Convert FEN to board array
    let rows = FEN.split(' ')[0].split('/');
    let board = rows.map(row => row.replace(/\d/g, match => '1'.repeat(match)));
    
    // Find the piece using the starting position
    const piece = board[8 - inc1_1][columns.indexOf(fromCol)];
    
    // Remove the piece from the starting position
    board[8 - inc1_1] = setCharAt(board[8 - inc1_1], columns.indexOf(fromCol), '1');
    
    // Place the piece on the target position
    board[8 - inc1_2] = setCharAt(board[8 - inc1_2], columns.indexOf(toCol), piece);
    
    // Convert the board back to FEN rows
    rows = board.map(row => row.replace(/1{1,8}/g, match => match.length));
    
    // Update the turn to white
    let fenParts = FEN.split(' ');
    fenParts[1] = 'b';
    
    // Join the rows to form the new FEN
    FEN = rows.join('/') + ' ' + fenParts.slice(1).join(' ');
    console.log(FEN, fenParts);
}

// Helper function to replace a character in a string at a specific index
function setCharAt(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}
async function postChessApi(data = {}) {
    // Construct the query parameters from the data object
    const queryParams = new URLSearchParams(data).toString();

    // Append the query parameters to the endpoint URL
    const url = `https://stockfish.online/api/s/v2.php?${queryParams}`;

    // Perform the GET request without a body
    const response = await fetch(url);
    const responseData = await response.json(); // Parses the JSON returned by the API

    if (responseData.success) {
        // Extract only the move part from the 'bestmove' string
        const move = responseData.bestmove.split(' ')[1];
        console.log(move, responseData, responseData.bestmove)
        translateMove1(move);
    } else {
        // Handle error
        console.error('Error:', responseData.data);
    }
}
})
