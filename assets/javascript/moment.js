
var database = firebase.database();

$("#add-train").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#train-frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);
    console.log(trainName.name);
    console.log(trainDestination.destination);
    console.log(trainTime.time);
    console.log(trainFrequency.frequency);

    alert("Train successfully added");

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");
});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;


    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);


    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);


    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference: " + diffTime);


    var tRemainder = diffTime % trainFrequency;
    var tMinutesTillTrain = trainFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});