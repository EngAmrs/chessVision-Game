//Board
const board = document.getElementById('board');

//Info
let counter = Number(document.getElementById("counter").textContent);
const start_button = document.getElementById('start-button');
const info_head = document.getElementById("head").getElementsByTagName("h1")[0];
Check_right = document.getElementById('checks').getElementsByTagName('span')[0]
Check_wrong = document.getElementById('checks').getElementsByTagName('span')[1]



//Score Counter
const score = function (event) {
     //checks
     if(event.target.getAttribute("position") === info_head.textContent){
        Check_right.innerHTML += "  " + "("+ info_head.textContent + ")";
         counter++;
         document.getElementById("counter").innerHTML = counter;

         var r = document.getElementById("myAudio2"); 
         function playAudio2() { 
          r.play(); 
          r.volume = 0.1;
        } 
        playAudio2();
     }else{
    
    var x = document.getElementById("myAudio"); 

    function playAudio() { 
      x.play(); 
      x.volume = 0.1;
    } 
    playAudio();
        Check_wrong.innerHTML += "  " + "("+ info_head.textContent + ")";
     }

    // Getting random td
        let Board_cells = []; 
        for( i = 0; i <= 64; i++){

            Board_cells[i] = i;
        }
        Board_cells = Board_cells[Math.floor(Math.random()*Board_cells.length)];
        const cell = board.getElementsByTagName('td')[Board_cells];

        info_head.textContent = cell.getAttribute("position");
  };

 



//Start button

    const start = function (){

       //Start_button (changes)
       start_button.style.pointerEvents = "none";
       start_button.getElementsByTagName("button")[0].style.display = "none";
       start_button.getElementsByTagName("button")[1].style.display = "initial";

   
    //Start game
      setTimeout(() => {
          Check_right.innerHTML = "";
          Check_wrong.innerHTML = "";
          counter = 0;
          document.getElementById("counter").innerHTML = counter;
          
          //Start game (board)
          board.addEventListener('click', score);
          board.style.pointerEvents = "";

          //First vision
          info_head.textContent = board.getElementsByTagName('td')[5].getAttribute("position");

          //Timer
          timer = 30
          var x =setInterval( function (){
              
            countDown = timer - 1;
            timer = countDown;
            document.getElementsByClassName("timer")[0].innerHTML = "0:" + countDown;

            if(timer < 10)
              document.getElementsByClassName("timer")[0].innerHTML = "0:0" + countDown;
              else
              document.getElementsByClassName("timer")[0].innerHTML = "0:" + countDown;


            if(countDown == 0){
        
              clearInterval(x);

              //End game
              start_button.style.pointerEvents = "";
              start_button.getElementsByTagName("button")[0].style.display = "initial";
              start_button.getElementsByTagName("button")[1].style.display = "none";
              
              board.style.pointerEvents = "none";
              info_head.innerHTML = "Final Score is: " + counter;
            }
        
          },1000);


      //Hint guy
       const support  = () => {
        if (document.getElementById("Mode").value == "Qhint") {
          const hint_start = setInterval(()=>{
            i = 0
            board.querySelectorAll('td').forEach(()=>{
              board.getElementsByTagName('td')[i].innerHTML += "<img class=\"here\" src=\"../Images/Screenshot 2023-01-17 122525.png\" width=\"50%\" style=\"position: absolute; top: 25%; left: 25%; display: none\">"
  
              if(board.getElementsByTagName('td')[i].getAttribute("position") == info_head.textContent){
                board.getElementsByTagName('td')[i].getElementsByTagName('img')[0].style.display = "block";
              }
              i++
            
            })
            const hint_end = setInterval(()=>{
              board.getElementsByClassName("here")[0].remove();        
            }, 200)
          
            if(timer === 0){
            clearInterval(hint_start)
            clearInterval(hint_end)
            }
          }, 5000)
        }
      };
        document.getElementById("Mode").addEventListener('change', support)
      
      }, 3000)

      //Ready phase
      con = 3;
      const x = setInterval(()=>{

        document.getElementById("board").getElementsByTagName("h2")[0].textContent = con;
        document.getElementById("board").getElementsByTagName("h2")[0].style.display = "block"
        if(con <= 0){
          document.getElementById("board").getElementsByTagName("h2")[0].style.display = "none"
          document.getElementById("board").getElementsByTagName("img")[0].style.display= "block"
          setTimeout(()=>{
            document.getElementById("board").getElementsByTagName("img")[0].style.display= "none"
            clearInterval(x);

          }, 750)
        }
        con--;


      }, 750)
    }

 
  start_button.addEventListener('click', start);



  //Switch Color

  const table_rotate  = () => {
    if (document.getElementById("color").value == "black") {
      document.getElementsByTagName("table")[0].style.transform = 'rotate(180deg)'
    }else{
      document.getElementsByTagName("table")[0].style.transform = 'initial'
    
    }
  };

  document.getElementById("color").addEventListener('change', table_rotate)
  

    



 