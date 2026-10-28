const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        const latency = Date.now() - message.createdTimestamp;
        
        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('System Status')
            .addFields(
                { name: 'API Latency', value: `${client.ws.ping}ms`, inline: true },
                { name: 'Message Latency', value: `${latency}ms`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Marwan Hany' });

        await message.reply({ embeds: [embed] });
    }

    if (command === 'serverinfo') {
        const { guild } = message;
        
        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle(`Server: ${guild.name}`)
            .addFields(
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Owner ID', value: `${guild.ownerId}`, inline: true }
            )
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
});

client.login(token);