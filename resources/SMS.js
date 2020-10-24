const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const twilioPhoneNumber = '+15615677611'
const mihaiPhoneNumber = '+19545361700'

const sendSMS = async (to, message) => {
  try {
    // client.messaging.services
    return client.messages
        .create({
           friendlyName: 'GetSpeedBack',
           body: message,
           from: twilioPhoneNumber,
           to: to
         })
        .then((service, message) => {
          console.log('Send SMS status:', service.status)
          console.log('service is', service)
          console.log('message is', message)
          console.log(service.sid)
          if (service && service.sid) {
            return service.sid
          }
          return false;
        });
  } catch (err) {
    console.error('error send twilio message', err)
    return false
  }
}

module.exports = sendSMS
