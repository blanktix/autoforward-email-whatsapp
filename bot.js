const {Client, LocalAuth} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');
const nodemailer = require("nodemailer")
require('dotenv').config({path: './.env'})

const SENDER=process.env.SENDER
const PASS=process.env.PASS
const RECEIVER=process.env.RECEIVER

const options ={
    "port": 465,
    "host": "smtp.gmail.com",
    "auth": {
        "type": "login",
        "user": `${SENDER}`,
        "pass": `${PASS}`
    }
}

let transporter = nodemailer.createTransport(options)

transporter.verify(function (error, success){
    if (error){
        console.log(error)
    }
    else{
        console.log("Server siap menerima pesan")
    }
})

const client=new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {headless: true}
});
client.initialize();
client.on("qr", (qr)=>{
    console.log("QR Diterima", qr);
    console.log("\nSilakan pindai menggunakan ponsel Anda")
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    console.log("Berhasil masuk")
});

client.on('auth_failure', msg => {
    console.error('Authentikasi gagal', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on("message", (msg)=>{
    let message={
        from: `${SENDER}`,
        to: `${RECEIVER}`,
        subject: `Pesan dari ${msg._data.from}`,
        text: msg._data.body,
        html:`<p>${msg._data.body}</p>`
    }
    transporter.sendMail(message, function(err){
        if (err){
            console.log(err)
        }
        else{
            console.log("Surel terkirim")
        }
    })
});