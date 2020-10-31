import * as nodemailer from 'nodemailer'
import {host, port, user, pass} from '../config/mail'

const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: user,
      pass: pass
    }
    
  },);

  
 
  export default transporter