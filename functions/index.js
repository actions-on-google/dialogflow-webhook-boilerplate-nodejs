// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const { findByTopicIntent, findByTopicMoreIntent, findByTopicSelected, findByTopicEnroll } = require('./findByTopicIntent');

const { findByCourseIntent } = require('./findByCourseIntent');
const { helpIntent } = require('./helpIntent');

const {dialogflow, SignIn, Suggestions} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({
  debug: false,
  // clientId: '58b41d735b8960abaed7c41c2267f2d26b7602c3',
});

const jwt = require('jsonwebtoken');
const { api, setJWT } = require('./api');

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(`Hi! I'm Go1 Assistant`);

  // Open signup dialog
  conv.ask(new SignIn('To get your account details'));
});

app.intent('Get Signin', async (conv, params, signin) => {
  if (signin.status === 'OK') {
    const { token } = conv.user.access;
    const payload = jwt.decode(token);

    setJWT(token);

    conv.ask(`I got your portal, ${payload.sub}. What do you want to do next?`);
    conv.ask(new Suggestions('Tell me about Big Data'));

  } else {
    conv.ask(`I won't be able to save your data, but what do you want to do next?`)
  }
});

app.intent('find_by_topic', findByTopicIntent);

app.intent('find_by_topic_more', findByTopicMoreIntent);

app.intent('find_by_topic_selected', findByTopicSelected);

app.intent('find_by_topic_enroll', findByTopicEnroll);

app.intent('find_my_course', findByCourseIntent);

app.intent('Help', helpIntent);

app.intent('Goodbye', conv => {
  conv.close('See you in the next learning!')
});

exports.go1 = functions.https.onRequest(app);
