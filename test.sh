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
                        console.log("1");
                        console.error(err);  
                        return;  
                    }      
                    else {
                        console.log("2");

                             prompts.get(properties, async function (err, result) {
                                if (err) {
                                    console.log("3");
                                    return onErr(err);
                                }
                                else {
                        console.log("4");

                                    await exec(`git commit -m "${result.commit}"`,async (err, stdout) => {  
                                            if (err) {  
                                                console.log("5");
                                                console.error(err);  
                                                return;  
                                            }      
                                            else {
                        console.log("6");

                                                await exec(`git push https://github.com/NAZIR-l/meshleys.git`, (err, push) =>{
                                                    if(err){
                                                        console.log("7");
                                                        console.log(err);
                                                        return ;
                                                    }
                                                    else{
                        console.log("8");

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