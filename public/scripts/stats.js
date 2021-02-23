$(document).ready(function () {
  getAllRecords();
});
var labelsGlobal = [];
labelsGlobal = ["Sunday", "Monday", "Tuesday"];
var exNamesGlobal = [];
var minutesDuration = [];
var poundsLifted = [];
var excerciesesPerformed = [];

var chartColors = {
  red: "rgb(255, 99, 132)",
  grey: "rgb(231,233,237)",
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var durationLineChart = {
  type: "line",
  data: {
    labels: labelsGlobal,
    datasets: [
      {
        label: "WorkOut Duration In Minutes",
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: minutesDuration,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "WorkOut Duration In Minutes",
    },
    tooltips: {
      mode: "label",
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
  },
};

var poundsLiftedBarChart = {
  type: "bar",
  data: {
    labels: labelsGlobal,
    datasets: [
      {
        label: "Pounds Lifted",
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: poundsLifted,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Pounds",
    },
    tooltips: {
      mode: "label",
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
  },
};

function getAllRecords() {
  $.ajax({
    type: "GET",
    url: `http://localhost:5000/workout/getAll`,
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        data.forEach((latesstRecord) => {
          var totalDuration = 0;
          var totalExcercises = 0;
          var totalDistanceCovered = 0;
          var totalRepsPerformed = 0;
          var totalSetsPerformed = 0;
          var totalWeightLifted = 0;
          let date = new Date(latesstRecord.day);
          labelsGlobal.push(daysOfWeek[date.getDay()]);
          latesstRecord.exercises.forEach((element) => {
            exNamesGlobal.push(element.name);
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
          minutesDuration.push(totalDuration);
          poundsLifted.push(totalWeightLifted);
        });
        console.log(minutesDuration, poundsLifted, labelsGlobal);
      }

      var ctx1 = document.getElementById("canvas").getContext("2d");
      window.myLine = new Chart(ctx1, durationLineChart);
      var ctx2 = document.getElementById("canvas2").getContext("2d");
      window.myLine = new Chart(ctx2, poundsLiftedBarChart);
    },
  });
}

/*


var ExcercisesPerformed = {
  type: "pie",
  data: {
    labels: exNamesGlobal,
    datasets: [
      {
        label: "Exercises Performed",
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: excerciesesPerformed,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Exercises",
    },
    tooltips: {
      mode: "label",
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
  },
};
*/
