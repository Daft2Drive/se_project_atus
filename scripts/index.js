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


// Functions
// Open Modal
function openModal() {
    modal.classList.add('modal__opened');
    document.addEventListener('keydown', handleEscKey);
}

// Close Modal
function closeModal() {
    modal.classList.remove('modal__opened');
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
    cardsList.innerHTML = ''; // Clear the cards list before rendering
    cards.forEach((card) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        const cardImage = cardClone.querySelector('.card__image');
        const cardTitle = cardClone.querySelector('.card__title');
        const cardButton = cardClone.querySelector('.card__button');

        cardImage.src = card.link;
        cardImage.alt = card.name;
        cardTitle.textContent = card.name;
       // cardButton.textContent = 'Like'; // Customize the button text if needed
        cardsList.appendChild(cardClone);
    });
}

// Initialize the page with the initial cards
renderCards(initialCards);


// Event Listeners
profileEditModal.addEventListener("click", openModal);
profileCloseModal.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});