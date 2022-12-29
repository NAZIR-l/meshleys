#!/usr/bin/env node 
const { Command } = require('commander');
const program = new Command();
const prompts = require('prompt');
const { Amplify, Auth } = require('aws-amplify') ;
const awsconfig = require('./src/aws-exports.ts');
Amplify.configure(awsconfig);


program.command('aws')



      prompts.start();
        const properties = [
          {
            name: 'username',
            warning: 'Username must be only letters, spaces, or dashes'
          },
          {
            name: 'password',
            hidden: true
          }
        ];
        prompts.get(properties, async function (err, result) {
        if (err) {
            return onErr(err);
        }
        const user = await Auth.signIn(result.username, result.password)
        const token = user.signInUserSession.idToken.jwtToken
        console.log(token)

        });

        function onErr(err) {
        console.log(err);
        return 1;
        }
      program.parse();

