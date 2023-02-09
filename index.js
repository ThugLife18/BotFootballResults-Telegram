const TelegramBot = require('node-telegram-bot-api');
const token = '5841751726:AAEuVZtaHFXeeIh6Cxe3R4EUfx7SDsXUPL4';
const fetch = require('sync-fetch');
const gradient = require('gradient-string');
const colors = require('colors');
const bot = new TelegramBot(token, {
  polling: true
});


console.clear();

async function getResults() {
  const api = "https://sports-live-scores.p.rapidapi.com/football/live";
  const headers = {
    "x-rapidapi-host": 'sports-live-scores.p.rapidapi.com',
    "x-rapidapi-key": '359dd7a2ddmsh1db3f9aa4be0a7ep16f701jsne9eecf4de7b3'
  };


  console.log(gradient.fruit(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        ██████╗ ███████╗███████╗██╗   ██╗██╗  ████████╗ █████╗ ██████╗  ██████╗ ███████╗
        ██╔══██╗██╔════╝██╔════╝██║   ██║██║  ╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝
        ██████╔╝█████╗  ███████╗██║   ██║██║     ██║   ███████║██║  ██║██║   ██║███████╗
        ██╔══██╗██╔══╝  ╚════██║██║   ██║██║     ██║   ██╔══██║██║  ██║██║   ██║╚════██║
        ██║  ██║███████╗███████║╚██████╔╝███████╗██║   ██║  ██║██████╔╝╚██████╔╝███████║
        ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`))

  try {
    const response = await fetch(api, {
      headers
    });
    const json = await response.json();
    const matches = json.matches;
    const results = [];

    for (const match of matches) {
      const league = match["League"];
      const visitados = match['Home Team'];
      const score1 = match['Home Score'];
      const visitantes = match['Away Team'];
      const score2 = match['Away Score'];
      const id = match['Match ID'];
      const prob = require('./prob.js')
      const { percentagem, percentagem2 } = prob.getProbability(score1, score2);



      module.exports = { score1, score2 }
      
      /** '[>] '.yellow + 'Liga:'.green + ` ${league}`.reset + `\n${visitados} [${score1}] vs [${score2}] ${visitantes}\n` */
      results.push(`[⚽] Liga: ${league} \n[🥅] ${visitados} [${score1}] vs [${score2}] ${visitantes}\n[🏆] Chances: ${percentagem}/${percentagem2}`)

    }
    

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}



(async () => {
  const results = await getResults();
  for (let result of results) {
    console.log(result);
  }
})();

bot.on('message', async (msg) => {
  if (!msg.text) return;

  let command = msg.text.toLowerCase();

  if (command === '/resultados') {
    const results = await getResults();
    for (let result of results) {
      bot.sendMessage(msg.chat.id, `<b>${result}</b>`, {
        parse_mode: 'HTML'
      });
    }
  }
});
