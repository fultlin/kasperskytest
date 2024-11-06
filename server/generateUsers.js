const fs = require('fs');
const path = require('path');

const numberOfUsers = 200;

const firstNames = ['Иван', 'Петр', 'Сергей', 'Дмитрий', 'Алексей', 'Михаил', 'Анастасия', 'Елена', 'Татьяна', 'Мария'];
const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Кузнецов', 'Смирнов', 'Попов', 'Лебедев', 'Морозов', 'Васильев', 'Зайцев'];

const generateUsers = () => {
    const users = [];
    for (let i = 1; i <= numberOfUsers; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const status = Math.random() > 0.5 ? 'active' : 'inactive'; 
        const role = ['admin', 'user', 'guest'][Math.floor(Math.random() * 3)];

        users.push({
            id: i,
            firstName: firstName,
            lastName: lastName,
            status: status,
            role: role
        });
    }
    return users;
};


const users = generateUsers();
const dataFilePath = path.join(__dirname, 'data', 'users.json');
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true }); 
fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');

console.log(`Сгенерировано ${numberOfUsers} пользователей и сохранено в ${dataFilePath}`);
