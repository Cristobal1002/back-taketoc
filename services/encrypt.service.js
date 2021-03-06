const  crypto = require('crypto')
const bcrypt = require('bcrypt')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY// Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
const EAS_ALGORITHM ='aes-256-cbc'
const HEX = 'hex'
const SPLITTER = '_'

 class EncryptService {

    async  encryptEAS(data) {

        try{
          const text = data.toString()
          let iv = crypto.randomBytes(IV_LENGTH);
          let cipher = crypto.createCipheriv(EAS_ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
          let encrypted = cipher.update(text);
         
          encrypted = Buffer.concat([encrypted, cipher.final()]);
          return  iv.toString(HEX) + SPLITTER + encrypted.toString(HEX)
        } catch(e){
    
          console.log('encrypt eas error ->', e)
          throw new Error('No se puedo cifrar los datos')
    
        }

      }
      
      async  decryptEAS(text) {
    
        try {
          let textParts = text.split(SPLITTER);
          let iv = Buffer.from(textParts.shift(), HEX);
          let encryptedText = Buffer.from(textParts.join(SPLITTER),HEX);
          let decipher = crypto.createDecipheriv(EAS_ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
          let decrypted = decipher.update(encryptedText);
         
          decrypted = Buffer.concat([decrypted, decipher.final()]);
      
          return decrypted.toString()
    
        }catch (e){
          throw new Error('No se puedo obtener datos')
        }
      }

   hashPassword = async password => {
     const salt = await bcrypt.genSalt(10)
     return bcrypt.hash(password, salt)
   }

   comparePassword = async (password, hash) => {
     return bcrypt.compare(password, hash)
   }

}

module.exports =  {EncryptService}