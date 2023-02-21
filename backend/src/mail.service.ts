import { Injectable } from '@nestjs/common';
var nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  transporter: any;
  constructor() { }
  sendMail(item:any, msg:any) {
    const name: string = 'revunixapp@outlook.com'
    var transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: name,
        pass: 'revunix4140'
      }
    });

    var mailOptions = {
      from: name,
      to: item,
      subject: 'Sending Email using Node.js',
      text: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }




}
