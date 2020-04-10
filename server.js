const http = require('http');
const fs = require('fs');
const express = require('express');
const calculator = require('./service/calculator')

let httpServer;

return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    })

    app.get('/calculations', (req, res) => {
        try {
            fs.readFile('service/data.json', (err, data) => {
                if (err) {
                    console.error('Ошибка во время считывания файла')
                    res.end(res.json({result: 'Ошибка, смотреть консоль сервера'}))
                } else {
                    res.end(res.json({result: JSON.parse(data)}));
                }
            })
        } catch (e) {
            console.error('Ошибка')
            console.error(e)
            res.end(res.json({result: 'Ошибка, смотреть консоль сервера'}));
        }
    });

    app.post('/calculations', (req, res) => {
        console.info(`Пришел запрос ${req.query.operation}`)
        try {
            const result = calculator(req.query.operation)
            fs.readFile('service/data.json', (err, data) => {
                if (err) {
                    console.error('Ошибка во время считывания файла')
                    res.end(res.json({result: 'Ошибка, смотреть консоль сервера'}))
                } else {
                    let old = JSON.parse(data)
                    const date = new Date()
                    old.unshift({calculation: req.query.operation, result, date})
                    fs.writeFile('service/data.json', JSON.stringify(old), (err) => {
                        if (err) {
                            console.error('Ошибка во время записи')
                            res.end(res.json({result: 'Ошибка, смотреть консоль сервера'}))
                        } else {
                            // {"calculation":"5+59+6/2-85","result":-18,"date":"2020-04-10T13:59:22.698Z"}
                            console.log(`Результат над операцией ${req.query.operation} будет ${result}`)
                            res.end(res.json({
                                result: {
                                    calculation: req.query.operation,
                                    result,
                                    date
                                }
                            }));
                        }
                    })
                }
            })
        } catch (e) {
            console.error('Ошибка')
            console.error(e)
            res.end(res.json({result: 'Ошибка, смотреть консоль сервера'}));
        }
    })

    httpServer.listen('5001').on('listening', () => {
        console.log('Сервер для сбора и отправки данных запущен по адресу localhost:5001');
        resolve();
    }).on('error', err => {
        reject(err);
    });
});
