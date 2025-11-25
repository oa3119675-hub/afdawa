const { Client, GatewayIntentBits, Events } = require("discord.js");

// قراءة التوكن من Secrets
const TOKEN = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`🔥 Bot Online as ${client.user.tag}`);
});

// رسالة ترحيب
client.on(Events.GuildMemberAdd, member => {
    const channel = member.guild.channels.cache.find(ch => ch.name.includes("welcome"));
    if (!channel) return;
    channel.send(`**حياك الله يا <@${member.id}> 😍✨**`);
});

// Ping Command بسيط
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "ping") {
        await interaction.reply(`🏓 Pong! | ${client.ws.ping}ms`);
    }
});

// تسجيل دخول
client.login(TOKEN);
