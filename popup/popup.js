const connectBtn = document.querySelector(".connectBtn"),
  showResult = document.querySelector(".result"),
  connected = document.querySelector(".connected>b"),
  skipped = document.querySelector(".skipped>b");

let intervalId;
let idx = 0,
  connectedCount = 0,
  skippedCount = 0;

connectBtn.addEventListener("click", async () => {
  console.log("popup console");

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

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  intervalId = setInterval(() => {
    chrome.tabs.sendMessage(tab.id, { idx }, ({ res, done }) => {
      if (done && res === "notFound") {
        showResult.innerText = "Oops! No account found";
        connectBtn.innerText = "Try again!";
        connectBtn.style.backgroundColor = "#16e453";
        return clearInterval(intervalId);
      }

      if (done) {
        connectBtn.innerText = "Completed";
        connectBtn.disabled = true;
        connectBtn.style.cursor = "not-allowed";
        connectBtn.style.backgroundColor = "#8edba5";
        clearInterval(intervalId);
      }
      const isConnected = res.includes("Connected");

      if (isConnected) {
        connected.innerText = ++connectedCount;
      } else {
        skipped.innerText = ++skippedCount;
      }

      showResult.style.color = isConnected ? "#16e453" : "#ffaa9f";

      showResult.innerHTML = res;
      idx++;
    });
  }, 2000);
});
