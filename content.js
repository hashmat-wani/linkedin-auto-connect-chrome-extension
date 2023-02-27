console.log("chrome extension running");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const elements = document.querySelectorAll(".entity-result__item");

  if (!elements.length) {
    return sendResponse({ res: "notFound", done: true });
  }

  const { idx } = request;
  let done = false;
  if (idx >= elements.length - 1) {
    done = true;
  }

  // getting the name of person
  const personName = elements[idx].querySelector(
    ".entity-result__title-line.entity-result__title-line--2-lines>span>a>span>span"
  ).innerText;

  // connect button refrence
  const connectBtn = elements[idx].querySelector(
    ".entity-result__actions.entity-result__divider .artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view"
  );

  // text of the connect btn to check if its CONNECT or not
  const connectBtnText = connectBtn.querySelector(
    ".artdeco-button__text"
  ).innerText;

  if (connectBtnText === "Connect") {
    connectBtn.click();

    // handling dialog box to send the connection request
    setTimeout(() => {
      const sendBtn = document.querySelector(
        ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1"
      );
      if (sendBtn) sendBtn.click();
    }, 0);
    return sendResponse({ res: `Connected <b>${personName}</b>`, done });
  } else {
    return sendResponse({ res: `Skipped <b>${personName}</b>`, done });
  }
});
