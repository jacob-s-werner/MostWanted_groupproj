"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
//var lowerCaseTraits = ["id", "firstname", "gender", "dob","height","weight", "eyecolor", "occupation", "parent", "currentspouse"];

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let peopleWithTraits = multiTraitDescriptionSearch(people);
      displayPeople(peopleWithTraits);
      searchResults = peopleWithTraits;
    break;
    default:
       app(people); 
    break;
  }
  
  let userChoice;

  if (searchResults.length > 0) {
    for (let index = 0; index < searchResults.length; index++) {
      userChoice = prompt("Do you want to look at " + searchResults[index].firstName + " " + searchResults[index].lastName + " information ? Type 'yes' or 'no'");
      if (userChoice.toLowerCase() === "yes") {
        searchResults = searchResults[index];
        break;
      }else if (searchResults.length - 1 == index) {
        alert("No person selected, closing app")
        return;
      }
    }
  }
  mainMenu(searchResults,people)
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people);
     // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person,people);
    break;
    case "family":
      findFamilyMembers(person, people);
    break;
    case "descendants":
      let descendantsList = findDescendants(person, people);
      displayPeople(descendantsList);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person,people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Id: " + person.id + "\n";
  personInfo += "Height: " + person.height + " in" + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Weight: " + person.weight + "lb" + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  
  for (let index = 0; index < person.parents.length; index++) {
    personInfo += "Parent ID " + (index +1).toString() +": " + person.parents[index] + "\n";
  }
  
  if (person.currentSpouse != null) {
    let currentSpouse = people.filter(p => p.id === person.currentSpouse);
    personInfo += "Current Spouse: " + currentSpouse[0].firstName + " " + currentSpouse[0].lastName;
  }else{
    personInfo += "No Known Spouse \n"
  }
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function singleTraitSearch (people){
    let userInputTrait = prompt("Please enter a trait from the following list: 'id', 'firstname', 'lastname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'currentSpouse'");
    let lowerCaseUserInputTrait = userInputTrait.toLowerCase();
    
    switch(lowerCaseUserInputTrait){
      case "eyecolor":
        let peopleWithEyeColor = singleTraitDescriptionSearch("eyeColor", people);
      return peopleWithEyeColor;
      case "currentspouse":
        let peopleWithCurrentSpouse = singleTraitDescriptionSearch("currentSpouse", people);
      return peopleWithCurrentSpouse;
      case "firstname":
        let peopleWithFirstName = singleTraitDescriptionSearch("firstName", people);
        return peopleWithFirstName;
      case "lastname":
        let peopleWithLastName = singleTraitDescriptionSearch("lastName", people);
        return peopleWithLastName;
      case "id":
      case "gender":
      case "dob":
      case "height":
      case "weight":
      case "occupation":
        let listOFPPLWithTraits = singleTraitDescriptionSearch(lowerCaseUserInputTrait, people);
      return listOFPPLWithTraits;
      default:
        alert("Wrong Input, try typing a correct trait again");
      return singleTraitSearch(people); // ask again
    }
}

function singleTraitDescriptionSearch(trait, people){
  let userInputDescription = prompt("Enter the trait description you want to search for");
  let peopleListWithTraitDescription = people.filter(people => people[trait] == userInputDescription);

  if (peopleListWithTraitDescription.length > 0) {
    return peopleListWithTraitDescription;
    
  } else {
    let userChoice = prompt("No person found with matching description. Type the option to 'retry', 'menu' or 'quit'");
    switch(userChoice){
      case "retry":
        singleTraitDescriptionSearch(trait, people);
      break;
      case "menu":
      app(people);
      break;
      case "quit":
      break;
      default:
        singleTraitDescriptionSearch(trait, people);
    }
  }
}

function multiTraitDescriptionSearch(people){
  //list of traits to search for
  let countOfTraits = prompt("Please enter the quantity of traits you would like to search with a numeric key between 1 and 5.");
  let countOfTraitsStr = countOfTraits.toString();
  switch(countOfTraitsStr){
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    let counter = parseInt(countOfTraitsStr);
    var listOfPPLWithTraits = people;

    for (let i = counter; i != 0; i--) {
      let newList = singleTraitSearch(listOfPPLWithTraits);
      listOfPPLWithTraits = newList;
    }
    if (listOfPPLWithTraits.length > 0) {
      return listOfPPLWithTraits;
    }else{
      alert("no person found, try searching again");
      multiTraitDescriptionSearch(people);
    }
    default:
      alert("Input not validated.");
    multiTraitDescriptionSearch(people);
    break;
  }
}

function findFamilyMembers(person, people){
  let spouseid = person.currentSpouse;
  let spouseOfPerson = [], siblingsOfPerson = [], parentsOfPerson = [];
  spouseOfPerson = people.filter(people => people.id == spouseid);

  if (person.parents.length > 0) {
    for (let index = 0; index < person.parents.length; index++) {
      let siblingList = people.filter(people => people.parents.includes(person.parents[index]));
      let parent = people.filter(people => people.id === person.parents[index]);
      if (index == 0) {
        siblingsOfPerson = siblingList;
        parentsOfPerson = parent;
      } else {
        parent.forEach(parent => {
          parentsOfPerson.push(parent);
        });
        siblingList.forEach(sibling => {
          if (!siblingsOfPerson.includes(sibling)) {
            siblingsOfPerson.push(sibling);
          }
        });
      }
    }
  }

  displayPersonsFamily(person, spouseOfPerson, siblingsOfPerson, parentsOfPerson)
}

function displayPersonsFamily(person, spouseOfPerson, siblingsOfPerson, parentsOfPerson){

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";

  let spouseInfo = "No Known Spouse \n"
  if(spouseOfPerson.length > 0){
    spouseInfo = getPersonFirstLastName(spouseOfPerson[0], "Current Spouse:");
  }

  let allSiblings = "";
  if(siblingsOfPerson.length > 0){
    siblingsOfPerson.forEach(sibling => allSiblings += (getPersonFirstLastName(sibling, "Sibling:")));
  }else{
    allSiblings = "No Known Siblings \n"
  }

    let allParents = "";
    if(parentsOfPerson.length > 0){
    parentsOfPerson.forEach(parent => allParents += (getPersonFirstLastName(parent, "Parent:")));
  }else{
    allParents = "No Known Parents \n"
  }
  alert(personInfo + spouseInfo + allSiblings + allParents);
}

function findDescendants(person, people){
  let ancestorid = person.id;
  let descendantsList = [];
  descendantsList = findChildren(ancestorid, people, descendantsList);
  return descendantsList;
}

function findChildren(parentId, people){
  let childList = [];
  people.forEach(person => {
    if (person.parents.includes(parentId)) {
      childList.push(person);
      let grandchildList = findChildren(person.id, people);
    }
  });
  return childList;
}

function getPersonFirstLastName(person, relation = ""){
let personsFirstLastName = relation + " " + person.firstName + " " + person.lastName + "\n";
return personsFirstLastName;
}
    