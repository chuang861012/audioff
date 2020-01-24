const container = document.getElementById('container');
const loader = document.getElementById('loader');
const setSinkIdRequired = document.getElementById('SetSinkIdRequired');
const noMediaElement = document.getElementById('NoMediaElement');

function init() {
    browser.tabs.query({ active: true, currentWindow: true },
        (tabs) => {
            const activeTab = tabs[0];
            browser.tabs.sendMessage(activeTab.id,
                { action: 'get' },
                { 'frameId': 0 } // only request from main frame
            ).then(response => {
                loader.remove();
                if (response === 'NoMediaElement') {
                    noMediaElement.style.display = 'block';
                } else if (response === 'SetSinkIdRequired') {
                    setSinkIdRequired.style.display = 'block';
                } else {
                    response.map(device => {
                        if (device.kind === 'audiooutput') {
                            const btn = document.createElement('button');
                            btn.textContent = device.label;
                            btn.classList.add('btn');
                            btn.dataset.sinkId = device.deviceId;
                            container.appendChild(btn);
                        }
                    })
                }
            });

            document.body.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn')) {
                    browser.tabs.sendMessage(activeTab.id,
                        { action: 'set', id: e.target.dataset.sinkId },
                        { 'frameId': 0 }
                    )
                }
            });
        }
    )
}

init();