const app = require('./app');

const PORT = process.env.PORT || 6767;

app.listen(PORT, () => {
    console.log(process.env.DISCORD_TOKEN);
    console.log(`Server is running on http://localhost:${PORT}`);
});
