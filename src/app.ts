import OpenAI from "openai";
import { config } from "dotenv";
import chalk from "chalk";
import readlineSync from "readline-sync";
import { ChatCompletionMessageParam} from "openai/resources";

config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.clear();

console.log(chalk.green(`
    
░▒▓████████▓▒░      ░▒▓███████▓▒░       ░▒▓█▓▒░      ░▒▓███████▓▒░        ░▒▓██████▓▒░       ░▒▓█▓▒░░▒▓█▓▒░                   ░▒▓██████▓▒░       ░▒▓█▓▒░ 
░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░                  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ 
░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░                  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ 
░▒▓██████▓▒░        ░▒▓███████▓▒░       ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░       ░▒▓██████▓▒░                   ░▒▓████████▓▒░      ░▒▓█▓▒░ 
░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░                      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ 
░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░                      ░▒▓█▓▒░░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░ 
░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓███████▓▒░       ░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░                      ░▒▓█▓▒░░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░ 
                                                                                                                                                         
                                                                                                                                                         
`))

const messages: ChatCompletionMessageParam[] = [];

while (true) {
    const userMessage = readlineSync.question(chalk.cyan("YOU: "));
    const handleMessage = async () => {
        const userContent: ChatCompletionMessageParam = {role: 'user', content: userMessage};
        messages.push(userContent);
        let fridayResponse = await openai.chat.completions.create({
            messages,
            model: "gpt-4o-mini",
        })
        messages.push(fridayResponse.choices[0].message);
        console.log(chalk.red("Assistant: ") + fridayResponse.choices[0].message.content);
    }

    if(userMessage === "exit") {
        console.log(chalk.red('FRIDAY: ')+ "Goodbye!");
        break;
    } else {
        handleMessage();
    }
    

}