const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendSMS = async (to, message) => {
  try {
    return client.messages
      .create({
         friendlyName: 'GetSpeedBack',
         body: message,
         from: process.env.TWILIO_PHONE_NUMBER,
         to: to
       })
      .then((service, message) => {
        console.log('Send SMS response:', service)
        if (service && service.sid) {
          return service.sid
        }
        return false;
      });
  } catch (err) {
    console.error('Error send twilio message', err)
    return false
  }
}

module.exports = sendSMS
