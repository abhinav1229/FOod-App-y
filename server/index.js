const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://abhinav1229:abhinav1229@abhinav.pkmqgjl.mongodb.net/mernapp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  // getting whatever came from the Axios (frontend)
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
    res.send("Food Saved");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  // getting whatever came from the Axios (frontend)
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  // params is used to get the request from parameters {link}
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.get("/read", (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("OK Everything is fine...");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
