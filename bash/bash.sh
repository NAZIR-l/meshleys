#!/usr/bin/env node 
const { Command } = require('commander');
const program = new Command();
const prompts = require('prompt');
const { Amplify, Auth } = require('aws-amplify') ;


program
.command('build', 'docker  build .',{ executableFile: 'docker.sh' })
.command('login', 'login to aws', { executableFile: 'login.sh' })
.command('create', 'test to aws', { executableFile: 'create.sh' })

program.parse(process.argv);
