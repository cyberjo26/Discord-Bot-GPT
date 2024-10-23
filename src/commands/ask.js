const {Hercai} = require('hercai');

const herc = new Hercai({
    ai_name: 'ChatBot',
    max_tokens: 200
});

module.exports = {
    name: 'ask',
    description: 'Ajukan pertanyaan ke bot',
    async execute(message, args) {
        const question = args.join(' ');
        if (!question) {
            return message.reply('Tolong ajukan pertanyaan yang valid.');
        }
        let fullContent = message.content;
        try {
            const response = await herc.question({ model: "v3", content: fullContent });
            await message.reply(response.reply);
          } catch (error) {
            await message.reply('Maaf, saya mengalami kesulitan dalam memberikan respon.');
        }
    }
};
