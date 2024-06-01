#!/usr/bin/env node

const process = require('process');
const { parseCronExpression, formatAsTableOutput } = require('./src/cron-parser');
const { CronParser } = require('./src/cron-parser');


function main(input) {
  if (!input) {
    console.error('Please provide a cron string as an argument.');
  }

  try {
    const cronParsed = new CronParser(input).validate().parse()
    console.log(cronParsed.formatAsTableOutput());
  } catch (error) {
    console.error('Please provide valid cron string.')
    console.error(error)
  }

}

main(process.argv[2])
