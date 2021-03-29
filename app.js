"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
//var lowerCaseTraits = ["id", "firstname", "gender", "dob","height","weight", "eyecolor", "occupation", "parent", "currentspouse"];

// app is the function called to start the entire application
function app(people){
  /* let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
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
       app(people); // restart app
      break;
  }
  
  let userChoice;

  if (searchResults.length > 1) {
    for (let index = 0; index < searchResults.length; index++) {
      userChoice = prompt("Do you want to look at " + searchResults[index].firstName + " " + searchResults[index].lastName + " information ? Type 'yes' or 'no'");
      if (userChoice.toLowerCase() === "yes") {
        searchResults = searchResults[index];
        break;
      }
    }
  }
*/
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  //mainMenu(searchResults, people);

  let searchResults = people[19]
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
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
       findFamilyMembers(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
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
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
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
    personInfo += "Current Spouse ID: " + person.currentSpouse;
  }
  // TODO: finish getting the rest of the information to display
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
  let lowerCaseUserInputDescription = userInputDescription.toLowerCase();
  
  let peopleListWithTraitDescription = people.filter(people => people[trait] == lowerCaseUserInputDescription);

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

    return listOfPPLWithTraits;
    default:
      alert("Input not validated.");
    multiTraitDescriptionSearch(people);
    break;
  }
}

function continueAddingSearchProperties(){
  let userchoice = prompt("Would you like to search for another? Enter 'y' for yes or 'n' for no.");
  let userChoceSt = userchoice.toString().toLowerCase();
  switch(userChoceSt){
    case "y":
      return true;
    break;
    default :
      return false;
    break;

}
}
function findFamilyMembers(person, people){
  
  let personsId = person.id;
  let spouseid = person.currentSpouse;
  //(find people where( person.parents === personsParents)
  
  let spouseOfPerson = people.filter(people => people.id == spouseid);
  let siblingsOfPerson, parentsOfPerson;

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

  displayPersonsFamily(person, spouseOfPerson, siblingsOfPerson, parentsOfPerson, people)
}

function displayPersonsFamily(person, spouseOfPerson, siblingsOfPerson, parentsOfPerson, people){

    let personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";

    if(spouseOfPerson != null){
      let spouseInfo = "Spouse First Name: " + spouseOfPerson.firstName + "\n";
      spouseInfo += "Spouse Last Name: " + spouseOfPerson.lastName + "\n";
      alert(spouseInfo);
    }
    
  
     let siblingsCount = siblingsOfPerson.count();
     let siblingsCountSt = siblingsCount.tostring();
     let parentCount = parentsOfPerson.count();
     let parentsCountSt = parentCount.tostring();
     var siblingInfo;
    var parentInfo;

     switch(siblingsCountSt){
         case "1":
           let siblingInfo1 = "Sibling First Name: " + siblingsOfPerson.firstName + "\n";
           siblingInfo1 += "Last Name: " + siblingsOfPerson.lastName + "\n";
           var siblingInfo = siblingInfo1;
         break;
        case "2":
  
            let siblingInfo2 = "Sibling First Name: " + siblingsOfPerson.atindex(0).firstName + "\n";
            siblingInfo2 += "Sibling Last Name: " + siblingsOfPerson.atindex(0).lastName + "\n";
            siblingInfo2 += "Sibling First Name: " + siblingsOfPerson.atindex(1).firstName + "\n";
            siblingInfo2 += "Sibling Last Name: " + siblingsOfPerson.atindex(1).lastName + "\n";
            siblingInfo = siblingInfo2;
       break;
       case "3":
          let siblingInfo3 = "Sibling First Name: " + siblingsOfPerson.atindex(0).firstName + "\n";
           siblingInfo3 += "Sibling Last Name: " + siblingsOfPerson.atindex(0).lastName + "\n";
           siblingInfo3 += "Sibling First Name: " + siblingsOfPerson.atindex(1).firstName + "\n";
          siblingInfo3 += "Sibling Last Name: " + siblingsOfPerson.atindex(1).lastName + "\n";
           siblingInfo3 += "Sibling First Name: " + siblingsOfPerson.atindex(2).firstName + "\n";
          siblingInfo3 += "Sibling Last Name: " + siblingsOfPerson.atindex(2).lastName + "\n";
          siblingInfo = siblingInfo3;
       break;
         }

      switch(parentsCountSt){
          case "1":
             let parentInfo1 = "Parent First Name: " + parentsOfPerson.firstName + "\n";
             parentInfo1 += "Last Name: " + parentsOfPerson.lastName + "\n";
            var parentInfo = parentInfo1;
            break;
          case "2":
              let parentInfo2 = "Parent First Name: " + parentsOfPerson.atindex(0).firstName + "\n";
              parentInfo2 += "Parent Last Name: " + parentsOfPerson.atindex(0).lastName + "\n";
              parentInfo2 += "parent First Name: " + parentsOfPerson.atindex(1).firstName + "\n";
               parentInfo2 += "Sibling Last Name: " + parentsOfPerson.atindex(1).lastName + "\n";
             parentInfo = parentInfo2;
         break
      }
  
    alert(personInfo, spouseInfo, sinblingInfo, parentInfo);
    }
  
