# LinkedIn AutoConnect

LinkedIn AutoConnect is a Chrome extension that automates the process of sending connection requests to a list of people in a LinkedIn search. This can save a lot of time for users who want to expand their network quickly and easily.

## Features

- Automatically sends connection requests on LinkedIn by clicking on **Start Connecting** button.
- Automatically handles the popup window for each request
- Stops automatically after sending requests on the current page.
- Users can stop and start again the request-sending process. The extension will resume where it left off.

## Installation

To install the extension, follow these steps:

- Clone this repository to your local machine by running the below command:

  ```
  git clone https://github.com/hashmat-noorani/linkedin-auto-connect-chrome-extension.git
  ```

- Unzip the cloned file.
- Open Chrome and navigate to
  ```
  chrome://extensions
  ```
- Enable Developer mode by clicking the toggle switch in the upper-right corner.
- Click the "Load unpacked" button and select the unzipped folder.

## Usage

- Navigate to the LinkedIn search page where you would like to send connection requests.
  ```
    https://www.linkedin.com/search/results/people/
  ```
- Click the extension icon in the toolbar to open the popup.
- Click the **Start Connecting** button to begin sending connection requests.
- The extension will automatically send connection requests to all the users listed on the search page.
- Once the requests have been sent, the extension will display a summary of the number of requests sent and the number of requests it skipped.

## Privacy

This extension requires the following permissions:

- tabs: Allows the extension to interact with browser tabs.
- https://_.linkedin.com/_: Allows the extension to access LinkedIn pages.
- scripting: Allows the extension to inject scripts into the LinkedIn page to send connection requests.

This extension only accesses LinkedIn.com and does not collect any personal information from the user.
