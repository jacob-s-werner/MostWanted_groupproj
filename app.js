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
      singleTraitSearch(people)
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
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
    let userInputTrait = prompt("Enter the trait you want to search");
    let lowerCaseUserInputTrait = userInputTrait.toLowerCase();
    
    switch(lowerCaseUserInputTrait){
      case "id":
      case "gender":
      case "dob":
      case "height":
      case "weight":
      case "eyecolor":
      case "occupation":
      let peopleWithTraitDescription = singleTraitDescriptionSearch(lowerCaseUserInputTrait, people);
      displayPeople(peopleWithTraitDescription);
      break;
      default:
        alert("Wrong Input, try typing a correct trait again");
      return singleTraitSearch(people); // ask again
    }
}

function singleTraitDescriptionSearch(trait, people){
  let userInputDescription = prompt("Enter the trait description you want to search for");
  let lowerCaseUserInputDescription = userInputDescription.toLowerCase();
  
  let peopleListWithTraitDescription = people.filter(person => person[trait] == lowerCaseUserInputDescription);

  if (peopleListWithTraitDescription.length > 0) {
    return peopleListWithTraitDescription;
    
  } else {
    let userChoice = prompt("No person found with matching description. Type the option to 'retry', 'menu' or 'quit'");
    switch(userChoice){
      case "retry":
      singleTraitSearch(trait, people);
      break;
      case "menu":
      app(people);
      break;
      case "quit":
      return;
      default:
      singleTraitSearch(trait, people);
    }
  }
}

function multiTraitDescriptionSearchTwo(people){
  //list of traits to search for
  let countOfTraits = prompt("Available traits to search by are: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse'. Please enter the quantity of traits you would like to search with a numeric key between 2 and 5.");
  let countOfTraitsStr = countOfTraits.toString();
  switch(countOfTraitsStr){
    case "2":
      let trait1 = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
      
 
      let listOfPPLWithTrait1 = singleTraitDescriptionSearch(trait1, people);
      let traitTwoC = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
      let listOfPPLWithTraitTwo = singleTraitDescriptionSearch(traitTwoC, listOfPPLWithTrait1);
      var listToDisplay = listOfPPLWithTraitTwo;
      break;
    case "3":
      let traitA = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
 
      let listOfPPLWithTrait1One = singleTraitDescriptionSearch(traitA, people);
      let traitTwo = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitTwoD = singleTraitDescriptionSearch(traitTwo, listOfPPLWithTrait1one);
    let traitThree = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitThree = singleTraitDescriptionSearch(traitThree, listOfPPLWithTraitTwoD);

    var listToDisplay = listOfPPLWithTraitThree;
    return;
    case "4":
      let traitB = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
      let listOfPPLWithTrait1E = singleTraitDescriptionSearch(traitB, people);
      let traitTwoA = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitTwoF = singleTraitDescriptionSearch(traitTwoA, listOfPPLWithTrait1E);
    let traitThreeA =  prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitThreeG = singleTraitDescriptionSearch(traitThreeA, listOfPPLWithTraitTwoF);
    let traitFour = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitFour =  lsingleTraitDescriptionSearch(traitFour, listOfPPLWithTraitThreeG);
    var listToDisplay = listOfPPLWithTraitFour;
    break;



    case "5":
      let trait = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
      let listOfPPLWithTrait1two = singleTraitDescriptionSearch(trait, people);

      let traitTwoH = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitTwoI = singleTraitDescriptionSearch(traitTwoH, listOfPPLWithTrait1twoI);
    let traitThreeJ = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitThreek = singleTraitDescriptionSearch(traitThreeJ, listOfPPLWithTraitTwo);
    let traitFourL = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitFourN =  singleTraitDescriptionSearch(traitFourL, listOfPPLWithTraitThreeK);
    let traitFiveM = prompt("Please enter a trait from the following list: 'id', 'firstname', 'gender', 'dob', 'height','weight', 'eyecolor', 'occupation', 'parent', 'currentspouse' ");
    let listOfPPLWithTraitFive =  lsingleTraitDescriptionSearch(traitFiveM, listOfPPLWithTraitFourN);
    var listToDisplay = listOfPPLWithTraitFive;

    break;
    default:
      alert("Input not validated.");
    multiTraitDescriptionSearch(people);
    break;

    
  }
 // array.forEach(_element => listToDisplay)
   // alert(element)
      forEach(element in listToDisplay)
      {
        alert(element);
      };
      
      
    
  
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
