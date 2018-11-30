const { SimpleResponse, Carousel, Image, Button } = require('actions-on-google');

const listItems = {
  ['FIRST']: {
    title: 'Machine Learning For Beginners',
    description: `Machine learning was defined in 90's by Arthur Samuel described as the,” it is a field of study that gives the ability to the computer for self-learn ...`,
    image: new Image({
      url: 'https://cdn-images-1.medium.com/max/1200/1*M9le42saJxWlOYyYvhKtPA.jpeg',
      accessibilityText: 'Enrol now',
    }),
    buttons: new Button({
      title: 'Enrol now',
      url: 'https://www.google.com.vn/search?q=machine+learning&oq=machine+learning&aqs=chrome..69i57j0l2j69i60l3.3732j0j1&sourceid=chrome&ie=UTF-8',
    }),
  },
  ['SECOND']: {
    title: 'Machine Learning for Marketing',
    description: `AI and machine learning will have the most profound impact on marketing in 2018 because it will fundamentally make ‘marketing’ more human…Which is ironic in and of itself.`,
    image: new Image({
      url: 'https://www.ie.edu/exponential-learning/blog/wp-content/uploads/2018/01/MachineLearninginMarketing-1621x1000.jpg',
      accessibilityText: 'Enrol now'
    })
  },
  ['THIRD']: {
    title: 'An Introduction to Machine Learning',
    description: 'Machine learning is a subfield of artificial intelligence (AI). The goal of machine learning generally is to understand the structure of data and fit that data into models that can be understood and utilized by people.',
    image: new Image({
      url: 'https://community-cdn-digitalocean-com.global.ssl.fastly.net/assets/tutorials/images/large/introduction-to-machine-learning_social.png?1510178550',
      accessibilityText: 'Enrol now',
    })
  },
  ['FOURTH']: {
    title: 'Neural-Network Hardware Drives the Latest Machine-Learning Craze',
    description: 'From self-driving cars to the industrial Internet of Things, neural networks are reshaping the problem-solving methods of developers.',
    image: new Image({
      url: 'https://www.electronicdesign.com/sites/electronicdesign.com/files/styles/article_featured_standard/public/0718TR_Promo.jpg?itok=t70vFYFv',
      accessibilityText: 'Enrol now',
    })
  }
}

/**
 * Greet the user and direct them to next turn
 * @param {DialogflowConversation} conv DialogflowConversation instance
 * @return {void}
 */

module.exports = {
  findByTopicIntent: (conv) => {
    const { topics } = conv.parameters;
    conv.ask(new SimpleResponse({
      speech: '<speak>This some course about ' + topics+'</speak>',
      textToSpeech: 'This some course about ' + topics,
    }));
    conv.ask(new Carousel({
      display: 'WHITE',
      title: 'This some course about ' + topics,
      items: listItems,
    }));
  },

  findByTopicMoreIntent: (conv) => {
    const { topics } = conv.contexts.input['find_by_topic-followup'].parameters;
    conv.ask('Ok, load more ' + topics);
    
  }
}
