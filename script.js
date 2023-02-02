const popup = document.querySelector('.popup')
const elements = document.querySelector('.elements')
const card = document.querySelector('.elements__item')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__subtitle')
const popupForm = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__fieldName')
const descriptionInput = document.querySelector('.popup__fieldDescription')

const cardNameInput = document.querySelector('.add__fieldName')
const cardLinkInput = document.querySelector('.add__fieldLink')
const addForm = document.querySelector('.add__form')
//Попапы
const popupAddImage = document.querySelector('.popup.popup_type_add')
const popupProfile = document.querySelector('.popup.popup_type_profile')
const popupImageElement = document.querySelector('.popup.popup_type_bigimage')
//Кнопки
const buttonCloseProfile = popupProfile.querySelector('.popup__close-icon')
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close-icon')
const buttonCloseImageElement = popupImageElement.querySelector('.popup__close-icon')
const savePopup = document.querySelector('.popup__button')
const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')
const createButton = document.querySelector('.add__button')



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
//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_oppened');
}
//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_oppened');
}
//Кнопки 
addButton.addEventListener('click', () => openPopup(popupAddImage));
editButton.addEventListener('click', () => openPopup(popupProfile));
buttonCloseAddImage.addEventListener('click', () => closePopup(popupAddImage))
buttonCloseProfile.addEventListener('click', () => closePopup(popupProfile))
buttonCloseImageElement.addEventListener('click', () => closePopup(popupImageElement))
savePopup.addEventListener('click', () => saveProfile(popupForm));
//Открытие картинки фул
function showImage(imageLink, name) {
  openPopup(popupImageElement);
  popupImageElement.querySelector('.bigimage__image').src = imageLink;
  popupImageElement.querySelector('.bigimage__title').textContent = name;
  popupImageElement.querySelector('.bigimage__image').setAttribute('alt', name);
};
//Сохранение профиля
function saveProfile() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
}
//Редактирование профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupProfile)
}
//Добавление карточки
function handleSubmitAddCard (evt) {
  evt.preventDefault();
  renderCard(addCard(cardNameInput.value, cardLinkInput.value))
  cardNameInput.value ='';
  cardLinkInput.value ='';
  closePopup(popupAddImage)
}
//Слушатели
popupForm.addEventListener('submit', handleFormSubmitProfile);
addForm.addEventListener('submit', handleSubmitAddCard);
//Новая карточка
function addCard(cardNameValue, cardLinkValue) {
    const itemTemplate = document.querySelector('#item-template').content;
    const itemElement = itemTemplate.querySelector('.elements__item').cloneNode(true);

    itemElement.querySelector('.elements__title').textContent = cardNameValue;
    itemElement.querySelector('.elements__image').src = cardLinkValue;

    //Слушатель лайков
    itemElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    })

    //Удаление Карточки
    itemElement.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
        evt.target.closest('.elements__item').remove();
    })
    //Открытие картинки 
    itemElement.querySelector('.elements__image').addEventListener('click', function(evt) {
      showImage(evt.target.src, cardNameValue);
    })
    return(itemElement);
}
//Добавление новой карточки
function renderCard(card) {
  elements.prepend(card);
}
//Кнопка 'Создать'
createButton.addEventListener('click', function(){
    let cardName = document.querySelector('.add__fieldName');
    let cardLink = document.querySelector('.add__fieldLink');

    addCard(cardName.value, cardLink.value)
    add.classList.remove('add_oppened');
});
//Карточки из массива
function defaultCard(cards) {
    elements.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        document.querySelector('.elements').append(addCard(cards[i].name, cards[i].link))
    }
}
defaultCard(initialCards);