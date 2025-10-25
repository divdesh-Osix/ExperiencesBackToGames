document.getElementById("replaceBtn").addEventListener("click", async () => {
  // Run the replacement code in the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // The same code that replaces "Charts" → "Games"
      function replaceAllText(oldText, newText) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue.includes(oldText)) {
            node.nodeValue = node.nodeValue.replaceAll(oldText, newText);
          }
        }
      }
      replaceAllText("Charts", "Games");
    }
  });
});
