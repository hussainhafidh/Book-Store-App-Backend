const Book = require("../model/Book");

//get all books
const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find();
    } catch (err) {
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ books });
};

//get by id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: "No Book found" });
    }
    return res.status(200).json({ book });
};

//Adding a book by post method
const addBook = async (req, res, next) => {
    //destructuring
    const { name, author, description, price, available, image } = req.body;
    let book;
    //try block will create new instance of schema & save it.
    try {
        book = new Book({
            name,
            author,
            description,
            price,
            available,
            image
        })
        await book.save();

    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(500).json({ message: "unable to Add" });
    }
    return res.status(201).json({ book });
};

//updating a book
const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image

        });
        book = await book.save();
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ msg: "Unable To Update By this ID" });
    }
    return res.status(200).json({ book });
};

//Delete a book
const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });

};


exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;