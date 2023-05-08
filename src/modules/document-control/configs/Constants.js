import Manage from '../pages/Manage';
import Setup from '../pages/Setup';
import Archived from '../pages/Archived';
import Teams from '../pages/Teams';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArchiveIcon from '@mui/icons-material/Archive';
import GroupIcon from '@mui/icons-material/Group';

export const routes = [
    {
        path: "",
        title: "Manage",
        icon: <DomainDisabledIcon />,
        element: <Manage />
    },
    {
        path: "setup",
        title: "Setup",
        icon: <SettingsSuggestIcon />,
        element: <Setup />
    },
    {
        path: "archived",
        title: "Archived",
        icon: <ArchiveIcon />,
        element: <Archived />
    },
    {
        path: "teams",
        title: "Teams",
        icon: <GroupIcon />,
        element: <Teams />
    },
];