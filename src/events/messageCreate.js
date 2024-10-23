const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.author.bot) return;

        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = message.client.commands.get(commandName);
            if (!command) return;

            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('Terjadi kesalahan saat mengeksekusi command.');
            }
        }
    },
};
