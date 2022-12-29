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
      name: 'commit',
      warning: 'Username must be only letters, spaces, or dashes'
    },{
      name: 'HTTPS',
      warning: 'Username must be only letters, spaces, or dashes'
    },
  ];
        prompts.start();

          exec(`git add .`, (err, stdout) => {  
                    if (err) {  
                        console.error(err);  
                        return;  
                    }      
                    else {
                             prompts.get(properties, async function (err, result) {
                                if (err) {
                                    return onErr(err);
                                }
                                else {
                                    await exec(`git commit -m "${result.commit}"`,async (err, stdout) => {  
                                            if (err) {  
                                                console.error(err);  
                                                return;  
                                            }      
                                            else {
                                                await exec(`git push ${result.HTTPS}`, (err, push) =>{
                                                    if(err){
                                                        console.log(err);
                                                        return ;
                                                    }
                                                    else{
                                                        console.log(push);
                                                        return push;

                                                    }
                                                 })  
                                            }
                                            });  
                                    }
                                });
                    }
                    }); 
         


  

        function onErr(err) {
        console.log(err);
        return 1;
        }
program.parse();