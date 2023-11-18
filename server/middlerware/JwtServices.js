const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();

const genneralAccessToken = async (payload) => {
  // console.log(payload);
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  // console.log(payload);
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_token;
};

const refreshTokenService = async (token) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log(token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (error, user) => {
        if (error) {
          resolve({
            status: "false",
            message: "The authentication",
          });
        }

        const access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        // console.log(access_token);
        resolve({
          status: "true",
          message: "ok",
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenService,
};
