import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [foodName, setFoodName] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("https://icmblm-3001.preview.csb.app/read")
      .then((response) => {
        setFoodList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToList = () => {
    Axios.post("https://icmblm-3001.preview.csb.app/insert", {
      foodName: foodName,
      days: days,
    }).then((response) => {
      console.log(response);
    });
  };

  const updateFood = (id) => {
    Axios.put("https://icmblm-3001.preview.csb.app/update", {
      id: id,
      newFoodName: newFoodName,
    }).then((response) => {
      if (response.data === "update") {
        alert("your updated data is saved");
      }
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`https://icmblm-3001.preview.csb.app/delete/${id}`);
  };

  return (
    <div className="App">
      <h1> CRUD App with MERN</h1>
      <label> Food Name: </label>
      <input type="text" onChange={(e) => setFoodName(e.target.value)} />

      <label> Days Since you Ate it: </label>
      <input type="number" onChange={(e) => setDays(e.target.value)} />
      <button onClick={addToList}> Add to List </button>

      <h1> Food List </h1>
      {foodList.map((val, index) => {
        return (
          <div key={index}>
            <h2> {val.foodName} </h2>
            <h3> {val.daysSinceIAte} </h3>
            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(e) => setNewFoodName(e.target.value)}
            />
            <button onClick={() => updateFood(val._id)}> Update </button>
            <button onClick={() => deleteFood(val._id)}> Delete </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
