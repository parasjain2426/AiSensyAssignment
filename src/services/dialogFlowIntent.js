const dialogflow = require("@google-cloud/dialogflow");

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient();

module.exports.getIntentList = async (projectId) => {
  // Construct request

  // The path to identify the agent that owns the intents.
  const projectAgentPath = intentsClient.projectAgentPath(projectId);

  //payload for listing intents under /agents
  const request = {
    parent: projectAgentPath,
  };

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  return response;
};
