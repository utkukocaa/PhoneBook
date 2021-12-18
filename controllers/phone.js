const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Phone = require("../models/Phone");

const getAllPhones = async (req, res) => {
  const phones = await Phone.find({ createdBy: req.user.userId }).sort("name");
  res.status(StatusCodes.OK).json({ counts: phones.length, phones });
};

const getPhone = async (req, res) => {
  const {
    user: { userId },
    params: { id: phoneId },
  } = req;

  const phone = await Phone.findOne({
    _id: phoneId,
    createdBy: userId,
  });
  if (!phone) {
    throw new NotFoundError(`No phone with id ${phoneId}`);
  }
  res.status(StatusCodes.OK).json({ phone });
};

const createPhone = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const phone = await Phone.create(req.body);
  res.status(StatusCodes.CREATED).json({ phone });
};

const updatePhone = async (req, res) => {
  const {
    body: { name, phoneNumber },
    user: { userId },
    params: { id: phoneId },
  } = req;

  if (name === "" || phoneNumber === "") {
    throw new BadRequestError("Name or Phone number fields can not be empty");
  }
  const phone = await Phone.findByIdAndUpdate(
    { _id: phoneId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!phone) {
    throw new NotFoundError(`No phone with id ${phoneId}`);
  }
  res.status(StatusCodes.OK).json({ phone });
};

const deletePhone = async (req, res) => {
  const {
    user: { userId },
    params: { id: phoneId },
  } = req;

  const phone = await Phone.findOneAndRemove({
    _id: phoneId,
    createdBy: userId,
  });
  if (!phone) {
    throw new NotFoundError(`No phone with id ${phoneId}`);
  }
  res.status(StatusCodes.OK).json({ phone });
};

module.exports = {
  getAllPhones,
  getPhone,
  createPhone,
  updatePhone,
  deletePhone,
};
