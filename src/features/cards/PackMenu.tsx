import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import iconMenu from './../../assets/icons/iconMenu.png'
import {Path} from "../../common/Enum/path";
import {setCardsParams, setPackIdAC} from "./cards-reducer";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";

type PropsType = {
  packId: string
}

export const PackMenu: React.FC<PropsType> = ({packId}) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLearn = () => {
    handleClose()
    navigate(`${Path.LEARN}/${packId}`)
    dispatch(setCardsParams({cardsPack_id: packId}))
    dispatch(setPackIdAC(packId))
  }
  const handleDelete = () => {
    handleClose()
    console.log('delete pack')
  }
  const handleEdit = () => {
    handleClose()
    console.log('edit pack')
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={iconMenu} alt={'icon'} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleLearn}>Learn</MenuItem>
      </Menu>
    </div>
  );
};