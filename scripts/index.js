const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountain",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements
const profileEditModal = document.querySelector('.modal_type_edit-profile');
const profileCloseModal = profileEditModal.querySelector('.modal__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardModal = document.querySelector('.modal_type_add-card');
const addCardCloseModal = addCardModal.querySelector('.modal__close');
const addCardButton = document.querySelector('.profile__add-button');
const previewModal = document.querySelector('.modal_type_preview');
const previewImage = previewModal.querySelector('.modal__preview-img');
const previewTitle = previewModal.querySelector('.modal__preview-title');
const previewCloseButton = previewModal.querySelector('.modal__close');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template');
const nameInput = profileEditModal.querySelector('.modal__input_type_name');
const descriptionInput = profileEditModal.querySelector('.modal__input_type_description');
const profileFormElement = profileEditModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Functions

// Open Modal
function openModal(modalElement) {
  modalElement.style.display = 'flex';
  setTimeout(() => {
    modalElement.classList.add('modal_opened');
  }, 10);
  document.addEventListener('keydown', handleEscKey);
}

// Close Modal
function closeModal(modalElement) {
  modalElement.classList.remove('modal_opened');
  modalElement.addEventListener('transitionend', () => {
    modalElement.style.display = 'none';
  }, { once: true });
  document.removeEventListener('keydown', handleEscKey);
}

// Close Modal with Esc key
function handleEscKey(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Render Cards
function renderCards(cards) {
  cardsList.innerHTML = ''; // Clear existing cards
  cards.forEach((card) => {
    const cardElement = generateCard(card);
    cardsList.appendChild(cardElement);
  });
}

// Handle Profile Form Submission
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const description = descriptionInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closeModal(profileEditModal);
}

// Handle Add Card Form Submission
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = addCardFormElement.querySelector('.modal__input_type_title');
  const urlInput = addCardFormElement.querySelector('.modal__input_type_url');
  const newCard = {
    name: titleInput.value,
    link: urlInput.value
  };
  const cardElement = generateCard(newCard);
  cardsList.prepend(cardElement);
  addCardFormElement.reset();
  closeModal(addCardModal);
}

// Generate Card
function generateCard(cardData) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardLikeButton = cardClone.querySelector('.card__like-button');
  const cardDeleteButton = cardClone.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Toggle like button
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('card__like-button_active');
  });

  // Delete card
  cardDeleteButton.addEventListener('click', () => {
    cardClone.remove();
  });

  // Open preview modal
  cardImage.addEventListener('click', () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewTitle.textContent = cardData.name;
    openModal(previewModal);
  });

  return cardClone;
}

// Initialize the page with the initial cards
renderCards(initialCards);

// Event Listeners
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseModal.addEventListener("click", () => closeModal(profileEditModal));
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseModal.addEventListener("click", () => closeModal(addCardModal));
previewCloseButton.addEventListener("click", () => closeModal(previewModal));

// Close modals when clicking overlay
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Form submissions
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);