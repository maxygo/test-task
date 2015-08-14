function ActionManager(container, dManager) {

    function init() {
        createButton('Submit', submitForm);
        createButton('Reset', resetForm);
    }

    function submitForm() {
        var result = dManager.getSelectedOptions();
        console.log(result);
    }

    function resetForm() {
        dManager.reset();
        console.log('reset');
    }

    function createButton(name, callback) {
        var button = document.createElement("button");
        button.id = name;
        button.innerHTML = name;
        button.onclick = callback;
        container.appendChild(button);
    }

    init();

    return this;
}