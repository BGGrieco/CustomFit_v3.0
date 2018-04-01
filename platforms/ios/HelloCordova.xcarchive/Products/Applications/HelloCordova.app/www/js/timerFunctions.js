/**
* INITIALISE WORKOUT SECTION
*
*/
// WORKOUT INFORMATION SECTION
// Set up variables.
var label = document.getElementById("exerciseLabel");
var button = document.getElementById("pauseButton");
var counter = document.getElementById("exerciseCounter");
var routine = document.getElementById("info");
var current = 0;
var playing = false;
var countdownTimer = null;
var workout = JSON.parse(localStorage.workout);

// LOOPING TIMER FUNCTION
// Initialise virtual trainer.
beginWorkout();

function beginWorkout()
{
  routine.innerHTML = "Routine: " + workout.title;

  // Give 3 seconds for user to prepare.
  var ready = 4;
  var readyTimer = setInterval(function()
  {
    ready--;
    document.getElementById("readyCount").textContent = ready;
    if (ready === 0)
    {
      document.getElementById("readyCount").textContent = "GO!";
      document.getElementById("readyCount").style.color = "#58a7dd";
      sounder();
    }
    else if(ready < 0)
    {
      clearInterval(readyTimer);
    }
  },1000);

  // Hide ready screen and cycle through selected workout.
  setTimeout(function()
  {
    init();
    $(".getReady").hide();
    document.getElementById("pauseButton").style.display = "block";
  }, 5000);
};

/**
* Bind loop start to click on button.
*
* @return {void}
*/
function init()
{
  loop();
  button.addEventListener("click", toggle);
}

/**
* Play / Stop exercising.
*
* @return {void}
*/
function toggle()
{
  if (playing)
  {
    pause();
  }
  else
  {
    loop();
  }
}

/**
* Reset timer. <--SHOULD BE PAUSE
*
* @return {void}
*/
function pause()
{
  playing = false;
  setLabel("Paused");
  //setCounter('--')
  if (countdownTimer)
  {
    clearTimeout(countdownTimer); // FIGURE OUT HOW NOT TO CLEAR
  }
}

// TIMER FUNCTION
/**
* Timer loop function
*
* @return {void}
*/
function loop()
{
  playing = true;

  // Change button label.
  setButtonText("Pause");

  // Get current exercise.
  var exercise = workout.exercises[current];

  // If out of the exercises Array's bounds, call 'done'.
  if (!exercise)
  {
    return done();
  }
  // Otherwise run countdown and update UI.
  countdown(exercise.duration, exercise.name, function ()
  {
    $('#timerImage').show();
    countdown(exercise.break, "Break", function ()
    {
      $('#timerImage').hide();
      // Next exercise.
      current++;
      // Re-iterate until finished.
      loop();
    });
  });
}

/**
* Exercise session is now over.
*
* @return {void}
*/
function done()
{
  pause();
  document.getElementById("feedbackScreen").style.display = "block";
}

/**
* Recursive timer function.
*
* @param  {Number} seconds
* @param  {String} label
* @param  {Function} callback
* @return {void}
*/
function countdown(seconds, label, callback)
{
  setLabel(label);
  setCounter(seconds);
  guider();
  // Set timeout to next second.
  countdownTimer = setTimeout(function ()
  {
    // Decrease seconds.
    seconds--;

    // Check whether the countdown is over - execute callback if so.
    if (seconds <= 0)
    {
      return callback();
    }

    // Call itself with a lower number otherwise.
    countdown(seconds, label, callback);
  }, 1000); // (1 sec).
}

/**
* Set counter text.
*
* @param  {Number} val
* @return {void}
*/
function setCounter(val)
{
  counter.innerHTML = val;
}

/**
* Set label text.
*
* @param  {String} text
* @return {void}
*/
function setLabel(text)
{
  if (label.textContent === text)
  {
    return;
  }
  label.innerHTML = text;
}

/**
* Set button text.
*
* @param  {String} text
* @return {void}
*/
function setButtonText(label)
{
//  button.innerHTML = label;
}

function guider()
{
  //var label = document.getElementById("exerciseLabel");
  if ($('#exerciseLabel').text() === "Break")
  {
    $('#timerImage').show();
  }
  else
  {
    $('#timerImage').hide();
  }
}

function sounder()
{
  if(label.textContent === "Break")
  {
    soundPlay("sound/long.mp3");
  }
  else
  {
    soundPlay("sound/short.mp3");
  }
}

function soundPlay(src)
{
  var audioElement = document.getElementById("player-src");
  audioElement.src = src;
  var myAudio = document.getElementById("player");
  myAudio.load();
  myAudio.play();
}