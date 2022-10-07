interface ITestProps {
    displayText: string;
}

export const Test = (props: ITestProps) => {
    return <div>{props.displayText}</div>
}