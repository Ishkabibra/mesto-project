const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close-icon')

const addButton = document.querySelector('.profile__add-button')
const add = document.querySelector('.add')
const closeAddButton = document.querySelector('.add__close-icon')

const elements = document.querySelector('.elements')
const saveButton = document.querySelector('.add__button')
const card = document.querySelector('.elements__item')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__subtitle')
const popupForm = document.querySelector('.popup__form')
const savePopup = document.querySelector('.popup__button')
const nameInput = document.querySelector('.popup__fieldName')
const descriptionInput = document.querySelector('.popup__fieldDescription')


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//Открытие popup
editButton.addEventListener('click', function() {
    popup.classList.add('popup_oppened');
});
//Закрытие popup
closePopupButton.addEventListener('click', function(){
    popup.classList.remove('popup_oppened');
});
//Открытие окна создания карточки
addButton.addEventListener('click', function() {
    add.classList.add('add_oppened');
});
//Закрытие окна создания карточки
closeAddButton.addEventListener('click', function(){
    add.classList.remove('add_oppened');
});

function saveProfile() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
}

popupForm.addEventListener('submit', handleFormSubmitProfile);
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup.classList.remove('popup_oppened');
}
savePopup.addEventListener('click', () => saveProfile(popupForm));

function addCard(cardNameValue, cardLinkValue) {
    const itemTemplate = document.querySelector('#item-template').content;
    const itemElement = itemTemplate.querySelector('.elements__item').cloneNode(true);

    itemElement.querySelector('.elements__title').textContent = cardNameValue;
    itemElement.querySelector('.elements__image').src = cardLinkValue;

    //Слушатель лайков
    itemElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active')
    })

    //Удаление Карточки
    itemElement.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
        evt.target.closest('.elements__item').remove();
    })
    
    elements.prepend(itemElement);
}
//Кнопка 'Создать'
saveButton.addEventListener('click', function(){
    let cardName = document.querySelector('.add__fieldName');
    let cardLink = document.querySelector('.add__fieldLink');

    addCard(cardName.value, cardLink.value)
    add.classList.remove('add_oppened');
});

//Карточки из массива
function defaultCard(cards) {
    document.querySelector('.elements').innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        document.querySelector('.elements').append(addCard(cards[i].name, cards[i].link))
    }
}
defaultCard(initialCards);