module.exports = toUtcTimestamp

/**
 * current UTC time as `YYYYMMDDHHmmSSOHH'mm'` where
 *
 * - YYYY is the year
 * - MM is the month
 * - DD is the day (01–31)
 * - HH is the hour (00–23)
 * - mm is the minute (00–59)
 * - SS is the second (00–59)
 * - O is the relationship of local time to Universal Time (UT), denoted by one of the characters +, −, or Z (see below)
 * - HH followed by ' is the absolute value of the offset from UT in hours (00–23) mm followed by ' is the absolute value of the offset from UT in minutes (00–59)
 *
 * For example, December 23, 1998, at 7:52 PM, U.S. Pacific Standard Time, is represented by the string
 * D:199812231952−08'00'
 */
var nonNumbers = /[^\d]/g
function toUtcTimestamp (date) {
  var timestamp = date.toISOString().replace(nonNumbers, '')

  return timestamp.substr(0, 14) + '+00\'00\''
}
