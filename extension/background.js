

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        fetch(chrome.runtime.getURL('/modal.html'))
            .then(response => response.text())
            .then(data => {
                // document.querySelectorAll('main')[0].innerHTML = data;
                sendRenderedHTML(data);
                // other code
                // eg update injected elements,
                // add event listeners or logic to connect to other parts of the app
            })
        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
);


async function sendRenderedHTML(modal) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, {
        msg: "renderHTML",
        data: modal
    });
    console.log(response);
}
