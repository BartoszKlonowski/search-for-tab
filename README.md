<p align="center">
    <h1 align="center">
        <img align="center" src="./app/icons/mainIcon.png" width="100px" height="100px"/>
        Search for Tab
    </h1>
</p>
<p align="center">
    Easily search for a certain tab you have open among many
</p>
<p align="center">
    <a href="https://github.com/BartoszKlonowski/search-for-tab/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/BartoszKlonowski/search-for-tab?style=plastic" alt="How Long Ive Been Here is released under the GNU GPL v3 license." />
    </a>
    <a href="https://github.com/BartoszKlonowski/search-for-tab/actions/workflows/SearchForTab-UT.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/BartoszKlonowski/search-for-tab/SearchForTab-UT.yml?label=Tests&style=plastic" alt="Unit Tests status" />
    </a>
    <a href="https://github.com/BartoszKlonowski/search-for-tab/actions/workflows/SearchForTab-CI.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/BartoszKlonowski/search-for-tab/SearchForTab-CI.yml?label=Extension%20verification&style=plastic" alt="Package verification status" />
    </a>
</p>

This project is the Mozilla Firefox extension plugin.
<br/>This plugin allows to find a tab with given title, phrase or url and quickly navigate to it.

---

## Installation & Usage ##

This extension can be installed by:
* installing it via the Mozilla add-ons market by clicking the button bellow:<br/><a href="https://addons.mozilla.org/pl/firefox/addon/search-for-tab/"><img src="./.github/resources/get-the-addon.png" alt="" /></a>
* downloading it directly from the [Releases page](https://github.com/BartoszKlonowski/search-for-tab/releases) and install it manually in your browser

After installing you will see the icon opening the extension popup.

| | |
|:-|:-:|
| The popup, in it's basic state contains the text input field to enter the searching phrase. | <img width="400" height="auto" src=".github/resources/Example-EmptySearch-View.png" alt="" /> |
| The search can be done: <br/>**by the tab's title** - the text visible on the tab right to the website icon <br/>or <br/>**by the URL of the website** the tab has loaded.<br/>Bu default the search phrase is case insensitive, but to enable the case matching click on the `Aa` icon to the right of text input field. |<img width="400" height="auto" src=".github/resources/SFT-Demo-Rec.gif" alt="" />|

**To navigate** to a tab when scrolling through the search results, simply click on it.

**To close** the tab from the search results list by click the `X` icon on the right of the tab's tile.

---

## Translations and accessibility ##

This add-on is provided with tooltips and hints translated to several languages.
<br/>However, if you see that your language is not supported or any lack of accessibility suport please report this by creating an [issue](https://github.com/BartoszKlonowski/search-for-tab/issues/new).
<br/>Or you can provide the support to specific language or accessibility by making a [pull request](https://github.com/BartoszKlonowski/search-for-tab/compare) (please see further for how to develop this extension).

---

## Development ##

If you plan to implement changes to this extension:

1. Clone your fork of this repository
2. Run `npm install` in the root of this repository to install all the dependencies and tools<br/>Please make sure to have the `npm` installed first.
3. Implement your changes and test them:
<br/>Manually by following [these steps](https://extensionworkshop.com/documentation/develop/debugging/)
<br/>Or automatically by running `npm run test` and `npm run build` in the root of your clone

