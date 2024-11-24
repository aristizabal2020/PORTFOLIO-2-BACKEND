const axios = require('axios');
require('dotenv').config();

// Obtiene información de un servidor por su ID
const getServerInfo = async (req, res) => {
    const serverId = "945430995971240006";
    const discordToken = process.env.DISCORD_TOKEN;

    try {
        const response = await axios.get(`https://discord.com/api/v10/guilds/${serverId}?with_counts=true`, {
            headers: {
                Authorization: `Bot ${discordToken}`,
            },
        });

        const { id,
            name, 
            description, 
            emojis, 
            stickers, 
            approximate_member_count, 
            approximate_presence_count, 
            premium_tier, 
            icon } = response.data;

        // res.json(response.data)
        res.json({
            id,
            name,
            description,
            emojis: emojis.length,
            stickers: stickers.length,
            memberCount: approximate_member_count,        
            memberOnlineCount: approximate_presence_count,        
            premiumTier: premium_tier,
            icon: `https://cdn.discordapp.com/icons/${id}/${icon}.png`,
        });

    } catch (error) {
        console.error('Error al obtener información del servidor:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data || 'Error interno del servidor',
        });
    }
};

const getAuthUserDiscord = async ({ query }, res) => {
	const { code } = query;

	if (code) {
		try {
            const response = await axios.post(
              'https://discord.com/api/oauth2/token',
              new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code, // Código recibido de la redirección OAuth2
                grant_type: 'authorization_code',
                redirect_uri: `https://api.aristizabal.dev/profile/user`, // Asegúrate que coincida con el configurado en Discord
                scope: 'identify email',
              }).toString(),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
            );
          
            const oauthData = response.data;
            console.log(oauthData);

            //una vez retornada los datos puedo hacer la petición data user
            const userResult = await axios.get('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

            res.json(userResult.data);
            
          } catch (error) {
            if (error.response) {
              // Manejo de errores HTTP
              console.error('Error de respuesta:', error.response.status, error.response.data);
            } else {
              // Otros errores (problemas de red, etc.)
              console.error('Error:', error.message);
            }
          }
	}

	// return response.sendFile('index.html', { root: '.' });
};

module.exports = { getServerInfo, getAuthUserDiscord };