const popup = document.querySelector('.popup')
const elements = document.querySelector('.elements')

//Картинка
const popupImageElementImage = document.querySelector('.bigimage__image')
const popupImageElementTitle = document.querySelector('.bigimage__title')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__subtitle')
//Форма добавления карточки
const addForm = document.querySelector('.popup__form[name="form-name_add"]')
const cardNameInput = document.querySelector('.popup__field[name="name_add"]')
const cardLinkInput = document.querySelector('.popup__field[name="description_add"]')
//Форма профиля
const popupFormProfile = document.querySelector('.popup__form[name="form-name_profile"]')
const nameInput = document.querySelector('.popup__field[name="name_profile"]')
const descriptionInput = document.querySelector('.popup__field[name="description_profile"]')
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
const createButton = popupAddImage.querySelector('.popup__button')



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
// editButton.addEventListener('click', () => openPopup(popupProfile));
editButton.addEventListener('click', function(){
  openPopup(popupProfile)
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});
buttonCloseAddImage.addEventListener('click', () => closePopup(popupAddImage))
buttonCloseProfile.addEventListener('click', () => closePopup(popupProfile))
buttonCloseImageElement.addEventListener('click', () => closePopup(popupImageElement))
//Открытие картинки фул
function showImage(imageLink, name) {
  openPopup(popupImageElement);
  popupImageElementImage.src = imageLink;
  popupImageElementTitle.textContent = name;
  popupImageElementImage.alt = name;
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
function handleSubmitCreateCard (evt) {
  evt.preventDefault();
  renderCard(createCard(cardNameInput.value, cardLinkInput.value))
  cardNameInput.value ='';
  cardLinkInput.value ='';
  closePopup(popupAddImage)
}
//Слушатели
popupFormProfile.addEventListener('submit', handleFormSubmitProfile);
addForm.addEventListener('submit', handleSubmitCreateCard);
//Новая карточка
function createCard(cardNameValue, cardLinkValue) {
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
//Карточки из массива
function defaultCard(cards) {
    elements.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        document.querySelector('.elements').append(createCard(cards[i].name, cards[i].link))
    }
}
defaultCard(initialCards);