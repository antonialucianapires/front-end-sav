export function GenericButton(props: any) {
    return (
        <button className={props.color} type={props.type}>{props.nameButton}</button>
    )
}