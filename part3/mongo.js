const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const uri_template =
  "mongodb+srv://jussi:<password>@cluster0.7n7tocb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const uri = (password) => {
  return uri_template.replace("<password>", password);
};

const listPeople = (password) => {
  mongoose.connect(uri(password));
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

const addPerson = ({ password, name, number }) => {
  mongoose.connect(uri(password));
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
if (process.argv.length === 3) {
  listPeople(process.argv[2]);
}
if (process.argv.length === 5) {
  const [password, name, number] = process.argv.slice(2);
  addPerson({ password, name, number });
}
if (process.argv.length > 5 || process.argv.length === 4) {
  console.log("wrong number of arguments");
  process.exit(1);
}
