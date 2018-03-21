// Unix epoch Jan 1st 1970 00:00:00 AM UTC
// milliseconds since unix epoch

var moment = require('moment');

//var date = new Date();
//
//console.log(date.getMonth());

var date = moment();
date.add(1,'years').subtract(1,'years').subtract(1,'days');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

var createdAt = 1234;
var xdate = moment(createdAt);
console.log(xdate.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);


// 10:35 am
// print format like this
// 6:31 unpad the hours, padded minutes, use 12 hour clock