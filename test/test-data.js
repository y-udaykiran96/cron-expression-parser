module.exports = [
  // Original test case
  {
    cronString: '*/15 0 1,15 * 1-5 /usr/bin/find',
    expectedOutput: `minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find\n`
  },
  // Single value test case
  {
    cronString: '0 12 1 * 0 /usr/bin/find',
    expectedOutput: `minute        0
hour          12
day of month  1
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   0
command       /usr/bin/find\n`
  },
  // Test case with comma-separated list in minutes
  {
    cronString: '0,30 12 1 * 0 /usr/bin/find',
    expectedOutput: `minute        0 30
hour          12
day of month  1
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   0
command       /usr/bin/find\n`
  },
  // Test case with range in hours
  {
    cronString: '0 9-17 1 * 0 /usr/bin/find',
    expectedOutput: `minute        0
hour          9 10 11 12 13 14 15 16 17
day of month  1
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   0
command       /usr/bin/find\n`
  },
  // Test case with step values in days of the month
  {
    cronString: '0 0 */2 * * /usr/bin/find',
    expectedOutput: `minute        0
hour          0
day of month  1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   0 1 2 3 4 5 6
command       /usr/bin/find\n`
  },
  // Test case with combined list and range in months
  {
    cronString: '0 0 1 1,6-8 * /usr/bin/find',
    expectedOutput: `minute        0
hour          0
day of month  1
month         1 6 7 8
day of week   0 1 2 3 4 5 6
command       /usr/bin/find\n`
  },
  // Test case with asterisk (wildcard) in days of the week
  {
    cronString: '0 0 1 * * /usr/bin/find',
    expectedOutput: `minute        0
hour          0
day of month  1
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   0 1 2 3 4 5 6
command       /usr/bin/find\n`
  },
  // Complex test case with combinations
  {
    cronString: '*/10 0-23/2 1-15/3 2,4,6 0-2 /usr/bin/find',
    expectedOutput: `minute        0 10 20 30 40 50
hour          0 2 4 6 8 10 12 14 16 18 20 22
day of month  1 4 7 10 13
month         2 4 6
day of week   0 1 2
command       /usr/bin/find\n`
  },
  {
    cronString: '0 0 1 1 0 /usr/bin/find',
    expectedOutput: `minute        0
hour          0
day of month  1
month         1
day of week   0
command       /usr/bin/find\n`
  },
  // Comma-separated list in each field
  {
    cronString: '0,15,30,45 0,12 1,15 1,6 0,3,6 /usr/bin/find',
    expectedOutput: `minute        0 15 30 45
hour          0 12
day of month  1 15
month         1 6
day of week   0 3 6
command       /usr/bin/find\n`
  },
  // Range in each field
  {
    cronString: '0-30 0-12 1-15 1-6 0-3 /usr/bin/find',
    expectedOutput: `minute        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
hour          0 1 2 3 4 5 6 7 8 9 10 11 12
day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
month         1 2 3 4 5 6
day of week   0 1 2 3
command       /usr/bin/find\n`
  },
  // Step values in each field
  {
    cronString: '*/15 */6 */5 */2 */2 /usr/bin/find',
    expectedOutput: `minute        0 15 30 45
hour          0 6 12 18
day of month  1 6 11 16 21 26 31
month         1 3 5 7 9 11
day of week   0 2 4 6
command       /usr/bin/find\n`
  },
  // Combination of ranges and lists in each field
  {
    cronString: '0-15,30-45 0-6,18-23 1-5,10-15 1-3,7-9 0-2,4-6 /usr/bin/find',
    expectedOutput: `minute        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45
hour          0 1 2 3 4 5 6 18 19 20 21 22 23
day of month  1 2 3 4 5 10 11 12 13 14 15
month         1 2 3 7 8 9
day of week   0 1 2 4 5 6
command       /usr/bin/find\n`
  },
  // Asterisk (wildcard) in each field
  {
    cronString: '* * * * * /usr/bin/find',
    expectedOutput: `minute        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
hour          0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   0 1 2 3 4 5 6
command       /usr/bin/find\n`
  },
  // Mixed complex case
  {
    cronString: '*/5 0,12 1-7/2 1-3,7-9 */2 /usr/bin/find',
    expectedOutput: `minute        0 5 10 15 20 25 30 35 40 45 50 55
hour          0 12
day of month  1 3 5 7
month         1 2 3 7 8 9
day of week   0 2 4 6
command       /usr/bin/find\n`
  }
];