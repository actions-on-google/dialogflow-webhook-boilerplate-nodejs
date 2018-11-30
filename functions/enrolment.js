const { api } = require("./api");
const { portal } = require("./auth");
const buildUrl = require("build-url");

module.exports = {
  enrol: courseId => {
    const url = buildUrl("", {
      path: "enrolment-service/" + portal + "/0/" + courseId + "/enrolment"
    });
    return api.post(url);
  }
};
