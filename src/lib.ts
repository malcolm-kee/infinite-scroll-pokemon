interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

export function throttle<Params extends any[]>(fn: CallBack<Params>, wait = 250, context = null) {
  let timeout: undefined | number = undefined;
  let args: undefined | Params = undefined;

  const later = () => {
    args && fn.apply(context, args);
    timeout = undefined;
  };

  return function(...ars: Params) {
    if (!timeout) {
      args = ars;
      timeout = window.setTimeout(later, wait);
    }
  };
}
