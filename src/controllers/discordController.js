const axios = require('axios');

// Obtiene información de un servidor por su ID
const getServerInfo = async (req, res) => {
    const serverId = "945430995971240006";
    const discordToken = process.env.DISCORD_TOKEN;

    try {
        const response = await axios.get(`https://discord.com/api/v10/guilds/${serverId}`, {
            headers: {
                Authorization: `Bot ${discordToken}`,
            },
        });

        const { id, name, member_count, icon } = response.data;

        res.json({
            name,
            memberCount: member_count,
            icon: `https://cdn.discordapp.com/icons/${id}/${icon}.png`,
        });

    } catch (error) {
        console.error('Error al obtener información del servidor:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data || 'Error interno del servidor',
        });
    }
};

module.exports = { getServerInfo };