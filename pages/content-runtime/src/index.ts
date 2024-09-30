const logPageContent = () => {
  const content = document.body.innerText;
  // Send content to the background script if necessary
  chrome.runtime.sendMessage({ type: 'PAGE_CONTENT', content });
};

const observer = new MutationObserver(logPageContent);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial content log
logPageContent();
