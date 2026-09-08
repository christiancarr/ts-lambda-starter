import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function, bundled from TypeScript by esbuild at deploy time
    const fn = new NodejsFunction(this, "Api", {
      entry: "src/handler.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_22_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
    });

    // Public HTTPS endpoint, no API Gateway needed (stays in always-free)
    const url = fn.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    new cdk.CfnOutput(this, "ApiUrl", { value: url.url });
  }
}
