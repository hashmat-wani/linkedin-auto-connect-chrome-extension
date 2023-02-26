const inivitationsSent = document.querySelector("#inivitations-sent p");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ count: inivitationsSent });
});
