var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);

bot.beginDialogAction('restart', '/restart', {
    matches: /^good morning$|^hi ad$|^chào bạn$|^chào ad$|^chao ad$|^ad oi$|^ad ơi$|^ad$|^ad$|^restart$|^retry$|^'restart'$|^chao ban$|^bat dau$|^start$|^hi$|^hi $|^hello $|^hello$|^bắt đầu$|^xin chào$|^xin chao$/i
});
bot.dialog('/restart', [function (session) {
    session.send("/restart dialog");
    session.endConversation();
}]);

bot.dialog('/', [function (session) {
    session.send("/main dialog: when you say anything don't match with dialog i defined, it will go into main dialog");
    session.send('you said: %s', session.message.text);
    session.endConversation();
}]);

bot.beginDialogAction('askName', '/askName', {
    matches: /^your name$|^name$|^what is your name$|^what's your name$|/i
});
bot.dialog('/askName', [function (session) {
    session.send("/askName dialog");
    session.endConversation();
}]);

