const fetch = require('node-fetch')

const SendEmail = async (email, name, link) => {
  try {
    const response = await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.SENDIN_BLUE_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "sender": {
          name: "GetSpeedBack",
          email: "hello@getspeedback.com"
        },
        "to": [{
          email,
          name
        }],
        htmlContent: `<p>Hey ${name}, here is your route for today's deliveries. Click this link to open your directions and begin navigating.</p>
        <p>${link}</p>`,
        subject: 'Your route info'
      })
    })
    const resp = await response.json()
    if (!resp) { return false }
    return true;
  } catch (err) {
    console.error('SendEmail error', err)
    return false;
  }
}

module.exports = SendEmail

