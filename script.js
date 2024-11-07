// script.js

document.addEventListener("DOMContentLoaded", function() {
    const confirmButton = document.querySelector("button");
    
    // Načtení dříve uložených údajů o postavě, pokud jsou k dispozici
    if (localStorage.getItem("characterData")) {
        const savedData = JSON.parse(localStorage.getItem("characterData"));
        alert(`Vítejte zpět! Dříve jste si vybrali: \nTřída: ${savedData.class}\nRasa: ${savedData.race}\nPohlaví: ${savedData.gender}`);
        displayCharacterImage(savedData.class, savedData.race, savedData.gender);
    }
    
    confirmButton.addEventListener("click", function() {
        const selectedClass = document.querySelector('input[name="class"]:checked').value;
        const selectedRace = document.querySelector('input[name="race"]:checked').value;
        const selectedGender = document.querySelector('input[name="gender"]:checked').value;

        // Uložení údajů o postavě do local storage
        const characterData = {
            class: selectedClass,
            race: selectedRace,
            gender: selectedGender
        };

        localStorage.setItem("characterData", JSON.stringify(characterData));
        
        alert(`Vybrali jste: \nTřída: ${selectedClass}\nRasa: ${selectedRace}\nPohlaví: ${selectedGender}`);
        
        // Zobrazení zvolené postavy
        displayCharacterImage(selectedClass, selectedRace, selectedGender);
    });

    function displayCharacterImage(selectedClass, selectedRace, selectedGender) {
        let imageName;

        // Generování názvu obrázku podle třídy, pohlaví a rasy
        if (selectedRace === 'cybermutant') {
            imageName = `cybermutant_${selectedClass}_${selectedGender}.png`;
        } else {
            imageName = `${selectedClass}_${selectedGender}.png`;
        }

        console.log(`Název obrázku: ${imageName}`); // Debugovací výpis názvu obrázku

        const characterImage = document.getElementById('character-preview-image');
        characterImage.src = `assets/characters/${imageName}`;
    }
});
