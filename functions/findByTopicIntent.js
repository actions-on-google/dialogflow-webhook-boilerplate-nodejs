const {
  SimpleResponse,
  Carousel,
  Image,
  Button,
  Suggestions,
  BasicCard,
} = require("actions-on-google");

const { Card, Suggestion } = require("dialogflow-fulfillment");

const buildUrl = require("build-url");
const { post, get } = require("./api");
const { convertCourseToBasicCard } = require('./findByCourseIntent');

/**
 * Greet the user and direct them to next turn
 * @param {DialogflowConversation} conv DialogflowConversation instance
 * @return {void}
 */

module.exports = {
  findByTopicIntent: conv => {
    const { topics } = conv.parameters;

    const url = buildUrl("", {
      path: "explore-service/lo",
      queryParams: {
        admin: 1,
        event: "all",
        marketplace: false,
        "type[]": "course",
        limit: 4,
        portal: 6692083,
        "keyword[all]": topics,
        "sort[0][field]": "relevant",
        "sort[0][direction]": "desc",
        offset: 0,
        keywordQueryType: 2,
        context: "explore"
      }
    });

    return get(url).then(res => {
      conv.ask(
        new SimpleResponse({
          speech: "<speak>This some course about " + topics + "</speak>",
          textToSpeech: "Yeah!. This some course about " + topics
        })
      );
      const items = convertHitsToList(res.data.hits);
      conv.data.courses = items;
      conv.ask(
        new Carousel({
          items
        })
      );
    });
  },

  findByTopicMoreIntent: conv => {
    const { topics } = conv.contexts.input["find_by_topic-followup"].parameters;
    conv.ask("Ok, load more " + topics);
    return get(url).then(res => {
      conv.ask(
        new SimpleResponse({
          speech: "<speak>More course about " + topics + "</speak>",
          textToSpeech: "Yeah!. This some course about " + topics + ". You can choose course below: "
        })
      );
      conv.ask(
        new Carousel({
          items: convertHitsToList(res.data.hits)
        })
      );
    });
  },

  findByTopicSelected: (conv, params, option) => {
    const course = conv.data.courses[option];
    
    if (course) {
      conv.ask("You selected for course: " + course.title + ". ");
      // conv.ask(new SimpleResponse('We will enrol you into this course, waiting...'));
      console.log('basic card', JSON.stringify(convertCourseToBasicCard(course)));
      conv.ask(new BasicCard(convertCourseToBasicCard(course)));
      conv.ask(new Suggestions(['Enrol this course'],['Find other course']));
    } else {
      conv.ask("Course which you selected dont exists");
    }
  }
};

function convertHitsToList(hits) {
  const KEYS = ["FIRST", "SECOND", "THIRD", "FOURTH"];
  const listItems = {};
  hits.forEach((item, index) => {
    listItems[KEYS[index]] = {
      title: item.title,
      description: item.description,
      image: new Image({
        url: item.image,
        alt: item.title
      })
    };
  });

  return listItems;
}
