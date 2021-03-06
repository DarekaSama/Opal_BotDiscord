const { Command } = require('discord-akairo');
const clean = text => {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
module.exports = class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            category: 'dev',
            ownerOnly: true,
            args: [{
                id: 'code',
                match: 'content',
            }],
            description: {
                content: `Execute du code en JavaScript.`,
                usage: 'eval <code>',
                exemples: ['eval <code>']
            }
        });
    }
    async exec(message, { code }) { //Permet de tester du JavaScript
        try {
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};