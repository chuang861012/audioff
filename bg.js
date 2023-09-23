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
            await browser.scripting.executeScript({
                files: ["content.js"],
                target: {
                    tabId: tab.id
                }
            });
            break;
    }
})