const { CRON_NUMERIC_RANGES } = require("./config");
const { resolveField } = require("./field-resolver");
const { validateFields } = require("./field-validator");

class CronParser {
    inputString = '';
    inputData = {};
    parsedData = {};
    numericRanges = {
        minute: [0, 59],
        hour: [0, 23],
        dayOfMonth: [1, 31],
        month: [1, 12],
        dayOfWeek: [0, 6]
    };
    constructor(cronString) {
        this.inputString = cronString
        return this;
    }

    validate() {
        this.inputData = validateFields(this.inputString)
        return this
    }

    parse() {
        this.parsedData = {
            minute: resolveField(this.inputData.minute, CRON_NUMERIC_RANGES.minute),
            hour: resolveField(this.inputData.hour, CRON_NUMERIC_RANGES.hour),
            dayOfMonth: resolveField(this.inputData.dayOfMonth, CRON_NUMERIC_RANGES.dayOfMonth),
            month: resolveField(this.inputData.month, CRON_NUMERIC_RANGES.month),
            dayOfWeek: resolveField(this.inputData.dayOfWeek, CRON_NUMERIC_RANGES.dayOfWeek),
            command: this.inputData.command
        }
        return this;
    }

    formatAsTableOutput() {
        const output = [
            `minute        ${this.parsedData.minute.join(' ')}`,
            `hour          ${this.parsedData.hour.join(' ')}`,
            `day of month  ${this.parsedData.dayOfMonth.join(' ')}`,
            `month         ${this.parsedData.month.join(' ')}`,
            `day of week   ${this.parsedData.dayOfWeek.join(' ')}`,
            `command       ${this.parsedData.command}`
        ];
        
        return output.join('\n');
    }
}

module.exports = {
    CronParser
}