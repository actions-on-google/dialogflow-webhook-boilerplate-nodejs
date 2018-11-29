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

const { findByTopicIntent } = require('./findByTopicIntent');
const { findByCourseIntent } = require('./findByCourseIntent');

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: true});

let duong = 'duong';

app.intent('Default Welcome Intent', (conv) => {
  duong = 'hello duong';
  conv.ask('Hi I Go1 Assistant');
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

app.intent('find_by_topic', findByTopicIntent);

app.intent('find_my_course', findByCourseIntent);

exports.yourAction = functions.https.onRequest(app);

