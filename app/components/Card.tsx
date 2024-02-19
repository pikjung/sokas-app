
interface CardProps {
  header?: string,
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  header,
  children
}) => {
  return (
    <div
      className="
        block 
        rounded-lg 
        bg-white 
        p-4
        border
        w-full
      "
    >
      <h5
        className="
          mb-2
          text-xl
          font-medium
          leading-tight
          text-neutral-800
        "
      >
        {header}
      </h5>
      {children}
    </div>
  );
}

export default Card;