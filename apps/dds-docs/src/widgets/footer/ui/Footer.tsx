import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 py-8 text-sm text-text-tertiary">
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-3">
          <p>
            Built by{" "}
            <a
              href="https://github.com/Team-B1ND"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
            >
              Team B1ND
            </a>
          </p>
          <p>© 2026 DDS. All rights reserved.</p>
        </div>
        <a
          href="https://github.com/Team-B1ND/dds-web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-tertiary hover:text-text-primary"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
