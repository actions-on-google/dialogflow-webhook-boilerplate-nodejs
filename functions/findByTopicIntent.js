const {
  SimpleResponse,
  Carousel,
  Image,
  Button,
  Suggestions,
  BasicCard,
  LinkOutSuggestion,
} = require("actions-on-google");

const { Card, Suggestion } = require("dialogflow-fulfillment");

const buildUrl = require("build-url");
const { api } = require("./api");
const { convertCourseToBasicCard } = require('./findByCourseIntent');
const { enrol } = require('./enrolment');
const { portalUrl, portal } = require('./auth');

const context = {
  FIND_BY_TOPIC_FOLLOWUP: 'find_by_topic-followup',
}

/**
 * Greet the user and direct them to next turn
 * @param {DialogflowConversation} conv DialogflowConversation instance
 * @return {void}
 */

module.exports = {
  findByTopicIntent: conv => {
    const { topics } = conv.parameters;

    return getExplore(topics).then(res => {
      responseListCourse(topics, res, conv);
    });
  },

  findByTopicMoreIntent: conv => {
    const { topics } = conv.contexts.input["find_by_topic-followup"].parameters;
    conv.ask("Ok, load more " + topics);
    return getExplore(topics).then(res => {
      responseListCourse(topics, res, conv);
    });
  },

  findByTopicSelected: (conv, params, option) => {
    const course = conv.data.courses[option];
    
    if (course) {
      conv.ask("You selected for course: " + course.title + ". ");
      conv.ask(new BasicCard(convertCourseToBasicCard(course)));
      conv.ask(new Suggestions(['Enrol this course'],['Find other course']));
      conv.contexts.set(context.FIND_BY_TOPIC_FOLLOWUP, 3, {
        option,
      });
    } else {
      conv.ask("Course which you selected dont exists");
    }
  },

  findByTopicEnroll: (conv, params, option) => {
    const course = conv.data.courses[conv.contexts.input[context.FIND_BY_TOPIC_FOLLOWUP].parameters.option];
    console.log('find by topic enroll', JSON.stringify(course));
    if (course) {
      return enrol(course.courseId).then(res => {
        conv.ask(new SimpleResponse('Yeah! You already enrol for course ' + course.title));

        conv.ask(new Suggestions['Give feedback', 'Find other courses']);
        conv.ask(new LinkOutSuggestion({
          name: 'Link to course',
          url: makeLinkToCourseInProgress(course.courseId),
        }));
      })
      .catch(e => {
        conv.ask('Weird, error when enroll this course for you. Please try again or find some new course.');  
      });
    } else {
      conv.ask('Weird, I cant find course which you want to enroll. Please try again or find some new course.');
    }
  }
};

function convertHitsToList(hits) {
  const KEYS = ["FIRST", "SECOND", "THIRD", "FOURTH"];
  const listItems = {};
  hits.forEach((item, index) => {
    listItems[KEYS[index]] = {
      courseId: item.id,
      title: item.title || 'No title ' + index,
      description: item.description,
      image: new Image({
        url: item.image,
        alt: item.title || 'No alt',
      })
    };
  });

  return listItems;
}

function makeLinkToCourseInProgress(courseId) {  
  // https://wonderminds.mygo1.com/p/#/app/course/6701786/progress?instance=6692083
  return `${portalUrl}/app/course/${courseId}/progress?instance=${portal}`;
}

function getExplore(topics) {
  const url = buildUrl("", {
    path: "/v2/learning-objects",
    queryParams: {
      // admin: 1,
      // "type[]": "course",
      limit: 4,
      // "keyword[all]": topics,
      // "sort[0][field]": "relevant",
      // "sort[0][direction]": "desc",
      offset: 0,
      'provider[]': 6692083,
      // status: false,
      // portal,
    }
  });

  return api.get(url);
}

function convertHitsToBasicCard(course) {
  return {
    title: course.title,
    image: new Image({
      url: course.image,
      alt: course.title,
    }),
    text: course.description,
  }
}

function convertHitsDataToCourse(hits) {
  return {
    courseId: hits.id,
    title: hits.title,
    description: hits.description,
    image: {
      url: hits.image,
    }
  }
}

function responseListCourse(topics, res, conv){
  const items = convertHitsToList(res.data.hits);
  if (res.data.hits.length >= 2) {
    conv.ask(
      new SimpleResponse({
        speech: "<speak>This some course about " + topics + "</speak>",
        textToSpeech: "Yeah!. This some course about " + topics
      })
    );
    conv.data.courses = items;
    conv.ask(
      new Carousel({
        items
      })
    );
  } else if ( res.data.hits.length == 1) {
    conv.ask(
      new SimpleResponse({
        speech: "<speak>This a course about " + topics + "</speak>",
        textToSpeech: "Yeah!. This a course about " + topics,
      })          
    );
    const course = convertHitsDataToCourse(res.data.hits[0]);
    conv.data.courses = {};
    conv.data.courses[course.courseId] = course;
    conv.ask(new BasicCard(convertHitsToBasicCard(res.data.hits[0])));
    conv.ask(new Suggestions(['Enrol this course'],['Find other course']));
    conv.contexts.set(context.FIND_BY_TOPIC_FOLLOWUP, 2, {
      option: course.courseId,
    });
  } else {
    conv.ask(
      new SimpleResponse("Ooops! No course about " + topics + ". Try other content.")
    );
  }
}
