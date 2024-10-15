const functions = require('@google-cloud/functions-framework');
const { VertexAI } = require('@google-cloud/vertexai');

const MODEL_NAME = "gemini-1.5-flash-001";
const PROJECT_ID = "<YOUR-PROJECT-NAME>";
const LOCATION = "<YOUR GCP REGION>";

const vertexAI = new VertexAI({
  project: PROJECT_ID,
  location: LOCATION,
});

const model = vertexAI.getGenerativeModel({
  model: MODEL_NAME,
});

functions.http('helloHttp', async (req, res) => {
  console.log(JSON.stringify(req.body));
  const request = JSON.stringify(req.body);

  try {
    const result = await model.generateContent(request);
    const response = result.response;
    res.json({ content: response, role: 'ai' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Error processing request');
  }
});
