const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(express.json());

router.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, error: "Invalid input data" });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        if (item >= "a" && item <= "z") {
          if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    });

    const response = {
      is_success: true,
      user_id: "gayathri",
      email: "gayathri.2021a@vitstudent.ac.in",
      roll_number: "21BCE5010",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

router.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);
