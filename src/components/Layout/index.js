import { Topbar } from "../Topbar"
import { TabNavigator } from "../TabNavigator"
import { TopbarProvider } from "../../contexts/TopbarContexts";

const Layout = ({children}) => {
    return (
        <div>
            <TabNavigator />
            <TopbarProvider>
                <Topbar /> 
            {children}
            </TopbarProvider>
        </div>
    )
}

export default Layout;