function error(req, res) {
  res.render("error", { error: "Something went wrong!" });
}

module.exports = { error };
