document.addEventListener("DOMContentLoaded", function() {
    const savedCharacter = localStorage.getItem('characterData');
    if (savedCharacter) {
        const characterData = JSON.parse(savedCharacter);
        
        // Nastavení základních údajů o postavě
        document.getElementById('profile-name').innerText = characterData.name;
        document.getElementById('profile-class').innerText = characterData.class === 'hacker' ? 'Hacker' : (characterData.class === 'street_samurai' ? 'Pouliční Samuraj' : 'Samuraj');
        document.getElementById('profile-race').innerText = characterData.race === 'human' ? 'Člověk' : 'Kybermutant';
        document.getElementById('profile-gender').innerText = characterData.gender === 'male' ? 'Muž' : 'Žena';

        // Nastavení náhledu postavy
        let imageName;
        if (characterData.race === 'cybermutant') {
            imageName = characterData.class === 'hacker' ? `cybermutant_hacker_${characterData.gender}.png` : `cybermutant_samurai_${characterData.gender}.png`;
        } else {
            imageName = characterData.class === 'hacker' ? `human_hacker_${characterData.gender}.png` : `human_street_samurai_${characterData.gender}.png`;
        }
        document.getElementById('profile-image').src = `../assets/characters/${imageName}`;

        // Nastavení atributů
        const attributes = characterData.attributes || {
            strength: 5,
            intelligence: 5,
            dexterity: 5,
            endurance: 5,
            luck: 5,
            technology: 5,
            cybernetics: 5,
            reflexes: 5
        };
        
        document.getElementById('attribute-strength').innerText = attributes.strength;
        document.getElementById('attribute-intelligence').innerText = attributes.intelligence;
        document.getElementById('attribute-dexterity').innerText = attributes.dexterity;
        document.getElementById('attribute-endurance').innerText = attributes.endurance;
        document.getElementById('attribute-luck').innerText = attributes.luck;
        document.getElementById('attribute-technology').innerText = attributes.technology;
        document.getElementById('attribute-cybernetics').innerText = attributes.cybernetics;
        document.getElementById('attribute-reflexes').innerText = attributes.reflexes;

        // Nastavení úrovně a zkušeností
        const level = characterData.level || 1;
        const xp = characterData.xp || 0;
        const xpToNextLevel = level * 100;

        document.getElementById('profile-level').innerText = level;
        document.getElementById('profile-xp').innerText = `${xp} / ${xpToNextLevel}`;
        updateXpBar(xp, xpToNextLevel);

        // Uložení dat zpět do localStorage
        localStorage.setItem('characterData', JSON.stringify({ ...characterData, attributes, level, xp }));

        // Aktualizace detailních hodnot atributů
        updateAttributeDetails(attributes, level);
    }
});

// Funkce pro zvýšení hodnoty atributu
window.increaseAttribute = function(attribute) {
    const savedCharacter = localStorage.getItem('characterData');
    if (savedCharacter) {
        const characterData = JSON.parse(savedCharacter);
        if (characterData.attributes) {
            characterData.attributes[attribute] += 1;

            // Aktualizace hodnoty atributu na stránce
            document.getElementById(`attribute-${attribute}`).innerText = characterData.attributes[attribute];

            // Přidání zkušeností při zvýšení atributu
            addXp(20); // Například 20 XP za zvýšení atributu

            // Uložení aktualizovaných atributů do localStorage
            localStorage.setItem('characterData', JSON.stringify(characterData));

            // Aktualizace detailních hodnot atributů
            updateAttributeDetails(characterData.attributes, characterData.level);
        }
    }
};

// Funkce pro přidání zkušeností a případné zvýšení úrovně
function addXp(amount) {
    const savedCharacter = localStorage.getItem('characterData');
    if (savedCharacter) {
        const characterData = JSON.parse(savedCharacter);
        characterData.xp = (characterData.xp || 0) + amount;

        const xpToNextLevel = characterData.level * 100;

        if (characterData.xp >= xpToNextLevel) {
            characterData.level += 1;
            characterData.xp -= xpToNextLevel;

            // Aktualizace úrovně na stránce
            document.getElementById('profile-level').innerText = characterData.level;
        }

        // Aktualizace zkušeností a XP bar
        document.getElementById('profile-xp').innerText = `${characterData.xp} / ${characterData.level * 100}`;
        updateXpBar(characterData.xp, characterData.level * 100);

        // Uložení dat zpět do localStorage
        localStorage.setItem('characterData', JSON.stringify(characterData));
    }
}

// Funkce pro aktualizaci XP bar
function updateXpBar(currentXp, xpToNextLevel) {
    const percentage = (currentXp / xpToNextLevel) * 100;
    document.getElementById('xp-bar-fill').style.width = `${percentage}%`;
}

// Funkce pro aktualizaci detailních hodnot atributů
function updateAttributeDetails(attributes, level) {
    document.getElementById('strength-defense').innerText = attributes.strength * 2; // Obrana = Síla * 2
    document.getElementById('intelligence-damage').innerText = attributes.intelligence * 3; // Poškození = Inteligence * 3
    document.getElementById('dexterity-dodge').innerText = attributes.dexterity * 2.5; // Vyhýbání = Obratnost * 2.5
    document.getElementById('endurance-health').innerText = attributes.endurance * 5 * (level + 1); // Životy = Výdrž * 5 * (úroveň + 1)
    document.getElementById('luck-crit').innerText = attributes.luck * 0.5 + "%"; // Krit. Zásah = Štěstí * 0.5 %
    document.getElementById('technology-bonus').innerText = attributes.technology * attributes.cybernetics / 2; // Technologie/kybernetika bonus
    document.getElementById('cybernetics-power').innerText = attributes.cybernetics * 1.5; // Zásahová síla
    document.getElementById('reflex-speed').innerText = attributes.reflexes * 1.8; // Rychlost
}
