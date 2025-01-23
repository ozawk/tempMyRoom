const cron = require('node-cron');
require('dotenv').config()

console.log(process.env.HOGEHOGE)
cron.schedule('* */3 * * *', () => {
    let unixtime = new Date();
    unixtime.setHours(unixtime.getHours() + 9);
    const temperature = Math.floor(Math.random() * 1000)
    const myHeaders = new Headers();
    const formdata = new FormData();
    myHeaders.append("Authorization", "Basic "+SECRET_ENCORDED_USR_AND_PW);
    formdata.append("unixtime", unixtime.getTime());
    formdata.append("temperature", temperature);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    console.log(unixtime+" => "+temperature+" °C")
    fetch("https://temp.ozwk.net/set", requestOptions)
        .then(response => response.text())
        .catch(error => console.error('error', error));
})
