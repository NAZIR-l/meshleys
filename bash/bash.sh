#!/usr/bin/env node 
const { Command } = require('commander');
const program = new Command();
const prompts = require('prompt');
const { Amplify, Auth } = require('aws-amplify') ;


program
.command('build', 'docker  build .',{ executableFile: 'bash2.sh' })
.command('login', 'login to aws', { executableFile: 'bash3.sh' })
.command('create', 'test to aws', { executableFile: 'test.sh' })

program.parse(process.argv);
