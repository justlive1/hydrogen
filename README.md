# hydrogen

## introduction

```

nwjs .


```

debug

- ⌘ + ⌥ + i
- nw --remote-debugging-port=9222

leave fullscreen mode with ESC key

```
nw.App.registerGlobalHotKey(new nw.Shortcut({
  key: "Escape",
  active: function () {
    // decide whether to leave fullscreen mode
    // then ...
    nw.Window.get().leaveFullscreen();
  }
}));
```
