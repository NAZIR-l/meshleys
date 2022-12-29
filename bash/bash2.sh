#!/usr/bin/env node 
const { exec } = require('child_process');  
const { Command } = require('commander');
const spawn = require('child_process').spawn;
const program = new Command();
const prompts = require('prompt');
program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program
.command('.') 


 const properties = [
    {
      name: 'username',
      // validator: /^[a-zA-Z\s-]+$/,
      warning: 'Username must be only letters, spaces, or dashes'
    },
    {
      name: 'password',
      hidden: false
    }
  ];
        prompts.start();
          prompts.get(properties, async function (err, result) {
        if (err) {
            return onErr(err);
        }
        else {
               await exec(`docker login -u ${result.username} -p ${result.password}`, (err, stdout) => {  
                    if (err) {  
                        console.error(err);  
                        return;  
                    }      
                    else {
                        spawn('docker', ['build', '.'], { stdio: 'inherit' })
                        console.log(stdout);    
                    }
                    });  
               }
        });


  

        function onErr(err) {
        console.log(err);
        return 1;
        }
program.parse();