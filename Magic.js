document.addEventListener("DOMContentLoaded", function() {
    let chosen_card = [];
    let clickCount = 0;
    const magicDeck = document.querySelector('.Magic_deck');
    let shuffled_deck = [];
    let isdeckshuffled = false;

    // Function to shuffle deck
    function shuffle() {
        if (!isdeckshuffled) {
            const imageSources = [
                { src: "Magic_Cards/1.png", value: "[1, 1]", data_value: 1 },
                { src: "Magic_Cards/2.png", value: "[2, 1]", data_value: 2 },
                { src: "Magic_Cards/3.png", value: "[3, 1]", data_value: 3 },
                { src: "Magic_Cards/4.png", value: "[4, 1]", data_value: 4 },
                { src: "Magic_Cards/5.png", value: "[1, 2]", data_value: 5 },
                { src: "Magic_Cards/6.png", value: "[2, 2]", data_value: 6 },
                { src: "Magic_Cards/7.png", value: "[3, 2]", data_value: 7 },
                { src: "Magic_Cards/8.png", value: "[4, 2]", data_value: 8 },
                { src: "Magic_Cards/9.png", value: "[1, 3]", data_value: 9 },
                { src: "Magic_Cards/10.png", value: "[2, 3]", data_value: 10 },
                { src: "Magic_Cards/11.png", value: "[3, 3]", data_value: 11 },
                { src: "Magic_Cards/12.png", value: "[4, 3]", data_value: 12 },
                { src: "Magic_Cards/13.png", value: "[1, 4]", data_value: 13 },
                { src: "Magic_Cards/14.png", value: "[2, 4]", data_value: 14 },
                { src: "Magic_Cards/15.png", value: "[3, 4]", data_value: 15 },
                { src: "Magic_Cards/16.png", value: "[4, 4]", data_value: 16 }
            ];

            // Shuffle the image sources array
            for (let i = imageSources.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [imageSources[i], imageSources[j]] = [imageSources[j], imageSources[i]];
            }

            shuffled_deck = imageSources;
            isdeckshuffled = true;
            return imageSources;
        }
    }

    // Function to initialize the deck
    function initializeDeck() {
        // Get all the buttons with the class 'img_btn'
        const imgBtns = document.querySelectorAll(".img_btn");

        // Assign the shuffled images and values to the deck buttons
        imgBtns.forEach((btn, index) => {
            const img = btn.querySelector(".Deck");
            img.src = shuffled_deck[index].src;
            btn.value = shuffled_deck[index].value;
            btn.setAttribute('data-value', shuffled_deck[index].data_value);
        });

        // Reattach click event listeners to the buttons
        attachButtonClickEvents(imgBtns);
    }

    function initializeshuffledDeck() {
        shuffle();
        initializeDeck();
    }

    // Function to attach click event listeners to the buttons
    function attachButtonClickEvents(buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                clickCount++;
                chosen_card.push(this);

                // Disabling buttons logic
                this.disabled = true;

                const buttonValue = JSON.parse(this.value);
                for (let i = 1; i <= 4; i++) {
                    let btn_row = [i, buttonValue[1]];
                    let btn_col = [buttonValue[0], i];

                    if (!arraysEqual(buttonValue, btn_row)) {
                        disableButtonsWithValue(btn_row);
                    }

                    if (!arraysEqual(buttonValue, btn_col)) {
                        disableButtonsWithValue(btn_col);
                    }
                }

                // Change content after 4 clicks
                if (clickCount === 4) {
                    alterMagicDeckContent();
                    let sum = compute(chosen_card);
                    contentFiller(chosen_card, sum);

                    // Remove resize event listener
                    window.removeEventListener('resize', adjustLayout);
                }
            });
        });
    }

    // Function to disable buttons with a specific value
    function disableButtonsWithValue(valueToDisable) {
        const buttons = document.querySelectorAll('.img_btn');
        buttons.forEach(btn => {
            const btnValue = JSON.parse(btn.value);
            if (arraysEqual(btnValue, valueToDisable)) {
                btn.disabled = true;
                btn.classList.add('disabled');
            }
        });
    }

    // Function to compare arrays
    function arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    // Function to alter the content of the Magic_deck container
    function alterMagicDeckContent() {
        magicDeck.innerHTML = `
            <div class="card_row_transition">
                <div class="chosen_card">
                    <div class="value"><h1>1</h1></div>
                    <div class="card">
                        <img class="chosen" src="">
                    </div>
                </div>
                <div class="chosen_card">
                    <div class="value"><h1>2</h1></div>
                    <div class="card">
                        <img class="chosen" src="">
                    </div>
                </div>
                <div class="chosen_card">
                    <div class="value"><h1>3</h1></div>
                    <div class="card">
                        <img class="chosen" src="">
                    </div>
                </div>
                <div class="chosen_card">
                    <div class="value"><h1>34</h1></div>
                    <div class="card">
                        <img class="chosen" src="">
                    </div>
                </div>
            </div>
            
            <div class="card_row_transition">
                <button class="play_again" value="">
                    <h1>Play Again</h1>
                </button>
            </div>
        `;

        // Add event listener to the "Play Again" button
        document.querySelector('.play_again').addEventListener('click', function() {
            resetMagicDeck();

            // Re-add resize event listener
            window.addEventListener('resize', adjustLayout);
        });
    }

    // Function to fill the content with chosen card images and values
    function contentFiller(chosen_cards, sum) {
        const chosenCardDivs = document.querySelectorAll(".chosen_card");
        chosenCardDivs.forEach((div, index) => {
            const pickedImage = div.querySelector(".chosen");
            const pickedValue = div.querySelector(".value h1");
            pickedImage.src = chosen_cards[index].querySelector("img").src;
            pickedValue.textContent = sum[index];
        });
    }

    // Function to compute sum of chosen card values
    function compute(chosen_cards) {
        let card_values = [];
        let total = 0;
        for (const card of chosen_cards) {
            const cardDataValue = parseInt(card.getAttribute('data-value'));
            total += cardDataValue;
            card_values.push(total);
        }
        return card_values;
    }

    // Function to reset the magic deck
    function resetMagicDeck() {
        clickCount = 0;
        chosen_card = [];
        isdeckshuffled = false
        adjustLayout();
    }

    //HTML layout change from screen resizing below 1025px
    function adjustLayout() {
        const width = window.innerWidth;

        if (width < 1025) {
            magicDeck.innerHTML = `
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
            `;
        } else {
            magicDeck.innerHTML = `
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
                <div class="card_row">
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                    <button class="img_btn" value="">
                        <img class="Deck" src="">
                    </button>
                </div>
            `;
        }

        initializeshuffledDeck();
    }

    // Attach resize event listener
    window.addEventListener('resize', adjustLayout);

    // Initial setup
    adjustLayout();
});
