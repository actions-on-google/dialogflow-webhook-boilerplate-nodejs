# Actions on Google: Webhook Template using Node.js and Cloud Functions for Firebase

This webhook template sets up everything you need to build your fulfillment
business logic for your Assistant app built on Dialogflow.

## Setup Instructions
Choose one of the two options listed below for setup. You only need to complete one of the two options below to setup this sample.

### Option 1: Add to Dialogflow (recommended)
Click on the **Add to Dialogflow** button below and follow the prompts to create a new agent:

[![Webhook Template](https://storage.googleapis.com/dialogflow-oneclick/deploy.svg "Webhook Template")](https://console.dialogflow.com/api-client/oneclick?templateUrl=https%3A%2F%2Fstorage.googleapis.com%2Fdialogflow-oneclick%2Fagent.zip&agentName=ActionsOnGoogleTemplateSample)

### Option 2: Dialogflow restore and Firebase CLI
1. Use the [Actions on Google Console](https://console.actions.google.com) to add a new project with a name of your choosing and click *Create Project*.
1. Click *Skip*, located on the top right to skip over category selection menu.
1. On the left navigation menu under *BUILD*, click on *Actions*. Click on *Add Your First Action* and choose your app's language(s).
1. Select *Custom intent*, click *BUILD*. This will open a Dialogflow console. Click *CREATE*.
1. Deploy the fulfillment webhook provided in the functions folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
   1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (yourAction): https://${REGION}-${PROJECT}.cloudfunctions.net/yourAction`
1. Go back to the Dialogflow console and select *Fulfillment* from the left navigation menu.
1. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Select *Intents* from the left navigation menu. Select the `Default Welcome Intent` intent, scroll down to the end of the page and click *Fulfillment*, check *Enable Webhook* and then click *Save*. This will allow you to have the welcome intent be a basic webhook intent to test.
1. Build out your agent and business logic by adding function handlers for Dialogflow actions.
1. For each Dialogflow action, set a new key/value pair on the actionMap, reflecting
 the action name and corresponding function handler on the actionMap in **index.js**.

## Test on the Actions on Google simulator
1. Open [Dialogflow's *Integrations* page]](https://console.dialogflow.com/api-client/#/agent//integrations) from the left navigation menu and open the *Integration Settings* menu for Actions on Google.
1. Enable *Auto-preview changes* and Click *Test*. This will open the Actions on Google simulator.
1. Click *View* to open the Actions on Google simulator.
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to any Actions on Google enabled device signed into your developer account.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment).

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

