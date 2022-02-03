module.exports = {
  HOST: "localhost",
  PORT: 27017,
  DB: "badbankDB",
  URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://mitBadBankUser:7zEL2bPkWjhiuDqc@cluster0.midcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
