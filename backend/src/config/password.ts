import {Response} from 'express'

export default function handlePassword(password: string, confirmPassword: string, response: Response ){
  if(password !== confirmPassword){
    return response.status(401).json({message:"As senhas não são idênticas! Por favor revisar."})
  }
  
  const isNumber = /[0-9]/
  const isUppercase = /[A-Z]/
  const isLowercase = /[a-z]/
  
  const numberOk = isNumber.test(password)
  const uppercaseOk = isUppercase.test(password)
  const lowercaseOk = isLowercase.test(password)

  if(!numberOk || !uppercaseOk || !lowercaseOk || password.length < 8){
    return response.status(401).json({
      message:"A senha deve conter um número, uma letra maiúscula, ma letra minúscula e ser composta por 8 caracteres."
    })
  }
}