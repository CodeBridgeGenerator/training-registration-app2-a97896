import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import TrainingMaterialPage from "../TrainingMaterialPage/TrainingMaterialPage";
import TrainingCoursePage from "../TrainingCoursePage/TrainingCoursePage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "trainingMaterial":
                return <TrainingMaterialPage />;
case "trainingCourse":
                return <TrainingCoursePage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
