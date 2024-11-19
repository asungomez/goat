import { FC } from "react";

type ContainerProps = {
  children?: React.ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => (
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{children}</div>
);
