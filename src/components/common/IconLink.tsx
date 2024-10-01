import { Icon } from '@iconify/react'
import Link from 'next/link'

type Props = {
  name: string;
  size?: number;
}

const iconData = (name: string) =>
  [
    {
      iconName: "mdi:github",
      label: "Github",
      href: "https://github.com/daemon-node-byte/mystical-realms",
    },
    {
      iconName: "mdi:linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joshmclain45",
    },
  ].find((link) => link.label === name || link.label.toLowerCase() === name);

export default function IconLink({ name, size }: Readonly<Props>) {
  const data = iconData(name)
  if (!data) throw new Error(`Icon Link ${name} not found`);
  return (
    <Link href={data.href} aria-label={data.label} target="_blank" rel="noopener noreferrer">
      <Icon icon={data.iconName} width={size ?? 24} height={size ?? 24} />
    </Link>
  )
}