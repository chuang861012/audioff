function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

browser.menus.create({
    id: "s",
    title: "Audio output select",
    contexts: ["all"]
}, onCreated);

browser.menus.onClicked.addListener(async (info, tab) => {
    switch (info.menuItemId) {
        case "s":
            await browser.tabs.executeScript(tab.id,{
                file:"content.js",
                allFrames: true
            });
            break;
    }
})