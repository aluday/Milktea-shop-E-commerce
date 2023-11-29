const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = async (payload) => {
  // console.log(payload);
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.JWT_EXP }
  );

  return access_token;
};

const generateRefreshToken = async (payload) => {
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

const getRefreshToken = async (token) => {
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

        const access_token = await generateAccessToken({
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
  generateAccessToken,
  generateRefreshToken,
  getRefreshToken,
};
