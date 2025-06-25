const { TrainingCourse } = require('./trainingCourse.class');
const createModel = require('../../models/trainingCourse.model');
const hooks = require('./trainingCourse.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/trainingCourse', new TrainingCourse(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trainingCourse');

  // Get the schema of the collections 
  app.get("/trainingCourseSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};