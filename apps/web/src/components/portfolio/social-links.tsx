import {
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
	EMAIL_URL,
	GITHUB_URL,
	LINKEDIN_URL,
	PHOTOGRAPHY_INSTAGRAM_URL,
} from "@/consts";
import styles from "./portfolio.module.css";

const socialLinks = [
	{ href: GITHUB_URL, label: "GitHub", Icon: GithubLogoIcon },
	{ href: LINKEDIN_URL, label: "LinkedIn", Icon: LinkedinLogoIcon },
	{
		href: PHOTOGRAPHY_INSTAGRAM_URL,
		label: "Photography Instagram",
		Icon: InstagramLogoIcon,
	},
];

export function SocialLinks() {
	return (
		<ul className={styles.socialLinks} aria-label="Social and contact links">
			{socialLinks.map(({ href, label, Icon }) => (
				<li key={href}>
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${label} (opens in a new tab)`}
					>
						<Icon size={20} aria-hidden />
					</a>
				</li>
			))}
			<li>
				<a href={EMAIL_URL} aria-label="Email Louis Mau">
					<EnvelopeSimpleIcon size={20} aria-hidden />
				</a>
			</li>
		</ul>
	);
}
