import { ServiceIcon } from './ServiceIcon';

type Props = {
  valid?: boolean;
};

export const MercariIcon = ({ valid }: Props) => (
  <ServiceIcon
    valid={valid}
    icon={{ valid: '/mercari.png', invalid: '/mercari_gray.png' }}
    alt="Mercari icon"
  />
);
