require("dotenv").config();
const express = require("express");
const { getIntentList } = require("./services/dialogFlowIntent");
const server = express();
const port = process.env.PORT;

/**
 * Get Request to initial endpoint
 */
server.get("/", (req, res) => {
  res.send(responseFormatter(false, {}, "Server Running Successfully!"));
});

/**
 * Get-Request to getIntentList endpoint
 */
server.get("/getIntentList/:id", async (req, res) => {
  let projectId = req.params["id"];
  if (projectId) {
    try {
      let result = await getIntentList(projectId);
      res.send(
        responseFormatter(false, result, "Intent List Fetched Successfully!")
      );
    } catch (err) {
      res.send(responseFormatter(true, {}, err.message));
    }
  } else {
    res.send(responseFormatter(true, {}, err.message));
  }
});

/**
 * Server Port
 */
server.listen(port, () => {
  console.log(`Ai-Sensy Assignment Server running on ${port}`);
});

/**
 * Method to prepare a response object
 * @param {Boolean} isError | Status Type
 * @param {Object} payload | Payload(Data) to be send
 * @param {String} message | Optional message
 * @returns Respponse-Object to be send
 */
const responseFormatter = (isError = false, payload = {}, message = "") => {
  if (isError) {
    return {
      status: "ERROR",
      data: {},
      message,
    };
  }
  return {
    status: "SUCCESS",
    data: payload,
    message,
  };
};
