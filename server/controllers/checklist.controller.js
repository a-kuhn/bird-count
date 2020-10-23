const Checklist = require('../models/checklist.model');

module.exports = {
    create(req, res) {
        const checklist = new Checklist(req.body);

        checklist.save()
            .then(newList => {res.json({ msg: "success!", newList: newList });})
            .catch(err => res.json(err));
    },

    getOne(req, res){
        Checklist.findById(req.params.id)
            .then((checklist) => res.json(checklist))
            .catch((err) => res.json(err));
    },

    update(req, res) {    
        Checklist.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})
          .then(res => {console.log(`updated checklist: SUCCESS`);})
          .catch(err => res.status(400).json(err));
    },

    delete(req, res){
        Checklist.findByIdAndDelete(req.params.id)
            .then(checklist => res.json(checklist))
            .catch(err => res.json(err));
    },
};