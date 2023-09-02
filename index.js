const getRandomNumner = () => Math.floor(Math.random() * 1000);

const clearArray = () => {
    const $array = document.getElementById('array');
    $array.innerHTML = '';
}

const renderArrayElement = (index, element) => {
    const $arrayRow = document.createElement('array-row');
    const $arrayIndex = document.createElement('array-index');
    const $arrayElement = document.createElement('array-element');
    const $arrayElementText = document.createElement('span');

    $arrayRow.setAttribute('id', index);
    $arrayIndex.innerText = index;
    $arrayElementText.innerText = element;

    const gerenateColor = () => {
        return Math.floor(Math.random() * (155 - 0));
    }

    const r = gerenateColor();
    const g = gerenateColor();
    const b = gerenateColor();
    $arrayElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    $arrayRow.classList.add('array-row');
    $arrayIndex.classList.add('array-index');
    $arrayElement.classList.add('array-element');

    const $array = document.getElementById('array');
    $array.appendChild($arrayRow);
    $arrayRow.appendChild($arrayIndex);
    $arrayRow.appendChild($arrayElement);
    $arrayElement.appendChild($arrayElementText);
}

class Array {
    constructor(number) {
        this.array = {};
        this.generate(number);
    }
  
    generate(number) {
        const array = this.array;

        array.length = 0;
    
        for (let i = 0; i < number; i++) {
            array.length += 1;
            const index = array.length - 1;
            
            renderArrayElement(index, getRandomNumner());
        }

    }

    push = (element) => {
        this.array.length;

        const index = this.array.length;
        this.array.length = this.array.length + 1;

        renderArrayElement(index, element);
    } 
}

let array = new Array(10);
array.push(100);