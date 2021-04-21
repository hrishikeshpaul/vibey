import React, { PropsWithChildren } from "react";
import Icon from "app/components/icon/icon";
import { ReactComponent as Edit } from "assets/icons/playlist.svg";
import "./RoomPlaylist.scss";
import { IoSearch } from "react-icons/io5";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  InputLeftElement,
  InputGroup,
  Divider,
} from "@chakra-ui/react";

type RoomPlaylistProps = {};

const RoomPlaylist = (props: PropsWithChildren<RoomPlaylistProps>) => {
  const playlists = [
    {
      name: "Playlist 1",
    },
    {
      name: "Playlist 2",
    },
    {
      name: "Playlist 3",
    },
    {
      name: "Playlist 4",
    },
  ];

  return (
    <div className="bg-secondary w-100 radius">
      <div className="card shadow-none bg-transparent border-0 radius px-2 py-2">
        <div className="card-header d-flex justify-content-between align-items-center py-3 border-0">
          <div className="d-flex align-items-center">
            <Icon Component={Edit}></Icon>
            <span className="pl-2 h5 m-0 font-weight-bold">Playlists</span>
          </div>
        </div>
        <div className="mb-3 px-3">
          <InputGroup className="bg-light border-0 rounded-lg">
            <InputLeftElement pointerEvents="none" children={<IoSearch />} />
            <Input type="name" placeholder="Search..." className="border-0" />
          </InputGroup>
        </div>
        <div className="card-body border-0 pt-1 playlist-body px-3">
          <div className="mt-3">
            <Accordion defaultIndex={[0]} allowMultiple>
              {playlists.map((playlist, i) => (
                <AccordionItem
                  className="border-0 bg-light rounded-lg my-3"
                  index={i}
                  key={i}
                >
                  <AccordionButton className="d-flex justify-content-between outline-none py-3">
                    <span className="h6 font-weight-bold m-0">
                      {playlist.name}
                    </span>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPlaylist;
