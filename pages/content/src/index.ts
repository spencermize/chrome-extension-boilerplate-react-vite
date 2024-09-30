console.log('Hello from the content script!');
function logPageContent() {
  const content = document.body.innerText;
  console.log('Current page content:', content);

  // Send the content back to the background script or other parts of your extension
  chrome.runtime.sendMessage({ type: 'PAGE_CONTENT', content });
}

// Set up a MutationObserver to watch for changes in the body
const observer = new MutationObserver(logPageContent);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial content log
logPageContent();
