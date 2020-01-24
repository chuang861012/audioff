function init() {
    browser.runtime.onMessage.addListener(
        (message, sender) => {
            if (message.action === 'get') {
                const status = test();
                if (status === 'NoMediaElement' || status === 'SetSinkIdRequired') {
                    return Promise.resolve(status);
                } else {
                    const result = navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                        .then(() => navigator.mediaDevices.enumerateDevices())
                        .then(devices => devices)
                        .catch(e => console.log(e));
                    return Promise.resolve(result);
                }
            } else if (message.action === 'set') {
                const sinkId = message.id;
                set_device(sinkId)
            }
        }
    );
}

function test() {
    const mediaElement = document.querySelector('audio,video');
    if (!mediaElement) return 'NoMediaElement';
    else if (mediaElement.setSinkId === undefined) return 'SetSinkIdRequired';
    return 'Ok';
}

function set_device(sinkId) {
    const mediaElements = document.querySelectorAll('audio,video');
    mediaElements.forEach(e => {
        e.setSinkId(sinkId);
    });
}

init();