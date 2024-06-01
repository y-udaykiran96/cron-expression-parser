const { CRON_NUMERIC_RANGES } = require("./config")

const numericWithAsteriskComaHyphenRegex = new RegExp(/^[0-9*,/-]+$/)

function inRange(value, [min, max]) {
    const numericValueList = value.split(/[*,/-]/g).filter(Boolean).map(e => parseInt(e))
    for (let item of numericValueList) {
        if (item >= min && item <= max) continue
        else return false
    }
    return true
}

function validateFields(cronString) {
    const [minute, hour, dayOfMonth, month, dayOfWeek, command] = cronString.split(' ');
    const fieldValidation = {
        minute: validateByField('minute', minute),
        hour: validateByField('hour', hour),
        dayOfMonth: validateByField('dayOfMonth', dayOfMonth),
        month: validateByField('month', month),
        dayOfWeek: validateByField('dayOfWeek', dayOfWeek),
    }
    const errors = ['cron-validation-error'];
    for (let field in fieldValidation) {
        if (fieldValidation[field] === false) {
            errors.push(`${field} value is invalid`)
        }
    }
    if (errors.length > 1) {
        throw new Error(errors.join('\n'))
    }
    return {
        minute, hour, dayOfMonth, month, dayOfWeek, command
    }
}

function validateByField(key, value) {
    switch (key) {
        case 'minute': 
            return numericWithAsteriskComaHyphenRegex.test(value) && inRange(value, CRON_NUMERIC_RANGES.minute)
        case 'hour':
            return numericWithAsteriskComaHyphenRegex.test(value) && inRange(value, CRON_NUMERIC_RANGES.hour)
        case 'dayOfMonth':
            return numericWithAsteriskComaHyphenRegex.test(value) && inRange(value, CRON_NUMERIC_RANGES.dayOfMonth)
        case 'month':
            return numericWithAsteriskComaHyphenRegex.test(value) && inRange(value, CRON_NUMERIC_RANGES.month)
        case 'dayOfWeek':
            return numericWithAsteriskComaHyphenRegex.test(value) && inRange(value, CRON_NUMERIC_RANGES.dayOfWeek)
        default: return false
    }
}

module.exports = {
    validateFields
}