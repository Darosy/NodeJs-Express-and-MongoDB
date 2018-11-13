var mongoose = require('mongoose');
var Emas = mongoose.model("Emas", require('../models/Emas'));
var EmasDet = mongoose.model("EmasDet", require('../models/EmasDet'));
var emasController = {};

emasController.list = function(req, res) {
    Emas.find({}).exec(function(err, emas) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/emas/index", {emas: emas});
        }
    })
}

emasController.show = function(req, res) {
    Emas.findOne({_id: req.params.id}).exec(function (err, emas) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/emas/show", {emas: emas});
      }
    });
};

emasController.create = function(req, res) {
    res.render("../views/emas/latihan");
};

emasController.save = function(req, res) {
    var valueEmas = {
      vendor: req.body.vendor,
      tgl_berlaku: req.body.tgl_berlaku,
      jenis_harga: req.body.jenis_harga
    }
    
    var emas = new Emas(valueEmas);
    emas.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/emas/create");
      } else {
        console.log("Successfully created an emas.");
        res.redirect("/emas/show/"+emas._id);
      }
    });
    var valueEmasDet = {
      id_emas: emas._id,
      jenis_mulia: req.body.jenis_mulia,
      harga: req.body.harga
    }
    var emasDet = new EmasDet(valueEmasDet);
    emasDet.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/emas/create");
      } else {
        console.log("Successfully created an emas.");
      }
    });
};

module.exports = emasController;