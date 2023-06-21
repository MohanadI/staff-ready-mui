import IconifyIcon from "./IconifyIcon";

function TreeIcon({ type, size = { width: 15, height: 15 } }) {
  const iconSize = size;
  const iconStyle = { marginRight: "5px" };
  switch (type) {
    case "subject":
      return (
        <IconifyIcon
          color="#333333"
          icon="bi:folder-fill"
          width={iconSize.width}
          height={iconSize.height}
          style={iconStyle}
        />
      );
    case "document":
      return (
        <IconifyIcon
          color="#333333"
          icon="mi:document"
          width={iconSize.width}
          height={iconSize.height}
          style={iconStyle}
        />
      );
    case "classification_folder":
      return (
        <IconifyIcon
          color="#333333"
          icon="mingcute:tag-fill"
          rotate={1}
          width={iconSize.width}
          height={iconSize.height}
          style={iconStyle}
        />
      );
    case "classification":
      return (
        <IconifyIcon
          color="#333333"
          icon="mi:document"
          width={iconSize.width}
          height={iconSize.height}
          style={iconStyle}
        />
      );
    case "site":
      return (
        <IconifyIcon
          color="#333333"
          icon="bxs:map"
          width={iconSize.width}
          height={iconSize.height}
          style={iconStyle}
        />
      );
    case "location":
      return (
        <IconifyIcon
          color="#333333"
          rotate={1}
          icon="teenyicons:direction-solid"
          width={iconSize.width}
          height={iconSize.height}
          style={iconStyle}
        />
      );
    default:
      <></>;
      break;
  }
}

export default TreeIcon;