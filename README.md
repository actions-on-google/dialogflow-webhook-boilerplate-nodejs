# Actions on Google: Webhook Template using Node.js

This webhook template sets up everything you need to build your fulfillment
business logic for your Assistant app built on API.AI.

## Setup Instructions

### Steps
1. Use the [Actions on Google Console](https://console.actions.google.com) to add a new project with a name of your choosing.
1. Click "Use API.AI" and then "Create Actions on API.AI".
1. Click "Save" to save the project.
1. Deploy the fulfillment webhook to your preferred hosting environment
(we recommend [Google Cloud Functions](https://cloud.google.com/functions/docs/tutorials/http)).
1. In the Fulfillment page of the API.AI console, enable Webhook, set the URL to the hosting URL, then save.
1. In the API.AI console, enable "Use webhook" in the Fulfillment section of any relevant intents.
1. Build out your agent and business logic by adding function handlers for API.AI actions.
1. For each API.AI action, set a new key/value pair on the actionMap, reflecting
 the action name and corresponding function handler on the actionMap in **index.js**.
1. Open API.AI's Integrations page, open the Settings menu for Actions on Google, then click Test.
1. Click View to open the Actions on Google simulator.
1. Type "Talk to my test app" in the simulator, or say "OK Google, talk to my test app" to any Actions on Google enabled device signed into your developer account.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/samples/).

## References and How to report bugs
* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* If you find any issues, please open a bug here on GitHub.
* Questions are answered on [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google).

## How to make contributions?
Please read and follow the steps in the CONTRIBUTING.md.

## License
See LICENSE.md.

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).

## Google+
Actions on Google Developers Community on Google+ [https://g.co/actionsdev](https://g.co/actionsdev).

