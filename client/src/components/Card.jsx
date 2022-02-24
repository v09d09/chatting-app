function Card({ children, className }) {
  return <div className={`bg-customTrans05` + className}>{children}</div>;
}

export default Card;
