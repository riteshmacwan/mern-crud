function Mydate() {
  const date = new Date();
  const today = date.toDateString();
  return today;
}

module.exports = Mydate;
