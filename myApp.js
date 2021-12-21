require('dotenv').config();
var mongoose=require("mongoose");
mongoose.connect(process.env.Mongo_URI,{useNewUrlParser:true})

var personSchema=new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods:[String]
});
var Person=mongoose.model("Person",personSchema);
var createAndSavePerson = (done) => {
  var dhak=new Person({name:"dhakshin krishna",age:14,favoriteFoods:["noodles","cake"]});
  dhak.save(function(err, data){
    if(err) console.log(err);
    done(null,data);
    console.log(data);  
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err, data){
    if(err) console.log(err);
    done(null,data);
    console.log(data);   
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err,data){
    if(err) console.log(err);
    done(null , data)});
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function(err,data){
    if(err) console.log(err);
    done(null , data)});
};

const findPersonById = (personId, done) => {
  Person.findById(personId,function(err,data){
    if(err) console.log(err);
    done(null , data)});
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,per)=>{
  if(err) console.log(err); 
  per.favoriteFoods.push(foodToAdd);
  per.save(function(err, data){
    if(err) console.log(err);
    done(null,data);
  });
})}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{new:true},function(err,per){
    if(err) console.log(err);
    per.age=ageToSet;
    per.save(function(err, data){
      if(err) console.log(err);
      done(null,data);
    })
  })
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,dat){
    dat.save(function(err,data){
      if(err)console.log(err)
      done(null,data); 
  }); 
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const data=Person.remove({name:nameToRemove},function(err,rem){
    if(err) console.log(err);
    done(null,rem);
  });
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select('name favoriteFoods').exec(function(err,data){
    if(err) console.log(err);
    done(null,data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
