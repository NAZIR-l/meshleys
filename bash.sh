#!/usr/bin/env node 
const { Command } = require('commander');
const program = new Command();
const prompts = require('prompt');
const { Amplify, Auth } = require('aws-amplify') ;
const awsconfig = require('./src/aws-exports.ts');
Amplify.configure(awsconfig);


program
.command('build', 'docker  build . ', { executableFile: 'bash2' })
.command('login', 'login to aws', { executableFile: 'bash3.sh' })
.command('test', 'test to aws', { executableFile: 'test.sh' })

program.parse(process.argv);
