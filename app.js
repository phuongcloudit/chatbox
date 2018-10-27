var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure');
var dialogService = require('./service/dialogFlow.service')
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

//setup azure
var documentDbOptions = {
    host: 'https://phuongcloudit.documents.azure.com:443/', 
    masterKey: '1ewehxzLJeO1Dekxv8qHtMds8po0W2iuF6LyOEo6sFWyslfPpg0650E6HDqehdmG6zd1jJMCNnR8tQ1JeO7vSg==', 
    database: 'phuongcloudit',   
    collection: 'AccountEndpoint=https://phuongcloudit.documents.azure.com:443/;AccountKey=1ewehxzLJeO1Dekxv8qHtMds8po0W2iuF6LyOEo6sFWyslfPpg0650E6HDqehdmG6zd1jJMCNnR8tQ1JeO7vSg==;'
};

// var docDbClient = new azure.DocumentDbClient(documentDbOptions);

// var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);

// bot.beginDialogAction('restart', '/restart', {
//     matches: /^good morning$|^hi ad$|^chào bạn$|^chào ad$|^chao ad$|^ad oi$|^ad ơi$|^ad$|^ad$|^restart$|^retry$|^'restart'$|^chao ban$|^bat dau$|^start$|^hi$|^hi $|^hello $|^hello$|^bắt đầu$|^xin chào$|^xin chao$/i
// });
bot.dialog('/restart', [function (session) {
    session.send("Chào bạn, chúc bạn một ngày tốt lành!");
    session.endConversation();
}]);

bot.dialog('/', [function (session) {
    // session.send("/main dialog: when you say anything don't match with dialog i defined, it will go into main dialog");
    // session.send('you said: %s', session.message.text);
    let text = session.message.text;
    dialogService.queryIntent(text).then(res => {
        console.log(res);
    })
    session.endConversation();
}]);

// bot.beginDialogAction('askName', '/askName', {
//     matches: /your name|/i
// });
// bot.dialog('/askName', [function (session) {
//     session.send("/Messages?");
//     session.endConversation();
// }]);

bot.beginDialogAction('khac', '/khac', {
    matches: /^du lich$|^travel$|^du lịch/i
});
bot.dialog('/khac', [function (session) {
    session.send("Hello, Can you I help");
    session.endConversation();
}]);