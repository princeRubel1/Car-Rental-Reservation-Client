import { FaUser } from "react-icons/fa6";
import { userApi } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/Auth/authSlice";

const Avatar = () => {
  const token = useAppSelector(useCurrentToken);

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  return (
    <div className="flex items-center">
      {user ? (
        <img
          src={user?.image}
          alt={user?.name}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <FaUser className="h-8 w-8 rounded-full text-gray-500" />
      )}
    </div>
  );
};

export default Avatar;
