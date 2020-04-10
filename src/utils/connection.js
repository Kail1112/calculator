/*
* Класс получения|отправки данных на сервер
* */

import axios from "axios";

class connection {
    constructor () {
        this.axios = axios.create({
            baseURL: "http://localhost:5001/calculations",
            responseType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getAllResults = async () => {
        return await this.axios.get('/').then(res => res.data.result)
    }

    getResult = async (operation) => {
        return await this.axios({
            method: 'post',
            params: {
                operation
            }
        }).then(res => res.data.result)
    }
}

export default connection
