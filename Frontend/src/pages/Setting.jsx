import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/common/Loader";
import Input from "../components/common/Input";
import { fetchUserData } from "../store/slices/UserDataSlices";

const Setting = () => {
  const userData = useSelector((state) => state.userData.userData);
  const status = useSelector((state) => state.userData.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData());
    }
  }, [userData, dispatch]);

  return (
    <div className="w-full h-full flex items-start justify-center px-5 py-10 ">
      {status === "loading" || status === "idle" ? (
        <Loader className="border-opacity-70" />
      ) : (
        <div className="w-full h-full flex flex-col gap-5 max-w-5xl">
          <div className="w-32 h-32 self-center">
            <div className="w-full rounded-full overflow-hidden">
              <img src={userData?.image} alt="User image" />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-5 shadow-inner-border p-5 rounded-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input value={userData?.name} disabled={true} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <Input value={userData?.email} disabled={true} />
              </div>
              <div>
                <label htmlFor="number">Number</label>
                <Input
                  value={`+${userData?.number.slice(0, -5)}`}
                  disabled={true}
                  id="number"
                  placeholder={userData?.number}
                  handleChange={() => {}}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input
                  value="********"
                  disabled={true}
                  id="password"
                  placeholder="********"
                  handleChange={() => {}}
                />
              </div>
              <div className="flex items-center justify-center">
                <p className="bg-red-200 text-red-500 w-fit px-2 py-1 rounded-md">
                  Edit feature will be available soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
