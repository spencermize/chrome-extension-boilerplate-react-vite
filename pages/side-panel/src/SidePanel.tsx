import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useRef } from 'react';

const SidePanel = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      const childFrame = frameRef.current?.contentWindow;
      if (!childFrame) {
        console.error('Child frame is not accessible');
        return;
      }

      const messageHandler = (message: any, sender: chrome.runtime.MessageSender) => {
        console.log('message received in SidePanel:', message);
        if (message.type === 'PAGE_CONTENT') {
          childFrame.postMessage({ type: 'PAGE_CONTENT', content: message.content }, '*');
        }
      };

      chrome.runtime.onMessage.addListener(messageHandler);

      // Cleanup on component unmount
      return () => {
        chrome.runtime.onMessage.removeListener(messageHandler);
      };
    };

    const iframeElement = frameRef.current;
    if (iframeElement) {
      iframeElement.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframeElement) {
        iframeElement.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  return (
    <iframe ref={frameRef} src="https://localhost:3000" className="App" title="Side Panel" width="100%" height="100%" />
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
