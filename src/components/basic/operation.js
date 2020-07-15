/**
 * @return {null}
 */
export function Flag(props) {
    if (props.flag) {
        return props.children;
    } else if (props.else) {
        return props.else;
    }
    return null;
}