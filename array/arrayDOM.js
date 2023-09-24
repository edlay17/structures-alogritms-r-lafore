class ArrayDOM {
    constructor(rootId = 'array', iterationsId = 'iterations') {
        this.$array = document.getElementById(rootId);
        this.activeIndex = -1;
        this.$iterations = document.getElementById(iterationsId);
    }

    getArrayRow(index) {
        return this.$array.querySelector(`.id-${index}`);
    }

    renderArrayElement(index, element) {
        const $arrayRow = document.createElement('array-row');
        const $arrayIndex = document.createElement('array-index');
        const $arrayElement = document.createElement('array-element');
        const $arrayElementText = document.createElement('span');
    
        $arrayRow.classList.add(`id-${index}`);
        $arrayIndex.innerText = index;
        $arrayElementText.innerText = element;

        $arrayRow.classList.add('array-row');
        $arrayIndex.classList.add('array-index');
        $arrayElement.classList.add('array-element');
    
        this.$array.appendChild($arrayRow);
        $arrayRow.appendChild($arrayIndex);
        $arrayRow.appendChild($arrayElement);
        $arrayElement.appendChild($arrayElementText);
    }

    clearArray() {
        this.$array.innerHTML = '';
    }

    removeArrayElement(index) {
        const $arrayRow = this.getArrayRow(index);
        $arrayRow.remove();
    }

    changeArrayElement(index, element) {
        const $arrayRow = this.getArrayRow(index);
        const $arrayElementText = $arrayRow.querySelector('array-element span');
        $arrayElementText.innerText = element;
    }

    setActive(index = -1) {
        if (this.activeIndex !== -1) {
            const $arrayRow = this.getArrayRow(this.activeIndex);
            const $arrayElement = $arrayRow.querySelector('array-element');
            $arrayElement.style.backgroundColor = '';
        }

        if (index !== -1) {
            const $arrayRow = this.getArrayRow(index);
            const $arrayElement = $arrayRow.querySelector('array-element');
            $arrayElement.style.backgroundColor = 'green';
        }
        
        this.activeIndex = index;
    }

    changeIterationsCount(value) {
        this.$iterations.innerText = value;
    }
}