//getting router
const router = require("express").Router();

//getting model
const Workout = require("../models/workout");

router.get("/", async (req, res) => {
  try {
    const data = await Workout.find({});

    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/post-workout", async (req, res) => {
  const { type, name, duration, distance, weight, reps, sets } = req.query;
  const body = {
    type,
    name,
    duration,
    distance,
    weight,
    reps,
    sets,
  };
  try {
    const data = await Workout.create({});

    const updated = await Workout.findByIdAndUpdate(
      data.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    );
    const workout = await Workout.findById(data.id);
    res.json({ message: "Added Successfully", data: workout });
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
});

router.post("/update-workout", async (req, res) => {
  const { type, name, duration, distance, weight, reps, sets, id } = req.query;
  const body = {
    type,
    name,
    duration,
    distance,
    weight,
    reps,
    sets,
  };
  try {
    const updated = await Workout.findByIdAndUpdate(
      id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    );
    const workout = await Workout.findById(id);
    res.json({ message: "Added Successfully", data: workout });
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const records = await Workout.find({}).sort({
      $natural: -1,
    });
    res.json(records);
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
});
module.exports = router;
