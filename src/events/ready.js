module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot siap! Terhubung sebagai ${client.user.tag}`);
    },
};
