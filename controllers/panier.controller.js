const { Panier } = require("../models/panier.model");
const { Utilisateur } = require("../models/utilisateur.model");
const { Art } = require("../models/art.model");
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//mrigl
const ShowallCarts = (req, res, next) => {
  Panier.find().exec(function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//mrigl
const AddToCart = async (req, res, next) => {
  var verifUser = req.body.userId;
  Panier.findOne({ $or: [{ artId: verifUser }] }).then((pan) => {
    if (pan) {
      console.log("panier existe!");

      var verifArt = req.body.artId;
      Panier.findOne({ "arts.artId": verifArt }).then((pannn) => {
        if (pannn) {
          Panier.updateOne(
            { "arts.artId": req.body.artId },
            { $inc: { "arts.$.quantity": 1 } },
            { upsert: true, new: true },
            function (err, model) {
              console.log(err);
            }
          );
        } else {
          //User Mawjoud +Add inside Array
          Panier.findOneAndUpdate(
            { userId: req.body.userId },
            { $push: { arts: req.body } },
            { upsert: true, new: true },
            function (err, model) {
              console.log(err);
            }
          );
        }
      });

      ///
    } else {
      console.log("panier Doesn't existe!");
      //Mech mawjoud add inside New Array
      let pan = new Panier({
        userId: req.body.userId,
        artId: req.body.artId,
      });
      pan.arts.push(req.body);
      pan
        .save()
        .then((pan) => {
          res.status(200).send(
            JSON.stringify({
              message: "pan Added Successfully!",
            })
          );
        })
        .catch((error) => {
          res.json({
            message: "An error occured when adding pan!",
          });
        });
    } //end else
  }); //end then
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//mrigl
const GetCartsbyUserid = (req, res, next) => {
  Panier.find({ userId: req.body.userId })
    .select("-_id -__v -userId ")
    .then((carts) => {
      res.json(carts[0]);
    })
    .catch((err) => console.log(err));
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//mrigll
const DeleteItemFromCart = async (req, res, next) => {
  Panier.find({ userId: req.body.userId })
    .select("-_id -__v -userId")
    .then((carts) => {
      //console.log(carts[0].arts);
      //console.log(req.body.artId);
      // console.log(carts[0].arts.length);
      for (let i = 0; i < carts[0].arts.length; i++) {
        //console.log(carts[0].arts[i].artId);
        if (carts[0].arts[i]._id == req.body.artId) {
          console.log("found");
          Panier.findOneAndUpdate(
            { userId: req.body.userId },
            { $pull: { arts: { _id: req.body.artId } } },
            { upsert: true, new: true },
            function (err, model) {
              console.log(err);
            }
          );
        }
      }
    })
    .catch((err) => console.log(err));
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const totalPrice = async (req, res, next) => {
  const panier = await Panier.find({ userId: req.body.userId });
  let total = 0;
  if (panier.length > 0) {
    for (let i = 0; i < panier[0].arts.length; i++) {
      total += panier[0].arts[i].prix * panier[0].arts[i].quantity;
    }
    res.status(200).send(total.toString());
  }
  if (panier.length == 0) {
    res.status(200).send("0");
  }
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const getArtDetails = async (req, res, next) => {
  Art.findById({ _id: req.body.artId }).exec(function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
incrementQuantity = async (req, res, next) => {
  Panier.updateOne(
    { "arts.artId": req.body.artId },
    { $inc: { "arts.$.quantity": 1 } },
    { upsert: true, new: true },
    function (err, model) {
      console.log(err);
    }
  );
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
decrementQuantity = async (req, res, next) => {
  Panier.updateOne(
    { "arts.artId": req.body.artId },
    { $inc: { "arts.$.quantity": -1 } },
    { upsert: true, new: true },
    function (err, model) {
      console.log(err);
    }
  );
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
module.exports = {
  ShowallCarts,
  GetCartsbyUserid,
  AddToCart,
  DeleteItemFromCart,
  totalPrice,
  getArtDetails,
  incrementQuantity,
  decrementQuantity,
};
