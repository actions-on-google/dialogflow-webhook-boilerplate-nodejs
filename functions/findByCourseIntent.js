
const { BasicCard, Button, Image } = require('actions-on-google');

module.exports = {
  findByCourseIntent: (conv) => {
    conv.ask('This is course about machine learning');
    conv.ask(new BasicCard({
      title: 'Machine learning course',
      image: new Image({
        url: 'https://baodautu.vn/Images/chicong/2017/12/29/cong-nghe-hoc-may-machine-learning-se-len-ngoi-trong-nam-20181514558790.jpg',
        alt: 'Machine learning',
      }),
      text: 'Fully Managed Services For Every Developer And Data Scientist.',
      buttons: new Button({
        title: 'Enrol now',
        url: 'https://www.google.com.vn/search?q=machine+learning&oq=machine+learning&aqs=chrome..69i57j0l2j69i60l3.3732j0j1&sourceid=chrome&ie=UTF-8',
      }),
    }));
  }
}