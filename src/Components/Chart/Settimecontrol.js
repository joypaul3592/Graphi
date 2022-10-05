const Settime = (setIsLoaded) => {
    return setTimeout(() => {
        setIsLoaded(true)
    }, 200);
}
export { Settime };