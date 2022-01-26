import Card from "../components/Card";

function Error() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="flex justify-center items-center border w-4/6 text-7xl text-red-600 p-6">
        <h1>duddn't exist - 404</h1>
      </Card>
    </div>
  );
}

export default Error;
