module.exports = async (client) => {
    client.on('ready', async () => {
        try {
            await client.user.setPresence({
                activities: [
                    {
                        name: `Kranton Prime..!!`,
                        type: `LISTENING`,
                    },
                ],
                status: `dnd`, // 'online', 'idle', 'dnd', 'invisible'
            });
            client.logger.log(`Logged in to ${client.user.tag}`, 'ready');
        } catch (err) {
            console.error("Error setting presence:", err);
        }
    });
};
