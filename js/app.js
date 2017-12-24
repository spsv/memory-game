/*
 * Create a list that holds the cards
 * Create a list that holds all the pairs of cards
 * Create the global variables to control clicks, cards clicked, moves, matches and rating
 */
let cards = [
  "fa-cube",
  "fa-diamond",
  "fa-anchor",
  "fa-bolt",
  "fa-leaf",
  "fa-bicycle",
  "fa-paper-plane-o",
  "fa-bomb"
];
let pairs = [
  "fa-cube",
  "fa-cube",
  "fa-diamond",
  "fa-diamond",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-bomb",
  "fa-bomb"
];
let numberofClicks = 1;
let card1, card2, card3, card4;
let moves = 0;
let matches = 0;
let rating = 3;
let timer;

/**
 * @description shuffle the cards
 * @param {list} array - define the array of pairs of cards
 * @return array
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * @description Create each cards HTML
 * @param {} - none
 * @return void
 */

// Create each card's HTMl
function createCards() {
  const grid = "";
  $(".deck").html(grid);
  let cardList = shuffle(pairs);
  console.log("pairs of cards ==: " + cardList);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  });
}

/**
 * @description Find the cards that matched
 * @param {} - none
 * @return void
 */
function findCards() {
  $(".card").on("click", function() {
    // startTime();
    if ($(this).hasClass("open show")) {
      return;
    }
    if (numberofClicks == 1) {
      card1 = $(this).toggleClass("open show");
      cards.forEach(function(current_value) {
        if (card1.hasClass(current_value)) {
          card3 = current_value;
        }
      });
      numberofClicks = 2;
    } else if (numberofClicks == 2) {
      moves++;
      $(".moves").html(moves);
      card2 = $(this).toggleClass("open show");
      cards.forEach(function(current_value) {
        if (card2.hasClass(current_value)) {
          card4 = current_value;
        }
      });
      numberofClicks = 1;
      verifyCards(card3, card4);
    }
  });
}

/**
 * @description Reset the game
 * @param {} - none
 * @return void
 */
function resetGame() {
  // Show cards on click

  $(".restart").on("click", function() {
    clearInterval(timer);
    matches = 0;
    resetStars();
    init();
    startTime();
  });
}

/**
 * @description Verify if the cards are the same
 * @param {} - none
 * @return void
 */
function verifyCards(card3, card4) {
  if (card3 == card4) {
    card1.removeClass("open show");
    card1.addClass("match");
    card2.removeClass("open show");
    card2.addClass("match");
    matches = matches + 2;
    if (matches == 16) {
      $(".card").addClass("shake");
      setTimeout(function() {
        gameOver();
      }, 1000);
    }

  } else {
    card1.addClass("shake");
    card2.addClass("shake");

    setTimeout(function() {
      card1.removeClass("open show shake");
      card2.removeClass("open show shake");
    }, 500);
    defineStars();
    }
  }

/**
 * @description Define the number of stars
 * @param {} - none
 * @return void
 */
function defineStars() {
 if (moves == 10) {
    $("#star3").removeClass("open");
    rating=rating-1;
  } else if (moves == 20) {
    $("#star2").removeClass("open");
    rating=rating-1;
  }
}

/**
 * @description Game over and init again
 * @param {} - none
 * @return void
 */
function gameOver() {
  clearInterval(timer);
  alert("Congratulations. You did "+moves+" moves. "+"Your score was "+rating+" stars");
  resetStars();
  init();
  startTime();
}

/**
 * @description Start the game
 * @param {} - none
 * @return void
 */
function init() {
  createCards();
  moves = 0;
  $(".moves").html(moves);
  findCards();
}

/**
 * @description Reset the stars of the game
 * @param {} - none
 * @return void
 */
function resetStars() {
  $("#star2").removeClass("close");
  $("#star3").removeClass("close");
  $("#star2").addClass("open");
  $("#star3").addClass("open");
  $('.minutes').html("00");
  $('.seconds').html('00');
}

// Start timer on the first card click
function startTime() {
   let clicks = 0;
   $(".card").on("click", function() {
     clicks += 1;
     if (clicks == 1 ) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
     }
   });
 }


init();
startTime();
resetGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
