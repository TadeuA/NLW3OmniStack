import {Request, Response} from "express"
import { getRepository } from "typeorm"
import User from "../models/User"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userView from "../views/userView"
import * as Yup from "yup"
import crypto from "crypto"
import mailer from '../modules/mailer'  
import handlePassword from '../config/password'

export default{
  async show(request: Request, response: Response){
    return response.send({userId: request.userId})
  },

  async forgotPassword(request: Request, response: Response){
    const { email } = request.body

    try{
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ email })

      if(!user){
        response.status(400).send({
          error: 'User not found'
        })
      }

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()

      now.setHours(now.getHours() + 1)

      await userRepository.update(
        user.id,
        {
          passwordResetToken:token,
          passwordResetExpires:now
        }
        )
      

        mailer.sendMail({
          to: email,
          from:"tadeu01399@gmail.com",
          html:`<p> Você esqueceu sua senha? Não tem problemas, utilize esse token: ${token}</p>`,
        },(err) => {
          if (err)
          { 
            console.log(err)
            return response.status(480).json({error:"cannot send email"})
          }
          return response.send()
        })

    } catch(err){
      response.status(400).send({
        error: 'Erro on forgot password, try again'
      })
    }
  },
  async resetPassword(request: Request, response: Response){
    const userRepository = getRepository(User);

    const {email, password, confirmPassword, token} = request.body
    try{
      const user = await userRepository.findOne({ where: { email: email } })
    
      if(!user){
        return response.status(400).json({message:"Email Invalido"});
      }

      handlePassword(password,confirmPassword,response)

      if(token !== user.passwordResetToken){
        return response.status(400).json({error:'Token invalid'})
      }
      
      const now = new Date()

      if(now > user.passwordResetExpires){
        return response.status(400).json({error: 'Token expired, generete a new one'})
      }
      await userRepository.update(
        user.id,
        {
          password
        }
        )
        response.send()
    }catch(err){
      response.status(400).send({
        error: 'Erro on forgot password, try again'
      })
    }
  
    
  },

  async auth(request: Request, response: Response){
    const userRepository = getRepository(User);

    const {
      email,
      password
    } = request.body

    const user = await userRepository.findOne({ where: { email: email } })
    if(!user){
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
      return response.sendStatus(401)
    }

    const token = jwt.sign({ id:user.id }, String(process.env.SECRET_KEY), {
      expiresIn: '1d'
    });
    
    return response.status(201).json([userView.render(user),token]);

  },

  async create(request: Request, response: Response){
    const userRepository = getRepository(User);

    const {
      name,
      email,
      password,
      confirmPassword
    } = request.body

    const exist = await userRepository.findOne({ where: { email: email } })
    
    if(exist){
      return response.status(409).json({message:"Este email já está registrado"});
    }

    handlePassword(password,confirmPassword,response)

    
    const data = {
      name,
      email,
      password,
    
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    })

    await schema.validate(data, {abortEarly:false})
   
    const user = userRepository.create(data)
    await userRepository.save(user)
    

    return response.status(201).json(user)

  }
}