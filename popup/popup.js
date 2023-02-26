const connect = document.querySelector(".connect"),
  inivitationsSent = document.querySelector("#inivitations-sent p");

connect.addEventListener("click", async () => {
  // console.log("extension popup window");
  let action;
  const btnText = connect.innerText;
  if (btnText === "START CONNECTING") {
    action = "start";
    connect.innerText = "Stop Connecting";
    connect.style.backgroundColor = "#ffaa9f";
  } else {
    action = "stop";
    connect.innerText = "Start Connecting";
    connect.style.backgroundColor = "#16e453";
  }

  // chrome.storage.sync.get("count", ({ count }) => {
  //   console.log("count", count);
  // });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: startConnecting,
    args: [action],
  });
});

function startConnecting(action) {
  // console.log("Tab window");

  const elements = document.querySelectorAll(".entity-result__item");
  for (let i = 0; i < elements.length; i++) {
    setTimeout(() => {
      // getting the name of person
      const personName = elements[i].querySelector(
        ".entity-result__title-line.entity-result__title-line--2-lines>span>a>span>span"
      ).innerText;

      // connect button refrence
      const connectBtn = elements[i].querySelector(
        ".entity-result__actions.entity-result__divider .artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view"
      );

      // text of the connect btn to check if its CONNECT or not
      const connectBtnText = connectBtn.querySelector(
        ".artdeco-button__text"
      ).innerText;

      if (connectBtnText === "Connect") {
        console.log(`Connected ${personName}`);
        connectBtn.click();

        // handling dialog box to send the connection request
        setTimeout(() => {
          const sendBtn = document.querySelector(
            ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1"
          );
          if (sendBtn) sendBtn.click();
        }, 0);
      } else {
        console.log(`Skipped ${personName}`);
      }
    }, (i + 1) * 2000);
  }
}

function stopConnecting() {
  console.log("inside stop", intervalId);
  if (intervalId) clearInterval(intervalId);
  console.log("stopped");
}
