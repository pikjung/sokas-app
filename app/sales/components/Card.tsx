
interface CardProps {
  header?: string,
  children?: React.ReactNode,
  link?: string
}

const Card: React.FC<CardProps> = ({
  header,
  children,
  link
}) => {
  return (
    <div className="w-full border rounded-lg p-5">
      {header ?
        <div className="flex flex-nowrap">
          <h2 className="flex-1 font-semibold mb-6">{header}</h2>
          {link ? <p className="flex-none"><a href="" className="text-sm font-bold text-indigo-500">Lihat detail</a></p> : ''}
        </div>
        : ''}
      {children}
    </div>
  );
}

export default Card;