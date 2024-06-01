const childProcess = require('child_process');
const util = require('util')
const exec = util.promisify(childProcess.exec);

const testData = require('./test-data')

const success = [];
const failed = [];
const errorList = [];

async function testCronParser(cronString, expectedOutput) {
  console.log(`Testing: ${cronString}`);
  try {
    const { stdout, stderr } = await exec(`./main.js "${cronString}"`)
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      errorList.push({ cronString, error: stderr })
    } else if (stdout === expectedOutput) {
      console.log('Test Passed');
      success.push(cronString)
    } else {
      console.log('Test Failed')
      failed.push(cronString)
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function main() {
  for (let test of testData) {
    await testCronParser(test.cronString, test.expectedOutput)
  }
  console.table({
    PASSED: success.length,
    FAILED: failed.length,
    ERRORS: errorList.length
  })
}
main()