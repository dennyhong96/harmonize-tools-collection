import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function ActionButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ backgroundColor: "#49208D", color: "white" }}
        size="small"
      >
        <ArrowForwardIcon fontSize="inherit" />
      </IconButton>
      <Menu id="action-menu"
             anchorEl={anchorEl}
             keepMounted
             open={Boolean(anchorEl)}
             onClose={handleClose}
      >
        {props.list.map((action, i) => (
          <MenuItem onClick={handleClose} key={i}>{action}</MenuItem>
        ))}
      </Menu>
    </div>
    
  );
}
