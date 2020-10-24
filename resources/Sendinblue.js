

// const sendSMS = async () => {
//   const response = await fetch('https://api.sendinblue.com/v3/transactionalSMS/sms', {
//     method: 'POST',
//     headers: {
//       'api-key': SENDINBLUE_API_KEY,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "type": "transactional",
//       "sender": "9545361700",
//       "recipient": "5614453344",
//       "content": "Testing SMS, whats up champ!"
//     })
//   })
//   console.log('response is', response)
//   const resp = await response.json()
//   console.log('resp is', resp)
// }
