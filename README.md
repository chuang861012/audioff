# audioff

Select audio output device for each tab.
You can simply right click on any page to open the context menu and click "Audio output select" to use this add-on.

## Install

[Firefox](https://addons.mozilla.org/zh-TW/firefox/addon/audioff-audio-device-selector/)

## 2.1.0 update

Because of the feedback about the add-on requesting permission to access data for all websites.
Instead of setting up scripts for all pages, in this update the add-on inject the script into pages when needed.
Anyway, the add-on still have to inject scripts into pages in order to change the output device.

If you still have any concern, I suggest using this add-on as a bookmarklet.
This way you don't need to install any add-on to do the output changing.

## Bookmarklet setup

Create a bookmark and paste the following code into the url.
Click it on any page you want to change the output device.
This works the same as the add-on.

```
javascript:(async function(){function set_device(sinkId){const mediaElements=document.querySelectorAll('audio,video');mediaElements.forEach(e=>{e.setSinkId(sinkId)})}
function test(){const mediaElement=document.querySelector('audio,video');if(!mediaElement)return'NoMediaElement';else if(mediaElement.setSinkId===undefined)return'SetSinkIdRequired';return'Ok'}
const status=test();switch(status){case 'NoMediaElement':alert('Media not found.');break;case 'SetSinkIdRequired':alert('Please enable setSinkId to switch audio device.\n1. Open about:config in firefox.\n2. Search for media.setsinkid.enabled.\n3. Set the value to true.');break;case 'Ok':var selected=await navigator.mediaDevices.selectAudioOutput();set_device(selected.deviceId);break}})()
```

This code is minified from the content.js file.
Feel free to grab the source code there and minify it by yourself.

## For Firefox ESR or previous version user

The new version of this add-on (2.0.0) only works on Firefox 92.0 and after.  
You can install the old version in the version history.

## Usage

A extension to select specific audio output device for each tab.
Works on HTML5 `<audio> , <video>` element

**You will need to enable `media.setsinkid` in firefox to use this addon.**

## License

This extension is available under the MIT License.
