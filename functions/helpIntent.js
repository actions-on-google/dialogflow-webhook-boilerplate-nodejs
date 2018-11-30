const { post }  = require('./api');
const { portal } = require('./config');
const URL = 'user-service/account/password/'+portal;

module.exports = {
  helpIntent: (conv) => {
    const email_reset = conv.parameters.email_reset;

    return post(URL + '/' + email_reset).then(() => {
      conv.ask('The instruction has been sent to your email ' + email_reset);
    })
    .catch(err => {
      conv.ask('Have some error. Please try again. ' + err);
    });
  },
}