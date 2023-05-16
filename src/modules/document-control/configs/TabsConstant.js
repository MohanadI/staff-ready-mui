import FolderIcon from '@mui/icons-material/Folder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NearMeIcon from '@mui/icons-material/NearMe';

export const setupTabs = [
    {
        icon: <FolderIcon fontSize='small' />,
        name: 'subject',
        label: 'Subject',
        active: false

    },
    {
        icon: <LocalOfferIcon fontSize='small' />,
        name: 'classification',
        label: 'Classification',
        active: false

    },
    {
        icon: <NearMeIcon fontSize='small' />,
        name: 'location',
        label: 'Location',
        active: false
    }
]
