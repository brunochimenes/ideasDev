const Annotation = require('../models/Annotation');

module.exports = {
  async store(req, res) {
    const annotation = await Annotation.findById(req.params.id);

    //Pega o like já existente e adiciona + 1
    annotation.set({ likes: annotation.likes + 1 });

    await annotation.save();

    req.io.emit('like', annotation);

    return res.json(annotation);
  }
}