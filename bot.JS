const tmi = require('tmi.js');

const options = 
{
    options: {debug: true},
    identity: {
        username: 'bot_kk_',
        password: 'oauth:xz1uq1hnxlns04eotw9aflwof11cro'
    },
    channels: ['ak_k']
};

const client = new tmi.client(options);

guessInProgress = false;

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(target, context, msg, self) 
{
    if (self || !msg.startsWith('!')) 
    {
        return;
    }

    const commandName = msg.trim();

    if (commandName.startsWith("!dice"))
    {
        sides = commandName.split(' ')[1];

        if (sides == null)
        {
            client.say(target, "Usage: !dice n, where n is the number of sides you want the dice to have.")
        }
        else
        {
            const num = rollDice(sides);

            console.log(`* Executed ${commandName} command`);
            client.say(target, `You rolled a ${sides} sided dice and got ${num}`);
        }
    }
    else if (commandName.startsWith("!hello"))
    {
        console.log(`* Executed ${commandName} command`);
        client.say(target, `Hey there, ${context['display-name']}!`);
    }
    else if (commandName.startsWith("!color"))
    {
        botColor = commandName.split(' ')[1];

        if (botColor == null)
        {
            client.say(target, "Choose a color from the following: Blue, BlueViolet, CadetBlue, Chocolate, Coral, DodgerBlue, Firebrick, GoldenRod, Green, HotPink, OrangeRed, Red, SeaGreen, SpringGreen, YellowGreen");
        }
        else 
        {
            console.log(`* Chaning color in chat to ${botColor}`);
            client.color(botColor);
            client.say(target, `Color has been changed to: ${botColor}`);
        }        
    }
    else if (commandName.startsWith("!emoteonly"))
    {
        state = commandName.split(' ')[1];

        if (state == null)
        {
            client.say(target, "Please specify wether you'd like to turn emote only mode on or off.");
        }

        if (state == "on")
        {
            client.emoteonly(target);
            console.log("* Emote only mode has been turned on!");
        }
        else if (state == "off")
        {
            client.emoteonlyoff(target);
            console.log("* Emote only mode has been turned off!");
        }
    }
    else if (commandName.startsWith("!followersonly"))
    {
        state = commandName.split(' ')[1];
        duration = commandName.split(' ')[2];

        if (state == "on")
        {
            client.followersonly(target, duration);
            console.log(`* Followers only mode has been turned on for ${duration} minutes!`);
        }
        else if (state == "off")
        {
            client.followersonlyoff(target);
            console.log("* Followers only mode has been turned off!");
        }
    }
    else if (commandName.startsWith("!guess"))
    {
        number = commandName.split(' ')[1];

        if (!guessInProgress)
        {
            client.say(target, `${context['display-name']} has started a new number-guessing game. Try to guess the random number between 0 and 100!`);
            numberToGuess = Math.floor(Math.random() * (100 + 1))
            guessInProgress = true;
        }
        else
        {
            if (number == numberToGuess)
            {
                client.say(target, `Congratulations! The number was ${numberToGuess}`);
                guessInProgress = false;
            }
            else if (number < numberToGuess)
            {
                client.say(target, "The number is higher.");
            }
            else 
            {
                client.say(target, "The number is lower.");
            }
        }
    }
    else if (commandName.startsWith("!time"))
    {
        currentDate = new Date();
        client.say(target, `The current time is ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    }
    else if (commandName.startsWith("!date"))
    {
        currentDate = new Date();
        client.say(target, `The current date is ${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
    }
    else 
    {
        console.log(`* Unknown command ${commandName}`);
        client.say(target, `ERROR - command not recognized: ${commandName}`);
    }
}

function onConnectedHandler(addr, port)
{
    console.log(`* Connected to ${addr}:${port}`);
}

function rollDice(sides)
{
    return Math.floor(Math.random() * sides) + 1;
}