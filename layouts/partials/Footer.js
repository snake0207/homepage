import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section bg-dark pb-0">
      <div className="container">
        {/* footer menu */}
        <div className="row">
          {/* social icons */}
          <div className="sm:col-12 lg:col-12 md:text-2xl">
            {markdownify(footer_content.addr, "p", "mt-3 mb-2 text-gray-400")}
            {markdownify(footer_content.contact, "p", "mb-6 text-gray-400")}
            <Social source={social} className="social-icons mb-8" />
          </div>
        </div>
        {/* copyright */}
        <div className="mb-3 border-t border-border py-6">
          {markdownify(copyright, "p", "text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
