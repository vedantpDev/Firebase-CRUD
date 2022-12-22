const express = require("express");
const app = express();
const PORT = 4545;
const db = require("./config");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/addData", async (req, res) => {
  const { name, emal, contact } = req.body;
  try {
    id = emal;
    const studentData = {
      name: name,
      emal: emal,
      contact: contact,
    };
    const stdData = await db.collection("Student Data").doc().set(studentData);
    res.send(stdData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/read/all/data", async (req, res) => {
  try {
    const studentRef = db.collection("Student Data");
    const response = await studentRef.get();
    const responseArr = [];
    response.forEach((doc) => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
});

app.get("/read/:id", async (req, res) => {
  try {
    const studentRef = db.collection("Student Data").doc(req.params.id);
    const response = await studentRef.get();
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const studentRef = db.collection("Student Data").doc(req.params.id);
    const response = await studentRef.update({
      name: "Frst Name",
    });
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const studentRef = await db
      .collection("Student Data")
      .doc(req.params.id)
      .delete();
    res.status(200).send(studentRef);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, console.log("App Running on ", PORT));
