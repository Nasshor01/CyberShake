// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Funkce pro změnu třídy, pohlaví a rasy a jejich zobrazení
    const classes = ['hacker', 'street_samurai'];
    const genders = ['male', 'female'];
    const races = ['human', 'cybermutant'];

    let currentClassIndex = 0;
    let currentGenderIndex = 0;
    let currentRaceIndex = 0;

    // Funkce pro aktualizaci náhledu obrázku postavy
    function updatePreview() {
        const selectedClass = classes[currentClassIndex];
        const selectedGender = genders[currentGenderIndex];
        const selectedRace = races[currentRaceIndex];

        let imageName;

        // Generování názvu souboru obrázku podle kombinace třídy, pohlaví a rasy
        if (selectedRace === 'cybermutant') {
            if (selectedClass === 'street_samurai') {
                imageName = `cybermutant_samurai_${selectedGender}.png`;
            } else {
                imageName = `cybermutant_${selectedClass}_${selectedGender}.png`;
            }
        } else {
            imageName = `${selectedClass}_${selectedGender}.png`;
        }

        console.log(`Název obrázku: ${imageName}`);  // Debug log pro kontrolu názvu obrázku

        // Aktualizace obrázku
        const characterImage = document.getElementById('character-preview-image');
        if (characterImage) {
            characterImage.src = `assets/characters/${imageName}`;
        }

        // Aktualizace textu výběru
        document.getElementById('class-name').innerText = selectedClass === 'hacker' ? 'Hacker' : 'Pouliční Samuraj';
        document.getElementById('gender-name').innerText = selectedGender === 'male' ? 'Muž' : 'Žena';
        document.getElementById('race-name').innerText = selectedRace === 'human' ? 'Člověk' : 'Kybermutant';
    }

    // Funkce pro změnu třídy postavy
    function changeClass(direction) {
        if (direction === 'next') {
            currentClassIndex = (currentClassIndex + 1) % classes.length;
        } else {
            currentClassIndex = (currentClassIndex - 1 + classes.length) % classes.length;
        }
        updatePreview();
    }

    // Funkce pro změnu pohlaví postavy
    function changeGender(direction) {
        if (direction === 'next') {
            currentGenderIndex = (currentGenderIndex + 1) % genders.length;
        } else {
            currentGenderIndex = (currentGenderIndex - 1 + genders.length) % genders.length;
        }
        updatePreview();
    }

    // Funkce pro změnu rasy postavy
    function changeRace(direction) {
        if (direction === 'next') {
            currentRaceIndex = (currentRaceIndex + 1) % races.length;
        } else {
            currentRaceIndex = (currentRaceIndex - 1 + races.length) % races.length;
        }
        updatePreview();
    }

    // Připojíme event listener pro tlačítka přepínání tříd, pohlaví a ras
    document.querySelectorAll("button[onclick^='changeClass']").forEach(button => {
        button.addEventListener("click", (e) => {
            const direction = e.target.innerText.includes('→') ? 'next' : 'previous';
            changeClass(direction);
        });
    });

    document.querySelectorAll("button[onclick^='changeGender']").forEach(button => {
        button.addEventListener("click", (e) => {
            const direction = e.target.innerText.includes('→') ? 'next' : 'previous';
            changeGender(direction);
        });
    });

    document.querySelectorAll("button[onclick^='changeRace']").forEach(button => {
        button.addEventListener("click", (e) => {
            const direction = e.target.innerText.includes('→') ? 'next' : 'previous';
            changeRace(direction);
        });
    });

    // Potvrzení výběru postavy
    const confirmButton = document.querySelector("button[onclick^='confirmSelection']");
    if (confirmButton) {
        confirmButton.addEventListener("click", function() {
            const selectedClass = classes[currentClassIndex];
            const selectedGender = genders[currentGenderIndex];
            const selectedRace = races[currentRaceIndex];
            const characterName = document.getElementById('character-name').value;

            if (characterName.trim() === '') {
                alert('Prosím zadejte jméno postavy.');
                return;
            }

            const characterData = {
                name: characterName,
                class: selectedClass,
                race: selectedRace,
                gender: selectedGender,
            };

            localStorage.setItem('characterData', JSON.stringify(characterData));
            alert(`Postava ${characterName} byla úspěšně vytvořena!`);
        });
    }

    // Načtení při načtení stránky
    updatePreview();
});
