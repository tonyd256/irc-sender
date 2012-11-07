#!/usr/bin/env node

var program = require('commander');
var irc = require('irc');

program
  .version('0.0.1')
  .usage('[options] <message>')
  .option('-c, --channel <channel>', 'The irc channel to post the message to')
  .option('-p, --password <password>', 'The password to the irc channel')
  .parse(process.argv);

// console.log(program.args[0]);
// console.log(program.channel);
// console.log(program.password);

if (!program.channel || !program.password || typeof(program.password) == 'function')
  process.exit();

var client = new irc.Client('irc.foonetic.net', 'evertruedeploy', {
  port: 6697,
  secure: true,
  selfSigned: true,
  certExpired: true,
  debug: true,
  autoConnect: false,
  password: program.password,
  channels: [program.channel]
});

client.connect(1, function () {
  client.say(program.channel, program.args[0]);
  client.disconnect();
  process.exit();
});
