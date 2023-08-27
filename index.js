let array = {};

const generateArray = (number) => {
    array = {};
    array.length = 0;

    for (let i = 0; i < number; i++) {
        const index = i;
        const element = Math.floor(Math.random() * 1000);
        
        renderArrayElement(index, element);
    }
}

const renderArrayElement = (index, element) => {
    const $arrayRow = document.createElement("array-row");
    const $arrayIndex = document.createElement("array-index");
    const $arrayElement = document.createElement("array-element");
    const $arrayElementText = document.createElement("span");

    $arrayIndex.innerText = index;
    $arrayElementText.innerText = element;

    const gerenateColor = () => {
        return Math.floor(Math.random() * (155 - 0));
    }

    const r = gerenateColor();
    const g = gerenateColor();
    const b = gerenateColor();
    $arrayElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    $arrayRow.classList.add("array-row");
    $arrayIndex.classList.add("array-index");
    $arrayElement.classList.add("array-element");

    const $array = document.getElementById('array');
    $array.appendChild($arrayRow);
    $arrayRow.appendChild($arrayIndex);
    $arrayRow.appendChild($arrayElement);
    $arrayElement.appendChild($arrayElementText);
}

generateArray(50);
debugger;

/*
        <div class="array-row">
            <div class="array-index">
                0
            </div>
            <div class="array-element">
                14
            </div>
        </div>
*/