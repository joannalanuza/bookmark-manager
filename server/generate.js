var faker = require('faker');

var database = { bookmarks: []};
for (var i = 1; i<= 10; i++) {
    database.bookmarks.push({
        id: i,
        name: faker.commerce.productName(),
        url: faker.internet.url(),
        group: 'Initial Data Group'
    });
}

console.log(JSON.stringify(database));