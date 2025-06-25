
    module.exports = function (app) {
        const modelName = 'training_course';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, maxLength: null },
description: { type:  String , required: true, maxLength: null },
price: { type: Number, required: false, max: null },
duration: { type: Number, required: false, max: null },
material: { type: Schema.Types.ObjectId, ref: "training_material" },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };