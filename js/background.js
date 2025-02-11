chrome.runtime.onInstalled.addListener(() => {});

const validExternalOrigins = ["http://localhost", "https://renbot.net"];

let domain = "https://renbot.net";

if (chrome.runtime.id === "hpcgmfbjfmgibnpfhencmldplmadiahj") {
  domain = "http://localhost";
}

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log({
      request,
      sender,
      sendResponse,
    });

    if (!validExternalOrigins.includes(sender.origin)) {
      console.log("Invalid origin");
      sendResponse({ message: "Invalid origin", success: false });
      return;
    }

    if (request.token) {
      chrome.storage.local.set({ token: request.token }).then(() => {
        console.log("Successfully set token");
      });

      sendResponse({ message: "Successfully set token", success: true });
      return;
    }

    sendResponse({ message: "Something went wrong", success: false });
  }
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url &&
    [
      "https://www.twitch.tv/rendogtv",
      "https://www.twitch.tv/moderator/rendogtv",
    ].includes(tab.url)
  ) {
    if (changeInfo.status === "loading") {
      // Reset injected state on page reload
      chrome.storage.session.remove(`injected-${tabId}`);
    }

    if (changeInfo.status === "complete") {
      chrome.storage.session.get(`injected-${tabId}`, (result) => {
        if (!result[`injected-${tabId}`]) {
          // Inject JS file
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["js/rendogtv.js"],
          });

          // Inject CSS file
          chrome.scripting.insertCSS({
            target: { tabId },
            files: ["css/rendogtv.css"],
          });

          // Mark the tab as injected
          chrome.storage.session.set({ [`injected-${tabId}`]: true });
        }
      });
    }
  }
});

// Clear state when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.remove(`injected-${tabId}`);
});

const validExtensionOrigins = [
  "http://localhost",
  "https://renbot.net",
  "https://www.twitch.tv",
];

const getPunishableCommands = async (token) => {
  const response = await fetch(`${domain}/api/punishable-commands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

const punish = async (token, command, user) => {
  const response = await fetch(`${domain}/api/punish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      command: command,
      user: user,
    }),
  });

  console.log(response);

  return;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log({
    request,
    sender,
    sendResponse,
  });

  (async () => {
    if (!validExtensionOrigins.includes(sender.origin)) {
      console.log("Invalid origin");
      sendResponse({ message: "Invalid origin", success: false });
      return;
    }

    const token = await chrome.storage.local.get("token");

    console.log({
      type: request.type,
    });

    switch (request.type) {
      case "getPunishableCommands":
        const commands = await getPunishableCommands(token.token);
        console.log(commands);
        sendResponse({ commands });
        break;

      case "punish":
        const response = await punish(
          token.token,
          request.command,
          request.user
        );
        sendResponse({ message: "Punish", success: true });
        break;

      default:
        break;
    }
  })();

  return true;
});
