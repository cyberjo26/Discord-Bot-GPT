const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'cuaca',
    description: 'Menampilkan informasi cuaca berdasarkan lokasi',
    async execute(message, args) {
        if (!args.length) {
            return message.reply('Tolong berikan nama kota yang ingin dicari cuacanya.');
        }

        const city = args.join(' ');
        const apiKey = process.env.WEATHER_API_KEY; // Pastikan API key disimpan di .env -- Make Sure Your API key Saved On .ENV
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=id`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            const weatherEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Informasi Cuaca di ${data.location.name}, ${data.location.country}`)
                .addFields(
                    { name: '🌡️ Temperatur', value: `${data.current.temp_c}°C / ${data.current.temp_f}°F`, inline: true },
                    { name: '😓 Terasa Seperti', value: `${data.current.feelslike_c}°C / ${data.current.feelslike_f}°F`, inline: true },
                    { name: '☁️ Cuaca', value: data.current.condition.text, inline: true },
                    { name: '🌬️ Kecepatan & Arah Angin', value: `${data.current.wind_mph} mph`, inline: true },
                    { name: '📅 Hari', value: new Date(data.location.localtime).toLocaleDateString('id-ID', { weekday: 'long' }), inline: true },
                    { name: '🚨 Peringatan Saat Ini', value: data.alerts ? data.alerts[0].headline : 'tidak ada', inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Data diperbarui setiap jam' });

            message.channel.send({ embeds: [weatherEmbed] });
        } catch (error) {
            console.error(error);
            message.reply('Terjadi kesalahan saat mengambil data cuaca. Pastikan kota yang dimasukkan benar.');
        }
    },
};
