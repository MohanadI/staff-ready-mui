export const navigation = [
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: "/documentcontrol",
        icon: 'mdi:home-outline',
        title: 'Document Control',
        children: [
            {
                icon: 'mdi:chart-donut',
                title: 'Setup',
                path: '/documentcontrol/setupme',
                element: <div>document setup!</div>
            }
        ]
    }
];