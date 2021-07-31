import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { MIN_SHEET_HEIGHT } from "util/Variables";

interface GenericLayoutProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  flex?: string;
  show?: boolean;
}

interface LayoutWrapperProps extends Omit<GenericLayoutProps, "children"> {
  children?:
    | ReactElement<typeof LayoutHeader | typeof LayoutBody | typeof LayoutFooterOverlay | typeof LayoutFooter>
    | Array<ReactElement<typeof LayoutHeader | typeof LayoutBody | typeof LayoutFooterOverlay | typeof LayoutFooter>>;
}

interface LayoutBodyProps extends Omit<GenericLayoutProps, "children"> {
  children?:
    | ReactElement<typeof LayoutSidebar | typeof LayoutContent>
    | Array<ReactElement<typeof LayoutSidebar | typeof LayoutContent>>;
}

export const LayoutFooterOverlay: FunctionComponent<GenericLayoutProps> = (): JSX.Element => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "visible";
    };
  });

  return (
    <Box
      h="100vh"
      w="100vw"
      bgColor="blackAlpha.700"
      position="fixed"
      top="0"
      left="0"
      zIndex="998"
      overflowY="hidden"
    />
  );
};

export const LayoutFooter: FunctionComponent<GenericLayoutProps> = ({ show = true, children, className }) => {
  return (
    <Box
      display={show ? "block" : "none"}
      position="sticky"
      minH={MIN_SHEET_HEIGHT}
      bottom="0"
      w="100%"
      className={`container ${className}`}
      id="vb-footer"
      zIndex="999"
      transition="all 0.5s east-in-out"
    >
      {children}
    </Box>
  );
};

export const LayoutContent: FunctionComponent<GenericLayoutProps> = ({ children, flex = "0.5" }): JSX.Element => {
  return <Box flex={flex}>{children}</Box>;
};

export const LayoutSidebar: FunctionComponent<GenericLayoutProps> = ({ children, flex = "0.25" }): JSX.Element => {
  const [topPosition, setTopPosition] = useState<number>(0); // randomly set initial value

  useEffect(() => {
    const header: HTMLElement | null = document.getElementById("vb-header");
    const headerHeight: number = header!.clientHeight;
    setTopPosition(headerHeight);
  }, []);

  return (
    <Box
      position="sticky"
      top={`${topPosition}px`}
      flex={flex}
      height="fit-content"
      display={{ xl: "block", base: "none" }}
    >
      {children}
    </Box>
  );
};

export const LayoutBody: FunctionComponent<LayoutBodyProps> = ({ children, className }): JSX.Element => {
  return (
    <Box className={`container ${className}`}>
      <Flex>{children}</Flex>
    </Box>
  );
};

export const LayoutHeader: FunctionComponent<GenericLayoutProps> = ({ children, className }): JSX.Element => {
  return (
    <Box width="100%" position="sticky" top="0" zIndex="997" className={`container ${className}`} id="vb-header">
      {children}
    </Box>
  );
};

export const LayoutWrapper: FunctionComponent<LayoutWrapperProps> = ({ children }): JSX.Element => {
  return (
    <Flex flexDir="column" alignItems="center">
      {children}
    </Flex>
  );
};
