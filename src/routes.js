const navigation = () => {
    return [
        {
            icon: 'mdi:home-outline',
            title: 'Document Control',
            children: [
                {
                    icon: 'mdi:chart-donut',
                    title: 'Setup',
                    path: '/document-control/setup'
                }
            ]
        }
    ]
}