import React, { PropsWithChildren } from "react";
import Icon from "app/components/icon/icon";
import { ReactComponent as Playlist } from "assets/icons/playlist.svg";
import { FaPlay } from "react-icons/fa";
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
  IconButton,
} from "@chakra-ui/react";
import RoomPlaylistSong from '../RoomPlaylistSong/RoomPlaylistSong';

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

  const handlePlaylistPlay = (e: any) => {
    e.preventDefault();
    console.log('Play pressed!')
  }

  return (
    <div className="bg-secondary w-100 radius">
      <div className="card shadow-none bg-transparent border-0 radius px-2 py-2">
        <div className="card-header d-flex justify-content-between align-items-center py-3 border-0">
          <div className="d-flex align-items-center">
            <Icon Component={Playlist}></Icon>
            <span className="pl-2 h5 m-0 font-weight-bold">Playlists</span>
          </div>
        </div>
        <div className="px-3">
          <InputGroup className="bg-light border-0 rounded-lg">
            <InputLeftElement pointerEvents="none" children={<IoSearch />} />
            <Input type="name" placeholder="Search..." className="border-0" />
          </InputGroup>
        </div>
        <div className="card-body border-0 playlist-body px-3 pt-2">
          <div className="mt-3">
            <Accordion allowMultiple>
              {playlists.map((playlist, i) => (
                <AccordionItem
                  className="border-0 bg-light rounded-lg my-3"
                  index={i}
                  key={i}
                >
                  <AccordionButton className="d-flex align-items-center justify-content-between outline-none py-2">
                    <div className="h6 font-weight-bold m-0 w-75 long-txt">
                      {playlist.name}
                    </div>
                    <div className="">
                      <IconButton
                        aria-label="Search database"
                        className="bg-transparent icon-btn mr-1"
                        size="md"
                        icon={<Icon Component={FaPlay} size={[1, 1]}></Icon>}
                        onClick={handlePlaylistPlay}
                      ></IconButton>
                      <AccordionIcon />
                    </div>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                   <RoomPlaylistSong> </RoomPlaylistSong>
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
