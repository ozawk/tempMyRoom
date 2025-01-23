const unixtime = Date.now();
console.log(Math.round(unixtime/1000))
const temperature = "温度温度温度"
const myHeaders = new Headers();
const formdata = new FormData();
myHeaders.append("Authorization", "Basic UG9tb0N5Y2xlOnVPNm51Q2txSU8zMjBFQkRJS08wS2hSUnJ3QnlkQWVFeEk5NWoydmhjVzVqalJJc2RmUzBxQlFISm9BbGxEam5rZHFNc3NUSkF4b1Jsa0xL");
formdata.append("unixtime", unixtime);
formdata.append("temperature", temperature);
const requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: formdata,
   redirect: 'follow'
};
fetch("https://temp.ozwk.net/set", requestOptions)
   .then(response => response.text())
   .catch(error => console.error('error', error));
