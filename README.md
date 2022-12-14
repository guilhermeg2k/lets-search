# Lets Search

<center>

![Logo](https://i.imgur.com/FZWUwjy.png)

</center>

## Features

Quick search on the browser by the command `lets-search.search` or by a hotkey (the default it's `ctrl+shift+q`)

![Search Screenshot](https://i.imgur.com/bFJOY5L.png)

### Custom Engines

You can set custom engines on the Extension Settings and use them as `${ENGINEKEY}:${QUERY}`:

![Search Screenshot](https://i.imgur.com/IW7w91N.png)

## Extension Settings

- `lets-search.engines` List of search engines:

```json
"lets-search.engines": [
    {
      "key": "g",
      "url": "https://www.google.com/search?q={%query%}",
      "default": true,
    }
  ]
```
