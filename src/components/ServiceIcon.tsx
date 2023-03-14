import Image from 'next/image';

type Props = {
  valid?: boolean;
  icon: {
    valid: string;
    invalid: string;
  };
  alt: string;
};

export const ServiceIcon = ({ valid, icon, alt }: Props) => (
  <Image
    src={valid ? icon.valid : icon.invalid}
    height="24"
    width="24"
    alt={alt}
  />
);
