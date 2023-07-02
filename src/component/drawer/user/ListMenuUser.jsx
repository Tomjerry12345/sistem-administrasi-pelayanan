import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

export const ListMenuUser = ({ onClick, isSelectedPage }) => {
  const router = {
    "cek-permohonan": "/user",
    "daftar-pengunjung": "/user/daftar-pengunjung",
    "data-masyarakat": "/user/data-masyarakat",
  };
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => onClick(router["cek-permohonan"])}
        selected={isSelectedPage(router["cek-permohonan"])}
      >
        <ListItemIcon>
          <SearchIcon color="cinav" />
        </ListItemIcon>
        <ListItemText primary="Cek Permohonan" />
      </ListItemButton>
      <ListItemButton
        onClick={() => onClick(router["daftar-pengunjung"])}
        selected={isSelectedPage(router["daftar-pengunjung"])}
      >
        <ListItemIcon>
          <ArticleIcon color="cinav" />
        </ListItemIcon>
        <ListItemText primary="Daftar Pengunjung" />
      </ListItemButton>
      <ListItemButton
        onClick={() => onClick(router["data-masyarakat"])}
        selected={isSelectedPage(router["data-masyarakat"])}
      >
        <ListItemIcon>
          <NoteAddIcon color="cinav" />
        </ListItemIcon>
        <ListItemText primary="Data masyarakat" />
      </ListItemButton>
    </React.Fragment>
  );
};
