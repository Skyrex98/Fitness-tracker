$(document).ready(function (e) {
  getAllRecords();
});
function getAllRecords() {
  $.ajax({
    type: "GET",
    url: `http://localhost:5000/workout/getAll`,
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        var totalDuration = 0;
        var totalExcercises = 0;
        var totalDistanceCovered = 0;
        var totalRepsPerformed = 0;
        var totalSetsPerformed = 0;
        var totalWeightLifted = 0;
        data.forEach((latesstRecord) => {
          latesstRecord.exercises.forEach((element) => {
            totalDuration += Number(totalDuration) + Number(element.duration);
            totalDistanceCovered +=
              Number(totalDistanceCovered) + Number(element.distance);
            totalRepsPerformed +=
              Number(totalRepsPerformed) + Number(element.reps);

            totalSetsPerformed +=
              Number(totalSetsPerformed) + Number(element.sets);
            totalDistanceCovered +=
              Number(totalDistanceCovered) + Number(element.distance);
            totalWeightLifted +=
              Number(totalWeightLifted) + Number(element.weight);

            totalExcercises++;
          });
          $("#totalDuration").html(totalDuration);
          $("#totalExcercises").html(totalExcercises);
          $("#totalSetsPerformed").html(totalSetsPerformed);
          $("#totalDistanceCovered").html(totalDistanceCovered);
          $("#totalRepsPerformed").html(totalRepsPerformed);
          $("#totalDistanceCovered").html(totalDistanceCovered);
          $("#totalWeightLifted").html(totalWeightLifted);
        });
      }
    },
  });
}

$("body").delegate("#newWorkOut", "click", function (e) {
  e.preventDefault();
  localStorage.removeItem("workoutId");
  window.location = "/exercise";
});
