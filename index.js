require('dotenv/config');
const { Client } = require('discord.js'); 
const { OpenAI } = require('openai');
const OPENAI_KEY = 'sk-None-p5yVbfntP4yeUV3KZny9T3BlbkFJwZUrnuKLHCQTW1nyq6qk'
const TOKEN = 'MTI2ODY2NzUyOTE1MzIxNjU5Mw.GpQy9q.jLiB7OnLp7VAOICv_hGC89fhkzAJlNigZzuPiE'

const client = new Client({ 
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages',
        'MessageContent',
    ],
 });

client.on("ready",()=>{
   console.log("The bot is online");
});

const IGNORE_PREFIX = "!";

const CHANNELS = ['1266334889054310504'];

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
})


client.on('messageCreate',async(message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(IGNORE_PREFIX)) return;
    if(!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages:[
            {

            //name:
            role:'system',
            content:'SharmaJiKaBot is a friendly chatbot.'
        },
        {
            //name:
            role:'user',
            content:message.content,

        }
        
    ]
    }).catch((error)=>console.error('OpenAI Error:\n',error));

    message.reply(response.choices[0].message.content)
});

client.login(TOKEN);