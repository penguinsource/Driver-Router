const accountSid = 'AC6d2852d119a9fb33b6f057b1ba5c433b';
const authToken = 'ba13a5ae98e022cbfc94fa52c9ca0ae0';
const client = require('twilio')(accountSid, authToken);

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
