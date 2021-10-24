require("dotenv").config();
const express = require("express");
const path = require("path");
const { getIntentList } = require("./services/dialogFlowIntent");
const server = express();
const port = process.env.PORT;

/**
 * Node serve the files for our built React app
 */
server.use(express.static(path.resolve(__dirname, "../react-client/build")));

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
 * All other GET requests not handled before will return our React app
 */
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../react-client/build", "index.html"));
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
