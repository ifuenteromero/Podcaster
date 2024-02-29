import { IconType } from 'react-icons';
import { FaRegUser } from 'react-icons/fa6';

interface Props {
    iconName: string;
    title?: string;
}

const iconComponents: { [key: string]: IconType } = { FaRegUser };

const Icon = ({ iconName, ...restProps }: Props) => {
    const IconComponent = iconComponents[iconName];
    return <IconComponent {...restProps} />;
};

export default Icon;
