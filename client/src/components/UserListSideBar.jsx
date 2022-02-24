import UsersList from "./UsersList";

function UserListSideBar({ className }) {
  return (
    <div className={className}>
      <div className="flex h-24 flex-col items-center justify-end ">
        <h2 className="from-customLightOrange to-customOrange bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
          online chatters
        </h2>
      </div>
      <UsersList />
    </div>
  );
}

export default UserListSideBar;
