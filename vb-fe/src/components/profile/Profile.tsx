import React, { FunctionComponent } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Avatar,
} from "@chakra-ui/react";

export interface Profile {
  displayName: string;
  image: string;
}

export interface Props {
  profile: Profile;
}

export const Profile: FunctionComponent<Props> = ({ profile }): JSX.Element => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="profile-wrapper avatar">
          <Avatar name={profile.displayName} src={profile.image} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-secondary border-0">
        <PopoverArrow />
        <PopoverHeader className="px-3 py-3 d-flex justify-content-between align-items-center border-light">
          <span className="h5 m-0">Your Profile</span>
        </PopoverHeader>
        <PopoverBody>{/* <Profile /> */}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
