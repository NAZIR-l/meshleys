import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { Amplify } from 'aws-amplify';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const  awsconfig = require('./aws-exports');

Amplify.configure(awsconfig);


global['fetch'] = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Presence API AWS Cognito Integration')
    .setDescription('AWS Cognito integration with Nest.js app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: '*',
    optionsSuccessStatus: 204
  });

   app.listen(8000,()=>{
    console.log("Listening");
   });
}
bootstrap();
