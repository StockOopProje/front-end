// icons
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AssessmentIcon from '@mui/icons-material/Assessment';


// components
import PurchaseOrders from "./components/PurchaseOrders"
import SaleOrders from "./components/SaleOrders"
import ProductList from "./components/ProductList"
import VendorDetail from "./components/VendorDetail"
import CustomerDetail from "./components/CustomerDetail"
import ProfitLoss from "./components/ProfitLoss"

const pages = [
    {
        name:"Purchase Orders",
        title:"Purchase Orders",
        path:"/purchase/orders",
        icon:<InventoryIcon/>,
        element:<PurchaseOrders/>
    },
    {
        name:"Sale Orders",
        title:"Sale Orders",
        path:"/sale/orders",
        icon:<PointOfSaleIcon/>,
        element:<SaleOrders/>
    },
    {
        name:"Product",
        title:"Product List",
        path:"/product",
        icon:<ListIcon/>,
        element:<ProductList/>
    },
    {
        name:"Vendor",
        title:"Vendor Detail",
        path:"/vendor",
        icon:<ConnectWithoutContactIcon/>,
        element:<VendorDetail/>
    },
    {
        name:"Customer",
        title:"Customer Detail",
        path:"/customer",
        icon:<PeopleIcon/>,
        element:<CustomerDetail/>
    },
    {
        name:"Zreport",
        title:"Profit Loss",
        path:"/zreport",
        icon:<AssessmentIcon/>,
        element:<ProfitLoss/>
    }

]

export default pages