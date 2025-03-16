import { FaFacebook, FaInstagram, FaDiscord, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    icon: FaFacebook,
    href: "https://facebook.com/your-profile", // Replace with your Facebook profile URL
    color: "#1877F2",
    label: "Facebook"
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/your-profile", // Replace with your Instagram profile URL
    color: "#E4405F",
    label: "Instagram"
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/your-number", // Replace with your WhatsApp number (e.g., https://wa.me/1234567890)
    color: "#25D366",
    label: "WhatsApp"
  },
  {
    icon: FaDiscord,
    href: "https://discord.gg/your-server", // Replace with your Discord server invite link
    color: "#7289DA",
    label: "Discord"
  }
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4 items-center">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
          style={{ color: social.color }}
        >
          <social.icon size={24} />
        </a>
      ))}
    </div>
  );
}
