const { list } = require('aws-amplify/storage');
const { Amplify } = require('aws-amplify');
const outputs =  require('./amplify_outputs.json');

Amplify.configure(outputs);

console.log("publish is running...");

async function publish() {
  try {
    const result = await list({
      path: 'photos/',
      options: {
        listAll: true,
        bucket: {
          bucketName: 'amplify-testamplify-arcsinfote-firstbucketb40a1e24-0yrkex7vkge0',
          region: 'us-east-1',
        },
      },
    });

    console.log("result", result);
  } catch (error) {
    console.error("Error listing files:", error);
  }
}

publish();