#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/api-stack";

const app = new cdk.App();

new ApiStack(app, "TsLambdaStarter", {
  env: { account: "021934453023", region: "us-east-2" },
});
