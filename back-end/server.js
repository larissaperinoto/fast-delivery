const app = require('./src/api/app');

const port = process.env.PORT || 3001;

app.listen(port);

console.log(`Api rodando na porta ${port}`);
