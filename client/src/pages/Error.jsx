import Card from "../components/Card";

function Error() {
  return (
    <div className="bg-customBlue flex h-screen w-screen items-center justify-center">
      <Card className="flex w-4/6 items-center justify-center border p-6 text-7xl text-red-600">
        <h1>duddn't exist - 404</h1>
      </Card>
    </div>
  );
}

export default Error;
