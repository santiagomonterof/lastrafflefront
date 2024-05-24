type Props = {
    className?: string,
    width: number,
    height: number
}

const AddIcon = ({className, width, height}: Props) => {
    return (<svg width={width} height={height} viewBox="0 0 24 24" className={className}>
        <path d="M4 12H20M12 4V20" fill="none" stroke="currentColor" strokeWidth="3" 
            strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>);
}

export default AddIcon;