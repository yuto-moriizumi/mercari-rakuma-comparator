import { ServiceIcon } from './ServiceIcon';

type Props = {
  valid?: boolean;
};

export const RakumaIcon = ({ valid }: Props) => (
  <ServiceIcon
    valid={valid}
    icon={{ valid: '/rakuma.png', invalid: '/rakuma_gray.png' }}
    alt="Rakuma icon"
  />
);
