var id = null;
localStorage.getItem("workoutId")
  ? (id = localStorage.getItem("workoutId"))
  : (id = null);

var cardioHtml = ` <div class="form-group">
<label for="name">Excercise Name</label>
<input type="text" class="form-control" id="name" required name="name" />
</div>

<div class="form-group">
<label for="sets">Distance(Miles)</label>
<input
  type="number"
  class="form-control"
  id="distance"
  name="distance"
  required
/>
</div>
<div class="form-group">
<label for="sets">Duration(Minutes)</label>
<input
  type="number"
  class="form-control"
  id="duration"
  name="duration"
  required
/>
</div>`;

var resistanceHtml = `  <div class="form-group">
<label for="name">Excercise Name</label>
<input type="text" class="form-control" id="name" required name="name" />
</div>

<div class="form-group">
<label for="weight">Wieght(lbs)</label>
<input
  type="number"
  class="form-control"
  id="weight"
  required
  name="weight"
/>
</div>
<div class="form-group">
<label for="sets">Sets</label>
<input type="number" class="form-control" id="sets" required name="sets" />
</div>
<div class="form-group">
<label for="sets">Reps</label>
<input type="number" class="form-control" id="reps" required name="reps" />
</div>
<div class="form-group">
<label for="sets">Duration(minutes)</label>
<input
  type="number"
  class="form-control"
  id="duration"
  required
  name="duration"
/>
</div>`;

$("#resistance-form").html(resistanceHtml);

$("body").delegate("#exType", "change", function (e) {
  var selected = e.target.value;
  if (selected == "cardio") {
    $("#cardio-form").html("");
    $("#resistance-form").html("");
    $("#cardio-form").html(cardioHtml);
    $("#cardio-form").show();
    $("#resistance-form").hide();
  } else if (selected == "resistance") {
    $("#cardio-form").html("");
    $("#resistance-form").html("");
    $("#resistance-form").html(resistanceHtml);
    $("#cardio-form").hide();
    $("#resistance-form").show();
  }
});

$("body").delegate("#add-excercise", "click", function (e) {
  e.preventDefault();
  var name = $("#name").val();
  var duration = $("#duration").val();
  var reps = $("#reps").val();
  var sets = $("#sets").val();
  var distance = $("#distance").val();
  var type = $("#exType").val();
  var weight = $("#weight").val();
  if (id !== null) {
    update(name, duration, reps, sets, distance, type, weight, id);
  } else {
    create(name, duration, reps, sets, distance, type, weight);
  }
});
function create(
  name = "",
  duration = 0,
  reps = 0,
  sets = 0,
  distance = 0,
  type = "resistance",
  weight = 0
) {
  $.ajax({
    type: "POST",
    url: `http://localhost:5000/workout/post-workout?name=${name}&duration=${duration}&reps=${reps}&sets=${sets}&type=${type}&distance=${distance}&weight=${weight}`,
    dataType: "json",
    data: {},
    success: function (data) {
      if (data.data) {
        let newId = data.data.id;
        if (newId) {
          id = newId;
        }
        localStorage.setItem("workoutId", id);
      }
    },
  });
}

function update(
  name = "",
  duration = 0,
  reps = 0,
  sets = 0,
  distance = 0,
  type = "resistance",
  weight = 0,
  id = null
) {
  $.ajax({
    type: "POST",
    url: `http://localhost:5000/workout/update-workout?name=${name}&duration=${duration}&reps=${reps}&sets=${sets}&type=${type}&distance=${distance}&weight=${weight}&id=${id}`,
    dataType: "json",
    data: {},
    success: function (data) {
      console.log(data);
    },
  });
}

$("body").delegate("#complete", "click", function (e) {
  e.preventDefault();
  id = null;
  localStorage.removeItem("workoutId");
});
