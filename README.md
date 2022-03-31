# Autoforward-Email-Whatsapp

###### A simple bot to forward your received WhatsApp message to email

How to use:

1. Clone this repository
2. Go to `autoforward-email-whatsapp` directory
3. Run `npm install`
4. Create file `.env` and write the following lines
```
SENDER="<BOT-EMAIL@ADDRESS>"
PASS="<BOT-EMAIL-PASSWORD>"
RECEIVER="<MAIN-EMAIL@ADDRESS>"
```
5. Set up your email security to allow this program to get access to your email (this repository using Gmail as BOT email). 
    - Go to [Security](https://https://myaccount.google.com/security)
    - Turn off 2-step Verification
    - Turn on Less secure app access
6. Modify code in *'node_modules\whatsapp-web.js\src\util\Injected.js'* find `window.Store.getProfilePicFull = window.mR.findModule('getProfilePicFull')[0].getProfilePicFull` and command on the line contain that code
7. Run command `npm start`
8. Scan the QR Code shown in terminal
9. Finish!
