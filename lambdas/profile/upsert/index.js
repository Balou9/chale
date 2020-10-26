const { DynamoDB } = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamodb = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
})

module.exports.handler = async function handler (event, context) => {
  console.log("DEBUG:::", event)

  if (!event.body || !event.body.length) {
    return { statusCode: 400 }
    // callback(null, response(400))
  } else {

    const params = {
      TableName: process.env.PROFILE_TABLE_NAME,
      Item: {
        "profile_id": uuidv4(),
        "profile": event.body
      }
    }

    // dynamodb.put(params, function (err, data) {
    //   if (err) callback(err)
    //   return { statusCode: 204 }
    //   else callback(null, response(204))
    // })

    try {
      await dynamodb.put(params).promise()
      return { statusCode: 204 }
    } catch (err) {
      return err
    }
  }

}

function response (status) {
  return {
    "statusCode": status
  }
}
