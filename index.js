const rick = fetch(
    "https://rickandmortyapi.com/api/character/17, 4, 60, 89, 118, 126, 141, 152, 5, 191, 202, 2, 252, 254, 265, 274, 1, 3, 353, 372, 440, 382, 721, 383, 388"
  );
  
  let array = [];
  let favoritesArray = [];
  let favoritesData = [];
  
  rick
    .then((data) => data.json())
    .then((data) => {
      array = data;
      array.forEach((person) => makeCard(person, ".main", "<span>♡</span>"));
      displayDataFunction();
    });
  
  function makeCard(element, collection, button) {
    const card = document.createElement("div");
    card.className = "mortyCards border";
    card.setAttribute("id", `${element.name}`);
    card.innerHTML = `
      <div class= "image-wrapper">
        <img src=${element.image} alt=${element.name}>
      </div>
      <h3>${element.name}</h3>
      <div class="overlay">
          <h6 class="card-stats">Species: ${element.species}</h6>
          <h6 class="card-stats">Origin: ${element.origin.name}</h6>
          <h6 class="card-stats">Status: ${element.status}</h6>
          <button onclick="likeButton()" class="like-button">${button}</button>
        </div>
    `;
    document.querySelector(collection).appendChild(card);
  }
  
  const checkIfArrayIncludes = (array, value) => {
    return array.includes(value);
  };
  
  function likeButton() {
    const cardClicked = event.target.parentElement.parentElement.parentElement;
    const parentContainer = cardClicked.parentElement;
    const id = cardClicked.id;
  
    const conditionOne = checkIfArrayIncludes(
      parentContainer.classList.value,
      "main"
    );
    const conditionTwo = checkIfArrayIncludes(
      parentContainer.classList.value,
      "favorites"
    );
    const paramsOne = conditionOne
      ? [array, favoritesArray, ".favorites", `<i class="fa-solid fa-xmark"></i>`]
      : [favoritesArray, array, ".main", `<span>♡</span>`];
  
    if (conditionOne || conditionTwo) {
      switchCollectionsArray(id, paramsOne[0], paramsOne[1]);
      cardClicked.remove("div");
      document.querySelector(paramsOne[2]).appendChild(cardClicked);
      cardClicked
        .querySelector(".overlay")
        .querySelector(".like-button")
        .remove("button");
      const newButton = document.createElement("button");
      newButton.setAttribute("onclick", "likeButton()");
      newButton.className = "like-button";
      newButton.innerHTML = paramsOne[3];
      cardClicked.querySelector(".overlay").append(newButton);
    }
    displayDataFunction();
  }
  
  function switchCollectionsArray(cardId, whichArray, whereTo) {
    const characterToMove = whichArray.find(
      (character) => character.name === cardId
    );
    const index = whichArray.findIndex(
      (object) => object.name === characterToMove.name
    );
    whichArray.splice(index, 1);
    whereTo.push(characterToMove);
  }
  
  function displayDataFunction() {
    document.querySelector(
      ".main-data"
    ).innerHTML = `<h4><strong>Main Data</strong></h4>`;
    document.querySelector(
      ".favorite-data"
    ).innerHTML = `<h4><strong>Favorites Data</strong></h4>`;
    const dataValueArrays = [
      ["status", "Alive", "Status Alive"],
      ["status", "Dead", "Status Dead"],
      ["species", "Human", "Species Human"],
      ["species", "Alien", "Species Alien"],
    ];
  
    for (let value of dataValueArrays) {
      appendCharacterDataToDropDownMenu(...value, array, ".main-data");
      appendCharacterDataToDropDownMenu(
        ...value,
        favoritesArray,
        ".favorite-data"
      );
    }
  }
  
  function appendCharacterDataToDropDownMenu(
    key,
    value,
    message,
    whichArray,
    appendWhere
  ) {
    let thisNumber = whichArray.filter((person) => person[key] === value);
    document.querySelector(
      appendWhere
    ).innerHTML += `${message}: ${thisNumber.length}<br><br>`;
  }
  
  function sortAnyWay(way) {
    [array, favoritesArray].forEach((collection) => {
      collection.sort((a, b) => {
        if (a.name > b.name) {
          return way === "asc" ? 1 : -1;
        } else {
          return way === "asc" ? -1 : 1;
        }
      });
    });
    deleteAll();
    array.forEach((person) => makeCard(person, ".main", "<span>♡</span>"));
    favoritesArray.forEach((person) =>
      makeCard(person, ".favorites", `<i class="fa-solid fa-xmark"></i>`)
    );
  }
  
  function deleteAll() {
    document.querySelector(".main").innerHTML = "";
    document.querySelector(".favorites").innerHTML = `
    <a id="scrollUpFavorites" class="border button-styles" href="#pageTopFavorites">
      <i class="fa-solid fa-arrow-up-long"></i>
    </a> `;
  }
  
  function addRemoveClass(action, classlist, className) {
    if (action === "remove") {
      classlist.remove(className);
    } else {
      classlist.add(className);
    }
  }
  
  function goToCollection(type) {
    const classlist1 = document.querySelector(".favorites-collection").classList;
    const classlist2 = document.getElementById("scrollUp").classList;
    const classlist3 = document.querySelector(".main-collection").classList;
  
    const params =
      type === "favorites"
        ? ["remove", "add", "add"]
        : ["add", "remove", "remove"];
  
    [classlist1, classlist2, classlist3].map((classlist, index) => {
      addRemoveClass(params[index], classlist, "display-none");
    });
  }
  
  function dataDropDownOpenClose(id, button) {
    const dataDropDownClassList = document.getElementById(id).classList;
    const buttonIsClosedTrueOrFalse =
      document.getElementById(button).innerHTML === "See Data" ? true : false;
  
    const dataMenuParameters = buttonIsClosedTrueOrFalse
      ? ["add", "Close Data"]
      : ["remove", "See Data"];
  
    addRemoveClass(
      dataMenuParameters[0],
      dataDropDownClassList,
      "translateY-down"
    );
    document.getElementById(button).innerHTML = dataMenuParameters[1];
  }
  // Function to Clear Search Input and Show All Cards
function clearSearch() {
  document.getElementById("search-input").value = "";
  const cards = document.querySelectorAll(".card-container .card");
  cards.forEach((card) => {
    card.style.display = ""; // Show all cards
  });
}
  
  const mobileOverlayClassList = document.getElementById(
    "mobile-responsive-screen-blackout-when-menu-selected"
  ).classList;
  
  function sliderTabOpenClose(id, button) {
    const dataMenuId = document.getElementById(id); 
    const dataMenuClassList = dataMenuId.classList.value;
    const preOpenCondition = checkIfArrayIncludes(
      dataMenuClassList,
      "translateX-left-and-up"
    );
    if (preOpenCondition) {
      addRemoveClass("remove", dataMenuId.classList, "translateX-left-and-up");
    }
  
    if (window.innerWidth < 1500) {
      Array.from(document.querySelectorAll(".tab-slide-function")).forEach(
        (button) => {
          button.classList.value.includes("translateX-left")
            ? addRemoveClass(
                "add",
                mobileOverlayClassList,
                "mobile-black-overlay"
              )
            : addRemoveClass(
                "remove",
                mobileOverlayClassList,
                "mobile-black-overlay"
              );
        }
      );
    }
  
    Array.from(document.querySelectorAll(".tab-slide-function")) 
      .forEach((button) => {
        const buttonClassList = button.classList;
        const buttonParams = buttonClassList.value.includes("translateX-left")
          ? "remove"
          : "add";
        addRemoveClass(buttonParams, buttonClassList, "translateX-left");
      });
  
    const tabButtonsArray = Array.from(
      document.querySelectorAll(".slider-tab-open")
    ); 
    tabButtonsArray.forEach((button) => {
      arrowButton =
        button.innerHTML === `<i class="fa-solid fa-chevron-right"></i>`
          ? `<i class="fa-solid fa-chevron-left"></i>`
          : `<i class="fa-solid fa-chevron-right"></i>`;
    });
    tabButtonsArray.forEach((button) => (button.innerHTML = arrowButton));
  
    const dataMenuCondition = checkIfArrayIncludes(
      dataMenuClassList,
      "translateY-down"
    );
  
    if (dataMenuCondition) {
      addRemoveClass("add", dataMenuId.classList, "translateX-left-and-up");
      dataDropDownOpenClose(id, button);
    }
  }
  
  function addRemoveTranslateXLeft(action) {
    Array.from(document.querySelectorAll(".tab-slide-function")).forEach(
      (button) => addRemoveClass(action, button.classList, "translateX-left")
    );
  }
  
  function sliderTabArrowDirectionChange(direction) {
    Array.from(document.querySelectorAll(".slider-tab-open")).forEach(
      (tab) =>
        (tab.innerHTML = `<i class="fa-solid fa-chevron-${direction}"></i>`)
    );
  }
  
  function hideNavTab() {
    addRemoveTranslateXLeft("add");
    sliderTabArrowDirectionChange("right");
  }
  
  function revealNavTab() {
    addRemoveTranslateXLeft("remove");
    sliderTabArrowDirectionChange("left");
  }
  
  function whichDataMenuButton() {
    let button = (document.querySelector('.favorites-collection').classList.value.includes('display-none')) 
                   ? 'main-data-dropdown'
                   : 'fav-data-dropdown';
        return button           
  }
  
  
  const dataMenuArray =  Array.from(document.querySelectorAll('.onscroll-event'));
  
  function onscrollCloseDataMenu() {
      let button = whichDataMenuButton();
     dataMenuArray
      .forEach((element) => {
        let id = element.id;
        if(element.classList.value.includes('translateY-down')) {
          addRemoveClass('add', element.classList, "translateX-left-and-up");
          dataDropDownOpenClose(id, button)
        }
      })
    
  }
  
  
  function RepositionDataMenu() {
    dataMenuArray
      .forEach((element) => {
        if(element.classList.value.includes('translateX-left-and-up')) {
          addRemoveClass('remove', element.classList, "translateX-left-and-up");
        }    
      })
    
  }
  
  document
    .querySelector(".favorites-collection")
    .addEventListener("scroll", (evt) => {
      if (evt.target.scrollTop > 220) {
        hideNavTab();
        onscrollCloseDataMenu()
      } else {
        revealNavTab();
        RepositionDataMenu()
      }
    });
  
  function onScrollHide() {
    window.onscroll = function () {
      if (window.pageYOffset > 180) {
        hideNavTab();
        addRemoveClass("remove", mobileOverlayClassList, "mobile-black-overlay");
        onscrollCloseDataMenu();
      } else if (window.pageYOffset < 220 && window.innerWidth > 1050) {
        revealNavTab();
        RepositionDataMenu()
      }
    };
  }
  onScrollHide();
  
  function addWidthListener(event) {
    window.addEventListener(event, () => {
      if (window.innerWidth < 1050) {
        hideNavTab();
        onscrollCloseDataMenu()
      } else {
        revealNavTab();
        RepositionDataMenu()
      }
    });
  }
  
  ["DOMContentLoaded", "resize"].forEach((item) => addWidthListener(item));  