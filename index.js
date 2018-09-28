#!/usr/bin/env node
const program = require('commander');
const cmd = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf')

program
    .version('1.0.2')
    .description('CLI to install MERN app');

program
    .command('create <dirname>')
    .description('command to create your new mern app')
    .action((dirname) => {
        console.info()

        console.info("Getting files from git...")
        console.info()
        cmd.exec('git clone https://github.com/ahsankhan1911/mern-App-without-cra.git', (err, stdout, stderr) => {
            if (err) {
                throw new Error(err);
            }
            else {
                console.info('Performing some further procedures...')
                fs.rename(`${process.cwd()}/mern-App-without-cra`, `${process.cwd()}/${dirname}`, (err) => {
                    if (err) {
                        throw new Error(err);
                    }
                    else {
                        rimraf(`${process.cwd()}/${dirname}/.git`, (err) => {
                            if (err) {
                                throw new Error(err);
                            }

                            else {
                                rimraf(`${process.cwd()}/${dirname}/package-lock.json`, (err) => {
                                    if (err) { throw new Error(err) }
                                })
                                rimraf(`${process.cwd()}/${dirname}/client/package-lock.json`, (err) => {
                                    if (err) { throw new Error(err) }
                                })
                                fs.readFile(`${process.cwd()}/${dirname}/package.json`, (err, buf) => {
                                    var newPacakgeJson = JSON.parse(buf.toString())

                                    newPacakgeJson.name = dirname;
                                    newPacakgeJson.description = "Write Your Description Here"
                                    newPacakgeJson.author = "Your Name Here"


                                    newPacakgeJson = JSON.stringify(newPacakgeJson, null, "\t")

                                    fs.writeFile(`${process.cwd()}/${dirname}/package.json`, newPacakgeJson, (err) => {
                                        if (err) {
                                            throw new Error(err);
                                        }

                                        else {
                                            fs.readFile(`${process.cwd()}/${dirname}/client/package.json`, (err, buf) => {
                                                var newPacakgeJson = JSON.parse(buf.toString())

                                                newPacakgeJson.name = `${dirname}-front-end`;
                                                newPacakgeJson.description = "Description here"
                                                newPacakgeJson.author = "Your Name Here"


                                                newPacakgeJson = JSON.stringify(newPacakgeJson, null, "\t")

                                                fs.writeFile(`${process.cwd()}/${dirname}/client/package.json`, newPacakgeJson, (err) => {
                                                    if (err) {
                                                        throw new Error(err);
                                                    }

                                                    else {

                                                        var newREADME = "This project was bootstrapped with [MERN BoilerPlate](https://www.npmjs.com/package/mern-boilerplate)."

                                                        console.log()
                                                        fs.writeFile(`${process.cwd()}/${dirname}/README.md`, newREADME, (err) => {
                                                            if (err) {
                                                                throw new Error(err);
                                                            }

                                                            else {
                                                                console.log("Your app is created !! ")
                                                            }
                                                        })

                                                    }
                                                })
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })

    })
program.parse(process.argv)