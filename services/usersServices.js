import bcrypt from "bcrypt";

import User from "../models/usersModel.js";

export const updateUserInfo = (id, data) =>
  User.findOneAndUpdate(id, data, {
    select: "email name gender waterRate avatarURL",
  });

export const updateWaterRate = (id, data) =>
  User.findOneAndUpdate(id, data, { select: "waterRate" });

export const updateUserAvatar = (id, data) =>
  User.findOneAndUpdate(id, { avatarURL: data }, { select: "avatarURL" });

export const isSamePassword = async (password, hashPassword) =>
  await bcrypt.compare(password, hashPassword);

export const hashNewPassword = async (newPassword) =>
  await bcrypt.hash(newPassword, 10);
