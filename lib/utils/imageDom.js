import Image from "next/image";

export const FetchImage = (props) => {
  const { ...rest } = props;
  return <Image {...rest} />;
};
