const Annotation = require('../models/Annotation');

module.exports = {
  async index(req, res) {
    const annotations = await Annotation.find({}).sort("-createdAt");

    return res.json(annotations);
  },

  async store(req, res) {
    const annotation = await Annotation.create(req.body);

    //Manda um evento para os usuarios com todas as anotações atualizando em tempo real
    req.io.emit('annotation', annotation);

    return res.json(annotation);
  }
}