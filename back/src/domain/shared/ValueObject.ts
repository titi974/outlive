export default interface ValueObject<T> {
    sameValueAs: (value: T) => boolean
}
