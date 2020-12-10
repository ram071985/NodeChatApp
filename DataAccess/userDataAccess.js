const bcrypt = require("bcrypt");
const saltRounds = 10;
const pgDataAccess = require("./pgDataAccess.js");

createUser = async (username, password) => {
  let pool = await pgDataAccess.dbConnection();

  try {
    console.log("connected to to create user");
    try {
      const hash = await bcrypt.hashSync(password, saltRounds);
      await pool.query("BEGIN");
      const checkForUser = await pool.query(
        `SELECT * FROM users WHERE username = '${username}';`
      );
      if (checkForUser.rows[0] !== undefined) {
        res.status(401).json({
          message: "username exists",
        });
      } else {
        await pool.query(
          "INSERT INTO users(username, password, is_logged_in) VALUES($1, $2, $3)",
          [username, hash, false]
        );
      }
      await pool.query("COMMIT");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {}
};

queryUsers = async () => {
  let pool = await pgDataAccess.dbConnection();
  try {
    await pool.query("BEGIN");
    await pool.query(
      "UPDATE users SET is_logged_in = false WHERE last_active_at < NOW() - INTERVAL '20 minutes';"
    );
    await pool.query("COMMIT");
    const results = await pool.query(
      "SELECT * FROM users WHERE last_active_at > NOW() - INTERVAL '20 minutes' AND is_logged_in = true;"
    );
    return results.rows;
  } catch (err) {
    console.log(err);
  } finally {
    pool.release();
  }
};

module.exports = { createUser, queryUsers };