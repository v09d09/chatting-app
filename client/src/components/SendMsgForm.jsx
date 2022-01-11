import React from "react";

function SendMsgForm() {
  return (
    <div className="w-full h-full">
      <form className="w-full h-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Send a Message..."
          className="bg-transparent border  w-4/5 h-3/5 px-4"
        />
        <input
          type="submit"
          value="enter"
          className="border mx-2 p-3 bg-white bg-opacity-20"
        />
      </form>
    </div>
  );
}

export default SendMsgForm;
