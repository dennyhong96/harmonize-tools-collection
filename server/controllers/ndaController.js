const NdaForm = require("../model/NdaForm");

exports.createNdaForm = async (req, res, next) => {
  try {
    const user = req.user;
    const ndaForm = await NdaForm.create({
      userId: user.id,
      ...req.body,
    });

    console.log(ndaForm);
    res.status(201).json({
      status: "success",
      data: { ndaForm },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      data: {
        message: "Something went wrong",
      },
    });
  }
};

exports.getUserForms = async (req, res, next) => {
  try {
    const userForms = await NdaForm.find({ userId: req.user.id });
    res.status(200).json({
      status: "success",
      data: { userForms },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      data: {
        message: "Something went wrong",
      },
    });
  }
};
