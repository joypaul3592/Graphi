const Settime = (setIsLoaded) => {
    return setTimeout(() => {
        setIsLoaded(true)
    }, 10);
}
export { Settime };