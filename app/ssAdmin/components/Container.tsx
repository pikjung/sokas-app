interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <main className="flex w-full">
            {children}
        </main>
     );
}
 
export default Container;