function replaceAllText(oldText, newText) {
  // Replace all occurrences of oldText in text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.includes(oldText)) {
      node.nodeValue = node.nodeValue.replaceAll(oldText, newText);
    }
  }
}

function keepReplacing(oldText, newText) {
  // Initial run
  replaceAllText(oldText, newText);

  // Watch for any future DOM changes (e.g. React re-renders)
  const observer = new MutationObserver(() => replaceAllText(oldText, newText));
  observer.observe(document.body, { childList: true, subtree: true });
}

// Run it!
keepReplacing("Connections", "Friends");
keepReplacing("Connect", "Friends");
keepReplacing("Charts", "Games");
keepReplacing("Marketplace", "Catalog");