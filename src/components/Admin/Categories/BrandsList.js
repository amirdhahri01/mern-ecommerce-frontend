import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsAction } from "../../../redux/slices/brands/brandsSlice";
export default function BrandsList() {
  //Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  //Get data from store
  const {
    loading,
    error,
    brands: { brands },
  } = useSelector((state) => state?.brands);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      <h1 className="text-lg font-medium leading-6 text-gray-900 mt-3">
        All Brands Categories [{brands?.length}]
      </h1>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {brands?.map((brand) => (
              <tr key={brand._id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {brand.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {new Date(brand.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
