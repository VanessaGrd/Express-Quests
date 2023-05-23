const database = require("./database");

const getUsers = (req, res) => {
  let sqlUser = "select * from users";
  const sqlValuesUsers = [];

  if (req.query.language != null) {
    sqlUser += " where language = ?";
    sqlValuesUsers.push(req.query.language);
  }
  if (req.query.city != null) {
    sqlUser += " and cityt = ?";
    sqlValuesUsers.push(req.query.city);
  }
else if (req.query.city != null) {
  sqlUser += " where city = ?";
  sqlValuesUsers.push(req.query.city);
}
    database
      .query("select * from users")
      .then(([users]) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
  
  const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.status(200).json(users[0]);;
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
  
    database
      .query(
        "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  };
  const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "update users set firstname=?, lastname=?, email=?, city=?, language=?",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
      });
  };
  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from movies where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the movie");
      });
  };
  module.exports = {
    getUsers,
    getUsersById,
    postUsers,
    updateUsers,
    deleteUser
  };