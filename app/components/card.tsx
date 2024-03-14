export const Card = ({ children, title, id }: CardProps) => {
  return (
    <div className="p-8 bg-white rounded-lg text-black w-fit min-w-[300px] flex flex-col text-center justify-center items-center">
      <label htmlFor={id}>{title}</label>
      {children}
    </div>
  );
};
