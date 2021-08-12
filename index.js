var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedpattern = [];
// $(document).one("keydown",function(){
//   nextseq();
// })
//when the key is first pressed
var level = 0;
var started = false;
$(document).keydown(function() {
  if (!started) {
    nextseq();
    started = true;
  }
});

//buttonclicks
$(".btn").click(function() {
  // var userchosen= this.id;   //this stores the color(class)of the button clicked
  // animatepress(this);
  var userchosen = $(this).attr('id');
  clickedpattern.push(userchosen);
  animatepress(userchosen);
  var btnsound = new Audio('sounds/' + userchosen + ".mp3");
  btnsound.play();
  checkanswer(clickedpattern.length - 1);
  // checkanswer(clickedpattern.lastIndexOf(userchosen));
});

function nextseq() {
  level += 1; //level++
  clickedpattern = [];
  $("h1").text("level " + level);
  var randomnumber = Math.round(Math.random() * 3);
  var randomcolor = buttonColors[randomnumber];

  var audio = new Audio("sounds/" + randomcolor + ".mp3");
  gamePattern.push(randomcolor);

  $("#" + randomcolor).fadeOut(100).fadeIn(100);
  audio.play();
};

// function playsound(name){
//   $("#"+name).click(function(){
//     var audio=new Audio("sounds/"+name+".mp3");
//     audio.play();                          //plays a sound related to the random button
//   })
// };

function animatepress(currentcolor) {
  $("#" + currentcolor).addClass('pressed');
  setTimeout(function() {
    $("#" + currentcolor).removeClass('pressed');
  }, 100)
}

function checkanswer(currentlevel) {
  // check if the last button is right
  if (clickedpattern[currentlevel] === gamePattern[currentlevel]) {
    if (clickedpattern.length === gamePattern.length) {
      setTimeout(function() {
        nextseq();
      }, 1000);
      console.log("sucess");
    }
  }
  //else,wrong and trigger gameover
  else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);
    $("h1").text('game over, press any key to startover');
    $("h2").text('press any key to startover');
    startover();
  }
}
//resetting every variable
function startover() {
  level = 0;
  gamePattern = [];
  started = false;
}
