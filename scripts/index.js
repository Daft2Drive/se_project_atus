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
const modal = document.querySelector('.modal');
const profileCloseModal = document.querySelector('.modal__close');
const profileEditModal = document.querySelector('.profile__edit-button');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template');
const nameInput = document.querySelector('.modal__input_type_name');
const descriptionInput = document.querySelector('.modal__input_type_description');
const profileFormElement = document.querySelector('.modal__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Functions //

// Open Modal
function openModal() {
    // Pre-fill inputs with current profile info
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;

    modal.classList.add('modal_opened');
    document.addEventListener('keydown', handleEscKey);
}

// Close Modal
function closeModal() {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', handleEscKey);
}

// Close Modal with Esc key
function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeModal();
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

// Handle Form Submission
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Prevent the default form submission
    const name = nameInput.value;
    const description = descriptionInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = description;
    closeModal();
}

function generateCard(cardData) {
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardImage = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');
    const cardButton = cardClone.querySelector('.card__button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    return cardClone;
}

// Initialize the page with the initial cards
renderCards(initialCards);

// Event Listeners //
profileEditModal.addEventListener("click", openModal);
profileCloseModal.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Add event listener to the form submission
profileFormElement.addEventListener("submit", handleProfileFormSubmit);