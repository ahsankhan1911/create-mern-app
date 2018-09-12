#!/usr/bin/env node
const program = require('commander');
const cmd = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf')


program
.version('1.0.0')
.description('CLI to install MERN app');

program
      .command('create <dirname>')
      .description('command to create your new mern app')
      .action((dirname) => {
          console.info("Getting files from git...")
          cmd.exec('git clone https://github.com/ahsankhan1911/mern-App-without-cra.git', (err, stdout, stderr) => {
              if(err) {
                  console.log(err)
              }
              else {
                  console.info('Performing some further procedures...')
                  fs.rename(`${process.cwd()}/mern-App-without-cra`,`${process.cwd()}/${dirname}` ,(err) => {
                  if(err) {
                      console.log(err)
                  }
                  else {
                      rimraf(`${process.cwd()}/${dirname}/.git`, (err) => {
                          if(err) {
                              console.error(err)
                          }

                          else {
                              console.log("Your app is created !! :-)")
                          }
                      })
                  }
                  })                  
              }
          })
           
       })
program.parse(process.argv)