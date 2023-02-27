const content = document.querySelector(".content"),
  connected = content.querySelector(".connected>b"),
  skipped = content.querySelector(".skipped>b"),
  showResult = content.querySelector(".result"),
  connectBtn = content.querySelector(".connectBtn");

let intervalId;
let idx = 0,
  connectedCount = 0,
  skippedCount = 0;

connectBtn.addEventListener("click", async () => {
  console.log("popup console");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // checking if tab url is linkedin or not
  if (!tab.url.includes("linkedin.com")) {
    content.innerHTML =
      "INFO: The extension you are trying to access is not available for this website. Please note that it is only available for LinkedIn.com.";

    return;
  }

  // toggling button b/w start and stop
  const btnText = connectBtn.innerText;
  if (btnText === "STOP CONNECTING") {
    intervalId && clearInterval(intervalId);
    connectBtn.innerText = "Start Connecting";
    connectBtn.style.backgroundColor = "#16e453";
    showResult.innerText = "Click below to Resume";
    return;
  }

  connectBtn.innerText = "Stop Connecting";
  connectBtn.style.backgroundColor = "#ffaa9f";
  showResult.innerText = "Connecting...";

  intervalId = setInterval(() => {
    // sending idx no to content.js and receiving result
    chrome.tabs.sendMessage(tab.id, { idx }, ({ res, done }) => {
      // if no button is found to connect
      if (done && res === "notFound") {
        showResult.innerText = "Oops! No account found";
        connectBtn.innerText = "Try again!";
        connectBtn.style.backgroundColor = "#16e453";
        return clearInterval(intervalId);
      }

      // if connecting is completed
      if (done) {
        idx = 0;
        connectBtn.innerText = "Completed";
        connectBtn.disabled = true;
        connectBtn.style.cursor = "not-allowed";
        connectBtn.style.backgroundColor = "#8edba5";
        clearInterval(intervalId);
      }

      // checking if skipped or connected
      const isConnected = res.includes("Connected");

      if (isConnected) {
        connected.innerText = ++connectedCount;
      } else {
        skipped.innerText = ++skippedCount;
      }

      showResult.style.color = isConnected ? "#16e453" : "#ffaa9f";

      showResult.innerHTML = res;

      !done && idx++;
    });
  }, 3000);
});
