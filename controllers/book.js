const Book = require('../models/Book');
const fs = require('fs');

exports.getBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({ message: 'Livre enregistré !' });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.getBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.modifyBook = (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Livre modifié !' }))
          .catch((err) => res.status(401).json({ err }));
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Livre supprimé !' });
            })
            .catch((err) => res.status(401).json({ err }));
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.getBestBooks = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.rateBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      const alreadyRated = book.ratings.find(
        (rating) => rating.userId === req.auth.userId
      );

      if (!alreadyRated && req.body.rating >= 0 && req.body.rating <= 5) {
        book.ratings.push({
          userId: req.auth.userId,
          grade: req.body.rating,
        });

        const total = book.ratings.reduce(
          (sum, rating) => sum + rating.grade,
          0
        );

        const averageRating = Math.round(total / book.ratings.length);

        Book.updateOne(
          { _id: req.params.id },
          {
            ratings: book.ratings,
            averageRating: averageRating,
          }
        )
          .then(() => res.status(200).json({ message: 'Note ajoutée' }))
          .catch((err) => res.status(401).json({ err }));
      }
      res.status(200).json(book);
    })
    .catch((err) => res.status(400).json({ err }));
};
