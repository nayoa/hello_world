# Hello World

[![CircleCI](https://circleci.com/gh/nayoa/hello_world.svg?style=svg)](https://circleci.com/gh/nayoa/hello_world)

Hello World is a AWS Lambda function written in `node.js` that is triggered via AWS API Gateway. The function turns the string `Hello World on <current_date_and_time>` into an object `/$ENVIRONMENT_NAME/hello.txt` and uploads the file to the S3 bucket `hello-world-tech-test`. All AWS resources are provisioned in the `eu-west-1 (Ireland)` region and uses the [Serverless Framework](https://serverless.com/).

## Getting Started

```bash
$ git clone git@github.com:nayoa/hello_world.git
$ export AWS_ACCESS_KEY_ID=<YOUR AWS CREDENTIALS>
$ export AWS_SECRET_ACCESS_KEY=<YOUR AWS CREDENTIALS>
$ export ENV=<ENVIRONMENT_NAME>
```

To upload to an S3 bucket of your choice, [amend the bucket name in the `s3Params` variable](handler.js). In addition, you need to amend the IAM permissions in the [serverless.yml](serverless.yml). Change the S3 ARN to your S3 bucket ARN. Make sure that you keep `/*` at the end of the ARN.

### Prerequisites

```bash
$ npm install
$ npm install -i -g serverless
```

## Running the tests

```bash
$ serverless invoke local --function hello
```

In the future, we want to improve the tests using [Jest](https://jestjs.io/)

**Expected output:**

```json
Upload Successful

{
    "statusCode": 200,
    "body": "\"Upload Successful\""
}
```

## Deployment

Change `$ENV` name to choice of environment to deploy to

```bash
$ serverless deploy
```

The deployment will create or amend a cloudformation stack with the new changes.

**Expected output:**
```yaml
..............
Serverless: Stack update finished...
Service Information
service: helloWorld
stage: $ENV
region: eu-west-1
stack: helloWorld-$ENV
resources: 10
api keys:
  None
endpoints:
  GET - https://xstmyycz1j.execute-api.eu-west-1.amazonaws.com/$ENV/hello
functions:
  hello: helloWorld-$ENV-hello
layers:
  None
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

You are then able to send a `GET` request to the endpoint displayed. If working correctly, the reponse expected is `Upload Successful`.

To automate the deployment, a CircleCI pipeline it attached to this repository. When a change is made to the `deploy` branch the tests are triggered and staging is deployed. When a change is made to the `master` branch, the master pushes to production with manual approval.

## Built With

* [Serverless Framework](https://serverless.com/) - The serverless framework used
* [node.js](https://nodejs.org/en/) - The language the lambda function is written in
* [CircleCI Pipelines](https://circleci.com/) - CI/CD Tool used

## Authors

* Nayo Akinyele
