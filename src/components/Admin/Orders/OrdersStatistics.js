import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersStatisticsAction } from "../../../redux/slices/orders/ordersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";

export default function OrdersStats() {
  //Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersStatisticsAction());
  }, [dispatch]);
  //Get data from store
  const { stats } = useSelector((state) => state?.orders);
  console.log(stats);
  
  const statistics = stats && stats?.statistics && stats?.statistics[0] ? Object.values(stats?.statistics[0]) : [];
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/*Today's sales */}
        <div className="relative overflow-hidden rounded-lg bg-indigo-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Today's sales
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${stats.saleToday?.length <= 0 ? "0.00" : 0}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-pink-900 px-4 py-4 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
        {/* stat 1 */}
        <div className="relative overflow-hidden rounded-lg bg-red-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Minimum order
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics[2]}
            </p>

            <div className="absolute inset-x-0 bottom-0 bg-pink-900 px-4 py-4 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
        {/* stat 2 */}
        <div className="relative overflow-hidden rounded-lg bg-yellow-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Maximum order
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              $ {statistics[3]}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-pink-900 px-4 py-4 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
        {/* stat 3 */}
        <div className="relative overflow-hidden rounded-lg bg-green-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-200">
              Total sales
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-100">
              ${statistics[1]}
            </p>

            <div className="absolute inset-x-0 bottom-0 bg-pink-900 px-4 py-4 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
