import "../css/rendogtv.css";

console.log("Renbot assistant!");

let selectedUser = null;

setTimeout(() => {
  const chat = document.querySelector(".stream-chat");

  const messagesList = chat.querySelector(
    ".chat-scrollable-area__message-container"
  );

  const config = { childList: true, subtree: true };

  const handleMessage = (element) => {
    console.log("new addition");

    let message = element;

    // Check if element has class chat-line__message
    if (!element.classList.contains("chat-line__message")) {
      message = element.querySelector(".chat-line__message");
    }

    if (!message) return;

    console.log("New message!");

    const messageText = message.querySelector(".text-fragment")?.textContent;

    if (!messageText) {
      console.log("No text");
      return;
    }

    const messageAuthor = message.querySelector(
      ".chat-author__display-name"
    )?.textContent;

    if (!messageAuthor) {
      console.log("No author");
      return;
    }

    const messageLine = message.querySelector(".chat-line__no-background");

    if (!messageLine) {
      console.log("No line");
      return;
    }

    const punishableDiv = document.createElement("div");
    const punishableButton = document.createElement("button");
    punishableDiv.appendChild(punishableButton);
    punishableDiv.classList.add("renbot-punishable");

    const svgContainer = document.createElement("div");
    svgContainer.classList.add("renbot-svg-container");

    svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>target-account</title><path d="M20.95,11H22.5V13H20.95C20.5,17.17 17.17,20.5 13,20.95V22.5H11V20.95C6.83,20.5 3.5,17.17 3.05,13H1.5V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1.5H13V3.05C17.17,3.5 20.5,6.83 20.95,11M5.07,11H6.5V13H5.07C5.5,16.07 7.93,18.5 11,18.93V17.5H13V18.93C16.07,18.5 18.5,16.07 18.93,13H17.5V11H18.93C18.5,7.93 16.07,5.5 13,5.07V6.5H11V5.07C7.93,5.5 5.5,7.93 5.07,11M16,16H8V15C8,13.67 10.67,13 12,13C13.33,13 16,13.67 16,15V16M12,8A2,2 0 0,1 14,10A2,2 0 0,1 12,12A2,2 0 0,1 10,10A2,2 0 0,1 12,8Z" /></svg>`;
    punishableButton.appendChild(svgContainer);

    punishableButton.classList.add("mod-icon", "renbot-punishable-button");
    punishableButton.addEventListener("click", () => {
      const dialog = document.querySelector(".renbot-dialog");

      selectedUser = messageAuthor;

      openModal();
    });

    messageLine.prepend(punishableDiv);
  };

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const messages = mutation.addedNodes;

        for (const message of messages) {
          console.log(message);
          handleMessage(message);
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  messagesList.childNodes.forEach((message) => {
    console.log(message);
    handleMessage(message);
  });

  observer.observe(messagesList, config);
}, 3000);

// A dialog
const dialog = document.createElement("dialog");
dialog.classList.add("renbot-dialog");
dialog.innerHTML = `
    <div class="renbot-dialog-content">
        <header>
            <h2>Renbot</h2>
            <button class="renbot-dialog-close-button">X</button>
        </header>
        <div class="renbot-dialog-body">
            <p>Punish user</p>

            <div class="renbot-dialog-punishment">
                
            </div>
            
            <div class="renbot-dialog-close">
                <button class="renbot-dialog-close-button renbot-button">Cancel</button>
            </div>
        </div>
    </div>
`;

document.body.appendChild(dialog);

chrome.runtime
  .sendMessage({
    type: "getPunishableCommands",
  })
  .then((response) => {
    let punishableButtonDiv = document.querySelector(
      ".renbot-dialog-punishment"
    );

    const commands = response.commands;

    commands?.forEach((value) => {
      const button = document.createElement("button");
      button.classList.add("renbot-dialog-punishment-button");
      button.textContent = value.command;

      button.addEventListener("click", async () => {
        chrome.runtime.sendMessage({
          type: "punish",
          command: value.command,
          user: selectedUser,
        });

        dialog.close();
      });

      punishableButtonDiv.appendChild(button);
    });
  });

const openModal = async () => {
  dialog.showModal();
};

const dialogCloseButton = dialog.querySelectorAll(
  ".renbot-dialog-close-button"
);

dialogCloseButton.forEach((value) => {
  value.addEventListener("click", () => {
    dialog.close();
  });
});
