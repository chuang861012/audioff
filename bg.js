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
            browser.tabs.query({ active: true, currentWindow: true },
                (tabs) => {
                    const activeTab = tabs[0];
                    browser.tabs.sendMessage(activeTab.id,
                        { action: 'set'},
                        { 'frameId': 0 }
                    )
                }
            )
            break;
    }
})