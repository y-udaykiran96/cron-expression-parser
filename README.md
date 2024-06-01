# Cron Expression Parser

### Cron Expressions Documentation: https://en.wikipedia.org/wiki/Cron

## Instructions
1. Install Node.js
    - https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
    - https://nodejs.org/en/download/package-manager/
2. Clone git repo to local system
3. Grant execute permissions. Run below command based on system OS.
    - linux/macos: `chmod 777 ./main.js`
    - windows: 
        - powershell: `icacls .\main.js /grant Everyone:(F)`
        - cmd: `icacls main.js /grant Everyone:F`

4. Run main.js file with cron expression and command as input
    ```
    ./main.js "*/15 0 1,15 * 1-5 /usr/bin/find"
    ```

## Run test-cases
```
npm run test
```

## Project Structure
```
sse-deliveroo/
  ├── src/
  |    ├── config.js            # Configurations required for cron expressions
  |    ├── cron-parser.js       # CronParser class responsible to parse and format output 
  |    ├── field-resolver.js    # functions to resolve each component of cron expression
  |    └── field-validator.js   # functions to validate each component of cron expression
  ├── test/
  |    ├── test-data.js         # list of test cases
  |    └── test-runner.js       # test cases running logic to iterate all list of test cases from test-data.js
  ├── main.js                   # first executable file in project as entry point
  ├── .gitignore
  ├── package-lock.json         # sub-dependency management file of npm (node package manager)
  ├── package.json              # dependency management file of npm (node package manager)
  ├── TASK.md                   # Technical task details
  └── README.md                 # This file, which contains necessary information
```

## References
Below documentation was used to implement core logic
- https://en.wikipedia.org/wiki/Cron