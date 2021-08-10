import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

interface GenericLayoutProps {
  children?: ReactElement | ReactElement[];
  style?: any;
  className?: string;
  flex?: string;
  show?: boolean;
  mx?: number;
  calcSidebarHeight?: boolean;
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

/**
 * This is the overlay that occurs when the footer is expanded (basically when the room details are open in this case)
 * The body should have overflow hidden because you don't want to scroll on the main page
 * when the footer is expanded.
 * Conversely, the overflow should be enabled when the component is destroyed/unmouned;
 *
 */
export const LayoutFooterOverlay: FunctionComponent<GenericLayoutProps> = (): JSX.Element => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

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

/**
 * This is the footer component which is sticky at the bottom. This will house the player
 * The footer will also be expanded so that it can reveal the room details and the people
 * that are in the room and the other information that has been discussed in the spec.
 */
export const LayoutFooter: FunctionComponent<GenericLayoutProps> = ({ show = true, children, className }) => {
  return (
    <Box
      // display={show ? "block" : "none"}
      position="fixed"
      // minH={MIN_SHEET_HEIGHT}
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

/**
 * This content is scroll-able and will have the different room cards
 */
export const LayoutContent: FunctionComponent<GenericLayoutProps> = ({
  children,
  flex = "0.5",
  mx = 10,
}): JSX.Element => {
  return (
    <Box mx={{ lg: mx, base: 0 }} flex={{ lg: flex, base: 1 }} overflow="hidden">
      {children}
    </Box>
  );
};

/**
 * This is the sidebar component that will be sticky on the left/right side and will have
 * width based on the flex value.
 * The Y position of the sidebar depends on the height of the header which is dynamically calculated here.
 */
export const LayoutSidebar: FunctionComponent<GenericLayoutProps> = ({
  children,
  flex = "0.25",
  calcSidebarHeight,
}): JSX.Element => {
  const [topPosition, setTopPosition] = useState<number>(0); // randomly set initial value
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);

  useEffect(() => {
    const header: HTMLElement | null = document.getElementById("vb-header");
    const footer: HTMLElement | null = document.getElementById("vb-footer");
    const main: HTMLElement | null = document.getElementById("vb-main");
    const headerHeight: number = header!.clientHeight;
    const footerHeight: number = footer?.clientHeight || 0;
    const mainHeight: number = main?.clientHeight || 0;

    setSidebarHeight(mainHeight - headerHeight - footerHeight - 100);
    setTopPosition(headerHeight);
  }, []);

  return (
    <Box
      position="sticky"
      top={`${topPosition}px`}
      flex={flex}
      height={calcSidebarHeight ? `${sidebarHeight}px` : "fit-content"}
      display={{ lg: "block", base: "none" }}
      bottom="20px"
    >
      {children}
    </Box>
  );
};

/**
 * This is a the wrapper for the sidebars and the body
 */
export const LayoutBody: FunctionComponent<LayoutBodyProps> = ({ children, className }): JSX.Element => {
  return (
    <Box className={`container ${className}`} minH="100%" marginBottom="16">
      <Flex>{children}</Flex>
    </Box>
  );
};

/**
 * Top sticky header. Multiple elements (such as teh navbar and the page title/search bar) can be
 * a part of this header.
 */
export const LayoutHeader: FunctionComponent<GenericLayoutProps> = ({ children, className }): JSX.Element => {
  return (
    <Box width="100%" position="sticky" top="0" zIndex="997" className={`container ${className}`} id="vb-header">
      {children}
    </Box>
  );
};

/**
 * A wrapper component to wrap the Header, Body and Footer components
 */
export const LayoutWrapper: FunctionComponent<LayoutWrapperProps> = ({ children }): JSX.Element => {
  return (
    <Flex flexDir="column" alignItems="center" minH="100%">
      {children}
    </Flex>
  );
};

export const Layout = {
  Wrapper: LayoutWrapper,
  Header: LayoutHeader,
  Body: LayoutBody,
  Content: LayoutContent,
  Sidebar: LayoutSidebar,
  Footer: LayoutFooter,
  Overlay: LayoutFooterOverlay,
};
