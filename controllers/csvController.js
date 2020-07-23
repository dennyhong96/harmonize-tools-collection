exports.getCsvTemplate = (req, res, next) => {
  res.download(`../csv/template.csv`);
};
