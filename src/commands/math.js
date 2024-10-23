module.exports = {
    name: 'math',
    description: 'Lakukan operasi aritmatika sederhana',
    execute(message, args) {
        if (args.length < 3) {
            return message.reply('Format salah! Gunakan format: `!math <angka1> <operator> <angka2>`.');
        }

        const num1 = parseFloat(args[0]);
        const operator = args[1];
        const num2 = parseFloat(args[2]);

        let result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : 'Error: Pembagian dengan nol!';
                break;
            default:
                return message.reply('Operator tidak valid! Gunakan salah satu dari: +, -, *, /.');
        }

        message.reply(`Hasil: ${result}`);
    }
};
