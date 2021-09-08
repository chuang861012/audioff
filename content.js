(function () {
    function set_device(sinkId) {
        const mediaElements = document.querySelectorAll('audio,video');
        mediaElements.forEach(e => {
            e.setSinkId(sinkId);
        });
    }

    function test() {
        const mediaElement = document.querySelector('audio,video');
        if (!mediaElement) return 'NoMediaElement';
        else if (mediaElement.setSinkId === undefined) return 'SetSinkIdRequired';
        return 'Ok';
    }

    browser.runtime.onMessage.addListener(
        async () => {
            const status = test();
            switch (status) {
                case 'NoMediaElement':
                    alert('Media not found.');
                    break;
                case 'SetSinkIdRequired':
                    alert('Please enable setSinkId to switch audio device.\n1. Open about:config in firefox.\n2. Search for media.setsinkid.enabled.\n3. Set the value to true.');
                    break;
                case 'Ok':
                    const selected = await navigator.mediaDevices.selectAudioOutput();
                    set_device(selected.deviceId);
                    break;
            }
        }
    );
})();