const Info = ({ Icon, value }) => {
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <Icon className="text-2xl" />
      <p>{value}</p>
    </div>
  );
};

export default Info;
