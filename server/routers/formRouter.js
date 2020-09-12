const router = require("express").Router();

const jwtAuth = require("../middlewares/jwtAuth");

const { createNdaForm, getUserForms } = require("../controllers/ndaController");

router.route("/nda").get(jwtAuth, getUserForms).post(jwtAuth, createNdaForm);

module.exports = router;
