import React from "react"
import { ResponsiveGrid } from "@/components/responsive_grid";

export const UserView: React.FC = () => {
    return <div>
        <ResponsiveGrid cols={[
            {
                size: { sm: 0, md: 6 , lg: 5, xl: 12, xxl: 12 },
                component: <div>Hello Side Grid</div>
            },
            {
                size: { sm: 24, md: 18, lg: 5, xl: 12, xxl: 12 },
                component: <div>Hello Grid</div>
            },
        ]} />
    </div>
}