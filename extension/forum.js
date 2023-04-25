function toggleClass(nodes, className, index) {
    console.log(index);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove(className);
    }
    nodes[index].classList.add(className)
}

function addClickEventsInFolder() {
    const nodes = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('click', function (node) {
            const nodes = document.querySelectorAll('label.option');
            toggleClass(nodes, 'radio-active', i);
        })
    }
}

function addOptionsInModal(folders) {
    var allFolder = "";
    folders.forEach((elem, index) => {
        allFolder += `
        <input type="radio" name="select" class="radio-option" id="option-${index}">
        <label for="option-${index}" class="option option-${index}">
              <span>${elem.name}</span>
        </label>
      `
    })
    document.querySelector('.wrapper').innerHTML = allFolder;
    addClickEventsInFolder();
}