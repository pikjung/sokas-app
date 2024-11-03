interface ContainerProps {
  children: React.ReactNode,
  flex: boolean,
  wrap: boolean
}

const Container: React.FC<ContainerProps> = ({
  children,
  flex,
  wrap
}) => {
  return (
    <div
      className={
        `
          container
          mx-auto max-w-screen-2xl px-4 md:px-8
          ${flex ? ' flex gap-2' : ''}
          ${wrap ? ' flex-wrap' : 'flex-nowrap'}
          -z-20
        `
      }
    >
      {children}
    </div>
  );
}

export default Container;