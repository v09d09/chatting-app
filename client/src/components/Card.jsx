function Card({ children, className }) {
  return <div className={`bg-white bg-opacity-5 ` + className}>{children}</div>;
}

export default Card;
