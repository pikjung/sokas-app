interface ActionProps {
    children: React.ReactNode
}

const Action: React.FC<ActionProps> = ({
    children
}) => {
    return ( 
        <div className="left-0 flex justify-end gap-2">
            {children}
        </div>
     );
}
 
export default Action;