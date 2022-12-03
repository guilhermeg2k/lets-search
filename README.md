# Lets Search

## Features

Quick search on the browser by the command `lets-search.search` or by a hotkey (the default it's `ctrl+shift+g`)

![Search Screenshot](https://i.imgur.com/bFJOY5L.png)

### Custom Engines

You can set custom engines on the Extension Settings and use them as `${ENGINEKEY}:${QUERY}`:

![Search Screenshot](https://i.imgur.com/IW7w91N.png)

## Extension Settings

- `ls-search.engines` List of search engines, default:

```json
"ls-search.engines": [
    {
      "key": "g",
      "url": "https://www.google.com/search?q={%query%}"
    }
  ]
```
