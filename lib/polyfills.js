// usefull polyfills

// Proxy (not babel support)
// Proxies are used in services
// from https://gist.github.com/rauschma/b29fbd27d7fea63b9b19
if (!window.Proxy) {
  Object.prototype.__Get__ = function (propKey, receiver) {
    receiver = receiver || this
    var desc = this.__GetOwnProperty__(propKey)
    if (desc === undefined) {
        var parent = this.__GetPrototypeOf__()
        if (parent === null) return undefined
        return parent.__Get__(propKey, receiver)
    }
    if ('value' in desc) {
        return desc.value
    }
    var getter = desc.get
    if (getter === undefined) return undefined;
    return getter.__Call__(receiver, []);
  }
  Object.prototype.__GetOwnProperty__ = function (propKey) {
      return Object.getOwnPropertyDescriptor(this, propKey);
  }
  Object.prototype.__Call__ = function (receiver, argArray) {
      this.apply(receiver, argArray)
  }

  function Proxy(target, handler) {
      this.__target__ = target
      this.__handler__ = handler
  }
  // Override default __Get__
  Proxy.prototype.__Get__ = function (propKey, receiver) {
      // Omitted: invariant checks
      var getTrap = this.__handler__.get
      if (getTrap) {
          return getTrap.call(handler, this.__target__, propKey, receiver)
      } else {
          return this.__target__.__Get__(propKey, receiver)
      }
  }
  window.Proxy = Proxy
}
