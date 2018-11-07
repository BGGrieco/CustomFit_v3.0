
if (typeof cordova !== "undefined")
{
  document.addEventListener("deviceready", onDeviceReady, false)
}
else
{
  onDeviceReady();
}

function onDeviceReady()
{
  var workouts = JSON.parse(localStorage.workouts);

  var exercises = ["Push Ups", "Plank", "Sit Ups", "Leg Ups", "Russian Twists", "Back Raises", "Burpees", "Mountain Climbers"];

  function createCards(indexNumber, exercise, image)
  {
    var delay = indexNumber * 0.05;
    return `
    <div class="exercise card" style="animation-delay: ${delay}s">
      ${image}
      <div class="h3Container">
        <h3>${exercise}</h3>
      </div>
    </div>
    `
  }

  exercises.forEach(function(a, i)
  {
    var exercise = a;
    var indexNumber = i;
    var image;

    switch(exercise)
    {
      case "Push Ups":
        image = "<img src='images/pushUps.png' width='110' alt='' />";
        break;

      case "Plank":
        image = "<img src='images/plank.png' width='110' alt='' />";
        break;

      case "Sit Ups":
        image = "<img src='images/sitUps.png' width='90' style='top: 25px;' alt='' />";
        break;

      case "Leg Ups":
        image = "<img src='images/legUps.png' width='90' style='top: 15px;' alt='' />";
        break;

      case "Russian Twists":
        image = "<img src='images/twists.png' width='110' style='top: 25px;' alt='' />";
        break;

      case "Back Raises":
        image = "<img src='images/backRaises.png' width='115' alt='' />";
        break;

      case "Burpees":
        image = "<img src='images/burpee.png' width='80' style='top: 20px;' alt='' />";
        break;

      default:
        image = "<img src='images/climber.png' width='110' alt='' />";
    }
    $("#exerciseContainer").append(createCards(indexNumber, exercise, image));
  });

  // NEW ROUTINE MODIFICATION
  // Store slider inputs.
  var time = document.getElementById("determineTime");
  var rest = document.getElementById("determineRest");
  var title = "Unnamed Routine";

  // Create new routine.
  $("#newExerciseConfirm").click(function()
  {
    var timeValue = time.value;
    var restValue = rest.value;
    var name = $("#infoP").text();
    var addExercise =
    {
      "name": name,
      "duration": timeValue,
      "break": restValue
    };

    var newRoutine =
    {
      "title": title,
      "exercises":
      [
        {
          "name": name,
          "duration": timeValue,
          "break": restValue
        }
      ]
    };
  });

  // NEW ROUTINE MODIFICATION
  // Store slider inputs.
  var time = document.getElementById("determineTime");
  var rest = document.getElementById("determineRest");
  var title = "Unnamed Routine";

  // Create new routine.
  $("#newExerciseConfirm").click(function()
  {
    var timeValue = time.value;
    var restValue = rest.value;
    var name = $("#infoP").text();
    var addExercise =
    {
      "name": name,
      "duration": timeValue,
      "break": restValue
    };

    var newRoutine =
    {
      "title": title,
      "exercises":
      [
        {
          "name": name,
          "duration": timeValue,
          "break": restValue
        }
      ]
    };

    if (localStorage.makingNew === "false")
    {
      localStorage.newRoutine = JSON.stringify(newRoutine);
    }
    else
    {
      var arr = JSON.parse(localStorage.newRoutine);
      arr.exercises.push(addExercise);
      localStorage.newRoutine = JSON.stringify(arr);
    }
  });

  // Compile Routine Overview List.
  var newObj = JSON.parse(localStorage.newRoutine);
  var arr = newObj.exercises;
  var newTitle = newObj.title;
  arr.forEach(function(i)
  {
    $("#newOverviewList").append("<li><div class='overviewCard'><div class='overviewCardInfo' duration='" + i.duration + "' break='" + i.break + "'>\n\
    <h3>" + i.name + "</h3><p>" + i.duration + " sec.</p><p id='right'>Break: " + i.break + " sec.</p>\n\
    </div><div class='overviewCardOptions'><img src='images/thrash.png' width='23' alt='' /></div></div></li>");
  });

  // Set name of new routine.
  $("#newChangeName").keydown(function()
  {
    if (event.keyCode === 13)
    {
      var newName = $(this).val()
      $(this).css("display", "none");
      $(this).attr("value", newName);
      $("#newOverviewTitle").css("display", "block");
      $("#newOverviewTitle").text(newName);
      localStorage.newTitle = JSON.stringify(newName);
    }
  });

  // Miscellaneous functions.
  var handleThrashClick = function(event)
  {
    $(event.currentTarget).parents("li").toggleClass("toDelete");
  };

  $(document).on("click", ".overviewCardOptions", handleThrashClick);
  $("#newOverviewTitle").html(newTitle);
  $("#loadingSquare").css("display", "none");
  $("#confirm").click(function()
  {
    window.location.href = "routines.html";
  });

  // Push new routine to Firebase.
  // var firebaseRef = firebase.database().ref();
  // var createdExercise = JSON.parse(localStorage.newRoutine);
  // var i = workouts.length;
  // $("#save").click(function()
  // {
  //   createdExercise.title = localStorage.newTitle;
  //   console.log(createdExercise.title);
  //   firebaseRef.child("workouts").child(i).push(createdExercise);
  // });
}
