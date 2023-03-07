export const throttle = (fn: Function, wait: number) => {
    let timer: number | undefined = undefined;
    return function (...args: any[]) {
        if (timer) { return }
        timer = setTimeout(() => {
            fn(args);
            timer = undefined;
        }, wait);
    }
}